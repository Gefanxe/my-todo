import { defineStore } from 'pinia'
import { ref } from 'vue'
import isEmpty from 'lodash/isEmpty'
import { v4 as uuidv4 } from 'uuid'

function getUuid(): string {
  let uuid = ''
  if (isEmpty(localStorage.getItem('identify_id'))) {
    uuid = uuidv4();
    localStorage.setItem('identify_id', uuid)
  } else {
    uuid = localStorage.getItem('identify_id') as string
  }
  return uuid;
}

export const useUserIdentifyStore = defineStore('userIdentify', () => {
  const userIdentifyId = ref<string>(getUuid())
  return { userIdentifyId }
})
