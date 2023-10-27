<script setup lang="ts">
import Home from '@/views/Home.vue';
// import { storeToRefs } from 'pinia';
// import { useTodoerStore } from '@/stores/todoer';
// import { useUserIdentifyStore } from '@/stores/userIdentify'

// const userIdentify = useUserIdentifyStore();
// const todoer = useTodoerStore();
// const { userIdentifyId } = storeToRefs(userIdentify)

// function test () {
//   const todo = <todoItem>{
//     identifyId: userIdentifyId.value,
//     id: new Date().getTime(),
//     value: 'hello',
//     completed: false
//   };

//   todoer.addTodo(todo);
// }
</script>

<template>
  <Home />
  <!-- <div>
    <button @click="test">click</button>
    <hr>
    <div>
      <div v-for="item in todoer.list" :key="item.id">
        {{ item.value }}
      </div>
    </div>
  </div> -->
</template>

<style scoped>

</style>
