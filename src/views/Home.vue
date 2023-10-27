<script setup lang="ts">
import { ref } from 'vue';
import { useTodoerStore } from '@/stores/todoer';
const todoer = useTodoerStore();

const input = ref<HTMLInputElement>();

function addToList(input: HTMLInputElement) {
  if (input && input.value !== '') {
    todoer.addTodo(input.value);
    input.value = '';
  }
}

function inputFocusMe(e: MouseEvent) {
  (e.target as HTMLInputElement).focus();
}

</script>

<template>
  <div class="flex justify-center flex-col items-center">
    <fieldset class="w-80">
      <legend>新增</legend>
      <div class="flex ml-4">
        <label class="mr-2">輸入:</label>
        <input
          class="flex-1 mr-2"
          type="text"
          name="todo"
          ref="input"
          @mouseover="inputFocusMe"
          @keyup.enter="addToList(input as HTMLInputElement)"
          @blur="addToList(input as HTMLInputElement)"
        >
      </div>
    </fieldset>

    <fieldset class="w-80">
      <legend>待辦</legend>
      <div class="flex flex-col ml-4">
        <div v-for="(todo, index) in todoer.list.filter(todo => !todo.completed)" :key="todo.id">
          <div class="flex" v-if="!todo.isEdit">
            <button type="button" class="mr-2" @click="todo.completed = true">OK</button>
            <span class="flex-1 mr-2" title="雙擊以編輯!" @dblclick="todo.isEdit=true">{{ todo.value }}</span>
            <button
              type="button"
              class="color-white bg-red-600 border-none cursor-pointer"
              @click="todoer.deleteTodo(todo.id)"
            >D</button>
          </div>
          <div class="flex" v-else>
            <input class="ml-10" type="text" v-model="todo.value" @mouseover="inputFocusMe" @keyup.enter="todo.isEdit=false" @blur="todo.isEdit=false">
          </div>
          <hr v-if="index !== (todoer.list.filter(todo => !todo.completed).length - 1)">
        </div>
      </div>
    </fieldset>
    <fieldset class="w-80">
      <legend>完成</legend>
      <div class="flex flex-col ml-4">
        <div v-for="(todo, index) in todoer.list.filter(todo => todo.completed)" :key="todo.id">
          <div class="flex">
            <button type="button" class="mr-2" @click="todo.completed = false">KO</button>
            <span class="flex-1 mr-2">{{ todo.value }}</span>
          </div>
          <hr v-if="index !== (todoer.list.filter(todo => todo.completed).length - 1)">
        </div>
      </div>
    </fieldset>
  </div>
</template>

<style scoped>
.title {
  margin: -3rem auto 1rem !important;
}

.cht {
  font-size: 24px !important;
}
</style>
