<script setup lang="ts">
import { useTodoerStore } from './stores/todoer';

const todoer = useTodoerStore();

function test () {
  const todo = <todoItem>{
    id: new Date().getTime(),
    value: 'hello',
    completed: false
  };

  todoer.addTodo(todo);
}
</script>

<template>
  <div>
    <button @click="test">click</button>
    <hr>
    <div>
      <div v-for="item in todoer.list" :key="item.id">
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
