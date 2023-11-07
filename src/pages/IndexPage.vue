<template>
  <q-page>
    <div class="main__page">
      <div class="main__page-top">
        <div class="big-title" v-if="user.role == 'user'">Ваши заметки</div>
        <div class="big-title" v-else>Заметки пользователей</div>

        <main-button  v-if="user.role == 'user'" class="main__page-add" @click="modals.add = true">Новая заметка +</main-button>
      </div>
      <div class="main__page-noty">
        <NotifyCard @editNoty="editNoty" @deleteNotyModal="deleteNotyModal" v-for="todo in userTodos.todos" :key="todo"
          :item="todo" />
      </div>
      <StandartModal :active="modals.edit" :title="'Редактировать заметку'" @closeModal="closeModalEdit">
        <div class="modal-wrapper">
          <div class="custom-input">
            Контент
            <q-input :error="errors.edit" v-model="editNotyInput" outlined bg-color="white" color="white"></q-input>
          </div>

          <div class="modal-buttons">
            <main-button :isDark="true" @click="modals.edit = false">Отмена</main-button>
            <main-button @click="editNotyf('')">Редактировать</main-button>
          </div>
        </div>
      </StandartModal>
      <StandartModal :active="modals.delete" :title="'Вы уверены, что хотите удалить заметку?'"
        @closeModal="closeModalDelete">
        <div class="modal-wrapper">
          <div class="modal-buttons">
            <main-button :isDark="true" @click="modals.delete = false">Отмена</main-button>
            <main-button :isRed="true" @click="deleteNoty">Удалить</main-button>
          </div>
        </div>
      </StandartModal>
      <StandartModal :active="modals.add" :title="'Новая заметка'" @closeModal="closeModalAdd">
        <div class="modal-wrapper">
          <div class="custom-input">
            Контент
            <q-input :error="errors.add" v-model="addNotyVal.todo" outlined bg-color="white" color="white"></q-input>
          </div>
          <div class="modal-buttons">
            <main-button :isDark="true" @click="modals.add = false">Отмена</main-button>
            <main-button @click="addNoty">Добавить</main-button>
          </div>
        </div>
      </StandartModal>
    </div>
  </q-page>
</template>

<script setup>
import NotifyCard from 'src/components/NotifyCard/NotifyCard.vue'
import MainButton from 'src/components/MainButton.vue';
import StandartModal from 'src/components/Modals/StandartModal.vue';
import { ref, onMounted, computed, watch } from 'vue'
import { api } from 'boot/axios'
import { useStore } from 'vuex';
import { useQuasar } from 'quasar'
const $q = useQuasar()
const store = useStore();
const user = computed(() => store.getters.getUser)
onMounted(() => {
  takeItems()
})
const modals = ref({
  edit: false,
  delete: false,
  add: false,
})
const editNotyInput = ref(null)
watch(() => editNotyInput.value, () => {
    errors.value.edit = false;
})
const addNotyVal = ref({
  todo: null,
  completed: false,
})
const userTodos = ref([]);
const currentNoty = ref({
  id: null,
})

const errors = ref({
  add: false,
  edit: false,
  delete: false,
})

const canLoad = ref({
  add: true,
  edit: true,
  delete: true,
})
const deleteNotyModal = (id) => {
  currentNoty.value.id = id
  console.log(currentNoty.value.id)
  modals.value.delete = true
}
const deleteNoty = () => {
  if (!canLoad.value.delete) {
    return
  }
  canLoad.value.delete = false
  $q.loading.show({
    delay: 1 
  })
  api.delete(`/todos/${currentNoty.value.id}`).then((res) => {
    console.log(res)
    userTodos.value.todos.forEach((el, index) => {
      if (el.id === currentNoty.value.id) {
        userTodos.value.todos.splice(index, 1);
      }
    })
    modals.value.delete = false
    canLoad.value.delete = true
    $q.loading.hide()
  }).catch((err) => {
    $q.loading.hide()
    canLoad.value.delete = false
    console.log(err)
    modals.value.delete = false
  })
}
const addNoty = () => {
  if (!canLoad.value.add || addNotyVal.value.todo == '' || addNotyVal.value.todo == null) {
    errors.value.add = true
    return
  }
  $q.loading.show({
    delay: 1
  })
  canLoad.value.add = false
  api.post('/todos/add', {
    todo: addNotyVal.value.todo,
    completed: false,
    userId: user.value.id,
  }).then((res) => {
    $q.loading.hide()
    addNotyVal.value.todo = null;
    userTodos.value.todos = [...userTodos.value.todos, res.data]
    modals.value.add = false
    canLoad.value.add = true
    errors.value.add = false
  }).catch((err) => {
    $q.loading.hide()
    console.log(err)
    modals.value.add = false
    errors.value.add = false

  })
}

const editNotyf = () => {
  if (!canLoad.value.edit && editNotyInput.value == '' || editNotyInput.value == null) {
    errors.value.edit = true
    return
  }
  $q.loading.show({
    delay: 1 
  })
  canLoad.value.edit = false
  api.put(`/todos/${currentNoty.value.id}`, {
    completed: false,
  }).then((res) => {
    if(userTodos.value.todos.find(todo => todo.id === currentNoty.value.id)){
      userTodos.value.todos.find(todo => todo.id === currentNoty.value.id).todo = editNotyInput.value
    }
    $q.loading.hide()
    canLoad.value.edit = true
    modals.value.edit = false
    editNotyInput.value = null
  }).catch((err) => {
    $q.loading.hide()
    console.log(err)
    canLoad.value.edit = true
    modals.value.edit = false
    editNotyInput.value = null
  })
}
const editNoty = (id) => {
  currentNoty.value.id = id
  modals.value.edit = true
}
const takeItems = () => {
  $q.loading.show({
    delay: 1 
  })
  if(user.value.role == 'user'){
  api.get(`/todos/user/${user.value.id}`).then((res) => {
    console.log(res.data)
    userTodos.value = res.data
    $q.loading.hide()
  }).catch((err) => {
    console.log(err)
    $q.loading.hide()
  })
}else{
  api.get(`/todos`).then((res) => {
    userTodos.value = res.data
    $q.loading.hide()
  }).catch((err) => {
    $q.loading.hide()
  })
}
}
const closeModalEdit = () => {
  modals.value.edit = false
}
const closeModalDelete = () => {
  modals.value.delete = false
}
const closeModalAdd = () => {
  modals.value.add = false
}
</script>
<style scoped>
.main__page-add {
  max-width: 170px;
}

.main__page-top {
  display: flex;
  margin-top: 60px;
  width: 100%;
  justify-content: space-between;
}

.main__page-noty {
  gap: 64px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 60px;
}

.modal-buttons {
  display: flex;
  gap: 10px;
}

.modal-wrapper {
  display: flex;
  gap: 20px;
  flex-direction: column;
  margin-top: 20px;
}

.custom-input {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #FCFCFC;
}
</style>