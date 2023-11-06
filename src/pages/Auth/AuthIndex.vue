<template>
    <q-page class="flex auth-wrapper">
        <div class="auth-container">
            <div class="top">
                <TestImg :iconName="'auth-welcome'" />
                <div class="title">Добро пожаловать</div>
                <div class="subtitle">Введите ваш логин и пароль</div>
            </div>
            <div class="middle">
                Логин ( kminchelle ) админ (atuny0)
                <q-input :error="errors.username" v-model="logins.username" outlined bg-color="white"
                    color="white"></q-input>
                Пароль ( 0lelplR ) админ (9uQFF1Lh)
                <q-input :error="errors.password" v-model="logins.password" type="password" outlined bg-color="white"
                    color="white"></q-input>
            </div>
            <MainButton @click="fetchUser" class="auth-button">Войти</MainButton>
        </div>
    </q-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import MainButton from 'src/components/MainButton.vue'
import TestImg from 'src/components/img/TestImg.vue'
const logins = ref({
    username: null,
    password: null,
})

const errors = ref({
    username: false,
    password: false,
})
watch([() => logins.value.username, () => logins.value.password], () => {
    errors.value.username = false;
    errors.value.password = false;
})
const validate = () => {
    if (logins.value.username === '' || logins.value.username === null || logins.value.username === undefined) {
        errors.value.username = true;
        return false;
    }
    if (logins.value.password === '' || logins.value.password === null || logins.value.password === undefined) {
        errors.value.password = true;
        return false;
    }
    return true;
}
const store = useStore();
const fetchUser = () => {
    if (!validate()) {
        return
    }
    store.dispatch('fetchUser', logins.value).catch((err) => {
        if (err.response.status === 400) {
            errors.value.username = true
            errors.value.password = true
        }
    })
}

</script>

<style scoped>
.auth-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

.auth-container {
    padding: 20px;
    background: #2A2A2B;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    max-width: 400px;
    width: 100%;
    align-items: center;
    justify-content: center;
}

.title {
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
    text-align: center;
    color: white;
}

.subtitle {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    text-align: center;
    color: white;

}

.top {
    display: flex;
    margin-top: 20px;
    gap: 8px;
    flex-direction: column;
}

.middle {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: white;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;

}

.auth-button {
    margin-top: 32px;
}
</style>