<script setup lang="ts">
import { ref } from 'vue';
import { todoItem } from "@/api/todo/types";
import { useTodoerStore } from '@/stores/useTodoer';

const todoer = useTodoerStore();

const input = ref<HTMLInputElement>();

async function addToList(input: HTMLInputElement) {
  if (input && input.value !== '') {
    await todoer.addTodo(input.value);
    input.value = '';
  }
}

async function updateToList(keyName: keyof todoItem, todo: todoItem) {
  if (todo.value !== '') {
    const data = todo[keyName] as string | boolean;
    await todoer.updateTodo(todo.id, data);
    todo.isEdit = false;
  }
}

async function deleteToList(_id: number) {
  await todoer.deleteTodo(_id);
}

function inputFocusMe(e: MouseEvent) {
  (e.target as HTMLInputElement).focus();
}

</script>

<template>
  <div class="flex justify-center flex-col items-center">
    <h1>Demo 我的待辦清單</h1>
    <fieldset class="w-80">
      <legend>新增</legend>
      <div class="flex ml-4">
        <label class="mr-2">輸入:</label>
        <input
          class="flex-1 mr-2"
          type="text"
          name="todo"
          autocomplete="off"
          ref="input"
          :disabled="todoer.loading"
          placeholder="按下Enter送出資料"
          @mouseover="inputFocusMe"
          @keyup.enter="addToList(input as HTMLInputElement)"
        >
      </div>
    </fieldset>

    <fieldset class="w-80">
      <legend>待辦</legend>
      <div class="flex flex-col ml-4">
        <div v-for="(todo, index) in todoer.list.filter(todo => !todo.completed)" :key="todo.id">
          <div class="flex" v-if="!todo.isEdit">
            <button type="button" class="mr-2" @click="updateToList('completed', todo)" :disabled="todoer.loading">OK</button>
            <span class="flex-1 mr-2" title="雙擊以編輯!" @dblclick="todo.isEdit=true">{{ todo.value }}</span>
            <button
              type="button"
              class="color-white bg-red-600 border-none cursor-pointer"
              :disabled="todoer.loading"
              @click="deleteToList(todo.id)"
            >D</button>
          </div>
          <div class="flex" v-else>
            <input
              class="ml-10"
              type="text"
              autocomplete="off"
              v-model="todo.value"
              placeholder="按下Enter送出資料"
              :disabled="todoer.loading"
              @mouseover="inputFocusMe"
              @keyup.enter="updateToList('value', todo)"
            >
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
            <button type="button" class="mr-2" @click="updateToList('completed', todo)" :disabled="todoer.loading">KO</button>
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
@/stores/useTodoer