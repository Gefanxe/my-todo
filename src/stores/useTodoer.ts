import { ref, toRaw } from "vue";
import { defineStore, storeToRefs } from "pinia";
import remove from 'lodash/remove';
import { useUserIdentifyStore } from "@/stores/userIdentify";
import { todoItem } from "@/api/todo/types";
import { getTodoList, addTodoList, updateTodoList, deleteTodoList } from '@/api/todo';

export const useTodoerStore = defineStore("todoer", () => {
  const userIdentify = useUserIdentifyStore();
  const { userIdentifyId } = storeToRefs(userIdentify);

  const list = ref<Array<todoItem>>([]);
  const loading = ref(false);

  async function addTodo(_text: string) {
    loading.value = true;

    const todo = <todoItem>{
      identifyId: userIdentifyId.value,
      id: new Date().getTime(),
      value: _text,
    };
    
    await addTodoList(todo);

    list.value.push(todo);

    loading.value = false;
  }

  async function updateTodo(_id: number, _data: string | boolean) {
    loading.value = true;

    const idx = list.value.findIndex((todo) => {
      return (todo.id === _id);
    });
    let keyName: keyof todoItem;
    if (typeof _data === "string") {
      keyName = 'value';
    } else {
      keyName = 'completed';
    }

    await updateTodoList({
      identifyId: userIdentifyId.value,
      id: _id,
      [keyName]: (keyName !== 'value') ? !_data : _data
    });

    list.value[idx][keyName] = ((keyName !== 'value') ? !_data : _data) as never;

    loading.value = false;
  }

  async function deleteTodo(_id: number) {
    loading.value = true;

    await deleteTodoList({
      identifyId: userIdentifyId.value,
      id: _id,
    });
    
    const deleteTodo = remove(list.value, function(todo) {
      return todo.id === _id;
    });
    
    loading.value = false;
    console.log('delete :', toRaw(deleteTodo[0]));
  }

  async function loadTodoData(_uuid: string) {
    const result = await getTodoList(userIdentifyId.value);

    list.value = result.data.list;
  }

  loadTodoData(userIdentifyId.value);

  return { list, loading, loadTodoData, addTodo, updateTodo, deleteTodo };
});
