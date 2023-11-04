<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-dark">
      <q-toolbar class="header-toolbar">

        <q-toolbar-title>
          <router-link class="active" to="/"> noty </router-link>

        </q-toolbar-title>

        <div class="flex header-items">
          <div class="header-icon"><img src="https://robohash.org/autquiaut.png" alt="image"></div>
          <div class="header-content">
            <div class="header-text">{{ user.username }}</div>
            <div class="header-text">{{ user.email }}</div>
          </div>
          <div class="header-logout flex" @click="logout">
            <test-img :icon-name="'logout-icon'"></test-img>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import TestImg from 'src/components/img/TestImg.vue';
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter()
const store = useStore();
const user = computed(() => store.getters.getUser)
const token = computed(() => store.getters.getToken)

const logout = () => {
  localStorage.clear()
  router.push('/auth')

}
</script>

<style scoped>
.header-icon {
  max-width: 48px;
  max-height: 48px;
  overflow: hidden;
  border-radius: 50%;
}

.header-items {
  gap: 10px;
}

.header-icon img {
  width: 100%;
  object-fit: cover;
}

.header-toolbar {
  padding: 16px;
}

.header-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.header-text {
  display: flex;
}
</style>