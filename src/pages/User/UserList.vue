<template>
    <q-page>
        <div class="main__page">
            <div class="main__page-top">
                <div class="big-title">Список пользователей</div>
                <main-button class="main__page-add" @click="modals.add = true">Зарегистрировать пользователя</main-button>
            </div>
            <div class="table__users">
                <div class="table__users-header"></div>
                <UserCard/>
            </div>
        </div>


        <StandartModal :active="modals.add" :title="'Новая пользователь'" @closeModal="closeModalAdd">
        <div class="modal-wrapper">
          <div class="custom-input">
            Контент
            <q-input outlined bg-color="white" color="white"></q-input>
          </div>
          <div class="modal-buttons">
            <main-button :isDark="true" >Отмена</main-button>
            <main-button>Добавить</main-button>
          </div>
        </div>
      </StandartModal>
    </q-page>
</template>
<script setup>
import UserCard from 'src/components/Users/UserCard.vue';
import MainButton from 'src/components/MainButton.vue';
import StandartModal from 'src/components/Modals/StandartModal.vue';
import { ref } from 'vue'
const modals = ref({
  edit: false,
  delete: false,
  add: false,
})
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