import { defineStore } from 'pinia'
import { ref, toRaw, watch } from 'vue'

export const useTodoerStore = defineStore('todoer', () => {
  const list = ref<todoItem[]>([])
  
  function addTodo(todo: todoItem) {
    list.value.push(todo);
    // console.log('add:', list.value);
  }

  watch(list.value, (newTodo: todoItem[]) => {
    // TODO: save to api
    console.log('todo add!!!', toRaw(newTodo[0]));
  });

  return { list, addTodo }
})
