import { defineStore } from 'pinia'
import { ref, toRaw, watch } from 'vue'

export const useTodoerStore = defineStore('todoer', () => {
  // load uuid from localStorage
  const list = ref<todoItem[]>([])
  
  function addTodo(todo: todoItem) {
    list.value.push(todo);
    // console.log('add:', list.value);
  }

  // TODO: load todos use uuid from api

  watch(list.value, (newTodo: todoItem[]) => {
    // TODO: save to api
    console.log('todo add!!!', toRaw(newTodo[0]));
  });

  return { list, addTodo }
})
