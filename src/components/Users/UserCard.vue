<template>
  <div class="table__user">
    <div class="table__user-name">
      <img :src="user.image" alt="img" />
      {{ user.username }}
    </div>
    <div class="table__user-count">{{ user.count }}</div>
    <div class="table__user-status">
      <div class="select" @click="toggleStatus">
        <div v-if="user.status">Активированный</div>
        <div v-else>Деактивированный</div>
        <div class="select-inside" :class="{ active: actions.status }">
          <div
            class="select-inside-item"
            @click="selectStatus(user.id, status.id, status.name)"
            v-for="status in statuses"
            :key="status.id"
          >
            {{ status.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="table__user-role">
      <div class="select" @click="toggleRole">
        <div v-if="user.role == 'admin'">Администратор</div>
        <div v-else>Пользователь</div>
        <div class="select-inside" :class="{ active: actions.role }">
          <div
            class="select-inside-item"
            @click="selectRole(user.id, role.id)"
            v-for="role in roles"
            :key="role.id"
          >
            {{ role.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="table__user-buttons">
      <TestImg :icon-name="'trash'" @click="emit('deleteUserModal', user.id)" />
    </div>
  </div>
</template>

<script setup>
import TestImg from "src/components/img/TestImg.vue";
import { ref, computed, defineEmits } from "vue";
const emit = defineEmits(["editRole", "editStatus", "deleteUserModal"]);

const props = defineProps(["user"]);
const actions = ref({
  role: false,
  status: false,
});

const selectStatus = (userId, statusId) => {
  emit("editStatus", userId, statusId);
};
const selectRole = (userId, roleId) => {
  emit("editRole", userId, roleId);
};

const toggleRole = () => {
  actions.value.role = !actions.value.role;
};
const toggleStatus = () => {
  actions.value.status = !actions.value.status;
};

const roles = ref({
  admin: {
    id: "admin",
    name: "Администратор",
  },
  user: {
    id: "user",
    name: "Пользователь",
  },
});
const statuses = ref({
  active: {
    id: 1,
    name: "Активированный",
  },
  deactive: {
    id: 2,
    name: "Деактивированный",
  },
});
</script>

<style scoped>
.table__user {
  display: flex;
}
.table__user-name {
  max-width: 290px;
  padding: 13px 24px;
  width: 100%;

  display: flex;
  align-items: center;
}
.table__user-name img {
  max-width: 40px;
  max-height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
}
.table__user-count {
  max-width: 250px;
  padding: 13px 24px;
  width: 100%;
}
.table__user-status {
  max-width: 250px;
  padding: 13px 24px;
  width: 100%;
}
.table__user-role {
  max-width: 250px;
  padding: 13px 24px;
  width: 100%;
}
.table__user-buttons {
  display: flex;
  max-width: 250px;
  padding: 13px 24px;
  margin-left: auto;
  cursor: pointer;
}
.select {
  background-color: white;
  border-radius: 16px;
  padding: 2px 8px;
  color: black;
  position: relative;
  font-size: 12px;
  cursor: pointer;
}
.select-inside {
  position: absolute;
  top: 25px;
  background-color: white;
  width: 100%;
  left: 0;
  border-radius: 8px;
  z-index: 2;
  opacity: 0;
  visibility: hidden;
  transition: 0.4s;
  padding: 0 8px;
}
.select-inside.active {
  opacity: 1;
  visibility: visible;
}
</style>
