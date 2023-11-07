<template>
  <q-page>
    <div class="main__page">
      <div class="main__page-top">
        <div class="big-title">Список пользователей</div>
        <main-button class="main__page-add" @click="modals.add = true"
          >Зарегистрировать пользователя</main-button
        >
      </div>
      <div class="table__users">
        <div class="table__users-header">
          <div class="table__users-header-name">Логин пользователя</div>
          <div class="table__users-header-counter">Кол-во заметок</div>
          <div class="table__users-header-status">Статус пользователя</div>
          <div class="table__users-header-role">Роль</div>
          <div class="table__users-header-hidden"></div>
        </div>
        <template v-for="user in userList" :key="user.id">
          <UserCard
            @editStatus="editStatus"
            @editRole="editRole"
            @deleteUserModal="deleteUserModal"
            :user="user"
          />
        </template>
      </div>
    </div>
    <StandartModal
      :active="modals.delete"
      :title="'Вы уверены, что хотите удалить пользователя?'"
      @closeModal="closeModalDelete"
    >
      <div class="modal-wrapper">
        <div class="modal-buttons">
          <main-button :isDark="true" @click="modals.delete = false"
            >Отмена</main-button
          >
          <main-button :isRed="true" @click="deleteUser">Удалить</main-button>
        </div>
      </div>
    </StandartModal>

    <StandartModal
      :active="modals.add"
      :title="'Новый пользователь'"
      @closeModal="closeModalAdd"
    >
      <div class="modal-wrapper">
        <div class="custom-input">
          Логин
          <q-input
            v-model="registerUser.username"
            outlined
            bg-color="white"
            color="white"
            :error="errors.username"
          ></q-input>
        </div>
        <div class="custom-input">
          Пароль
          <q-input
            v-model="registerUser.password"
            outlined
            :error="errors.password"
            bg-color="white"
            color="white"
          ></q-input>
        </div>
        <div class="modal-buttons">
          <main-button :isDark="true" @click="modals.add = false"
            >Отмена</main-button
          >
          <main-button @click="addUser">Добавить</main-button>
        </div>
      </div>
    </StandartModal>
  </q-page>
</template>
<script setup>
import UserCard from "src/components/Users/UserCard.vue";
import MainButton from "src/components/MainButton.vue";
import StandartModal from "src/components/Modals/StandartModal.vue";
import { ref, onMounted, watch } from "vue";
import { useQuasar } from "quasar";
import { api } from "boot/axios";
const currentUser = ref({
  id: null,
});
const canLoad = ref({
  add: true,
  edit: true,
  delete: true,
});

const registerUser = ref({
  username: null,
  password: null,
});

watch([() => registerUser.value.username, () => registerUser.value.password], () => {
    errors.value.username = false;
    errors.value.password = false;
})
const errors = ref({
  username: false,
  password: false,
});
const $q = useQuasar();
const modals = ref({
  edit: false,
  delete: false,
  add: false,
});
const closeModalAdd = () => {
  modals.value.add = false;
};
const closeModalDelete = () => {
  modals.value.add = false;
};
const userList = ref([]);

onMounted(() => {
  takeItems();
});

const takeItems = () => {
  $q.loading.show({
    delay: 1,
  });
  api
    .get(`/users`)
    .then((res) => {
      userList.value = res.data.users;
      userList.value.forEach((el) => {
        if (el.username == "atuny0") {
          el.role = "admin";
        } else {
          el.role = "user";
        }
        el.count = "5";
        el.status = true;
      });
      console.log(userList.value);
      $q.loading.hide();
    })
    .catch((err) => {
      $q.loading.hide();
    });
};

const addUser = () => {
  if (!canLoad.value.add || registerUser.value.username == '' || registerUser.value.username == null || registerUser.value.password == '' || registerUser.value.password == null) {
    errors.value.username = true
    errors.value.password = true
    return;
  }
  canLoad.value.add = false;
  $q.loading.show({
    delay: 1,
  });
  api
    .post(`/users/add`, {
      username: registerUser.value.username.trim(),
      password: registerUser.value.password.trim(),
      role: "user",
      image: "https://robohash.org/doloremquesintcorrupti.png",
      status: false,
    })
    .then((res) => {
      console.log(res);
      $q.loading.hide();
      modals.value.add = false;
      canLoad.value.add = true;
      userList.value = [...userList.value, res.data];
      registerUser.value = { username:null, password:null}
    })
    .catch((err) => {
      console.log(err);
      $q.loading.hide();
      modals.value.add = false;
      canLoad.value.add = true;
      registerUser.value = { username:null, password:null}

    });
};

const deleteUserModal = (id) => {
  currentUser.value.id = id;
  modals.value.delete = true;
};
const deleteUser = () => {
  if (!canLoad.value.delete) {
    return;
  }
  canLoad.value.delete = false;
  $q.loading.show({
    delay: 1,
  });
  api
    .delete(`/users/${currentUser.value.id}`)
    .then((res) => {
      console.log(res);
      userList.value.forEach((el, index) => {
        if (el.id === currentUser.value.id) {
          userList.value.splice(index, 1);
        }
      });
      modals.value.delete = false;
      canLoad.value.delete = true;
      $q.loading.hide();
    })
    .catch((err) => {
      $q.loading.hide();
      canLoad.value.delete = false;
      console.log(err);
      modals.value.delete = false;
    });
};
const editRole = (id, roleId) => {
  if (!canLoad.value.delete) {
    return;
  }
  canLoad.value.edit = false;
  $q.loading.show({
    delay: 1,
  });
  let role;
  if (roleId == "admin") {
    role = "admin";
  } else {
    role = "user";
  }
  api
    .put(`/users/${id}`, {
      role: role,
    })
    .then((res) => {
      canLoad.value.edit = true;
      $q.loading.hide();
      console.log(res);
      if (userList.value.find((user) => user.id === id)) {
        userList.value.find((user) => user.id === id).role = role;
      }
    })
    .catch((err) => {
      canLoad.value.edit = true;
      $q.loading.hide();
      console.log(err);
    });
};
const editStatus = (id, statusId) => {
  if (!canLoad.value.edit) {
    return;
  }
  canLoad.value.edit = false;
  $q.loading.show({
    delay: 1,
  });
  let status;
  if (statusId === 1) {
    status = true;
  } else {
    status = false;
  }
  api
    .put(`/users/${id}`, {
      status: status,
    })
    .then((res) => {
      canLoad.value.edit = true;
      $q.loading.hide();
      console.log(res);
      if (userList.value.find((user) => user.id === id)) {
        userList.value.find((user) => user.id === id).status = status;
      }
    })
    .catch((err) => {
      canLoad.value.edit = true;
      $q.loading.hide();
      console.log(err);
    });
};
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
  color: #fcfcfc;
}

.table__users {
  max-width: 1280px;
  background-color: #2a2a2b;
  color: white;

  margin: 0 auto;
  margin-top: 60px;
}
.table__users-header {
  display: flex;
}
.table__users-header-name {
  max-width: 290px;
  width: 100%;
  padding: 13px 24px;
}
.table__users-header-counter {
  max-width: 250px;
  padding: 13px 24px;
  width: 100%;
}
.table__users-header-status {
  max-width: 250px;
  padding: 13px 24px;
  width: 100%;
}
.table__users-header-role {
  max-width: 250px;
  padding: 13px 24px;
  width: 100%;
}
.table__users-header-hidden {
  max-width: 250px;
  padding: 13px 24px;
  width: 100%;
}
</style>
