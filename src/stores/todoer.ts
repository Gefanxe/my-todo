import { ref, toRaw } from "vue";
import { defineStore, storeToRefs } from "pinia";
import remove from 'lodash/remove'
import { useUserIdentifyStore } from "@/stores/userIdentify";
import { todoItem } from "@/api/todo/types";

export const useTodoerStore = defineStore("todoer", () => {
  const userIdentify = useUserIdentifyStore();
  const { userIdentifyId } = storeToRefs(userIdentify);

  const list = ref<todoItem[]>([]);

  function addTodo(_text: string) {
    const todo = <todoItem>{
      identifyId: userIdentifyId.value,
      id: new Date().getTime(),
      value: _text,
    };
    
    list.value.push(todo);

    // TODO: add to API
  }

  function updateTodo(_id: number, _data: string | boolean) {
    const idx = list.value.findIndex((todo) => {
      return (todo.id = _id);
    });

    if (typeof _data === "string") {
      list.value[idx].value = _data;
    } else {
      list.value[idx].completed = _data;
    }

    // TODO: update to API
  }

  function deleteTodo(_id: number) {
    const deleteTodo = remove(list.value, function(todo) {
      return todo.id === _id;
    });

    console.log('delete :', toRaw(deleteTodo[0]));
    // TODO: delete to API
  }

  function loadTodoData(_uuid: string) {
    // TODO: load todos use uuid from api
    
    // test data
    list.value.push(
      {
        identifyId: userIdentifyId.value,
        id: 1698390868738,
        value: "hello",
        completed: true,
      } as todoItem,
      {
        identifyId: userIdentifyId.value,
        id: 1698390879814,
        value: "world",
      } as todoItem
    );
  }

  loadTodoData(userIdentifyId.value);

  return { list, loadTodoData, addTodo, updateTodo, deleteTodo };
});
