<template>
    <q-page class="flex auth-wrapper">
        <div class="auth-container">
            <div class="top">
                <TestImg :iconName="'auth-welcome'" />
                <div class="title">Добро пожаловать</div>
                <div class="subtitle">Введите ваш логин и пароль</div>
            </div>
            <div class="middle">
                Логин ( kminchelle ) админ ()
                <q-input :error="errors.username" v-model="username" outlined bg-color="white" color="white"></q-input>
                Пароль ( 0lelplR ) админ ()
                <q-input :error="errors.password" v-model="password" type="password" outlined bg-color="white"
                    color="white"></q-input>
            </div>
            <MainButton @click="fetchUser" class="auth-button">Войти</MainButton>
        </div>
    </q-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import { api } from 'boot/axios'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import MainButton from 'src/components/MainButton.vue'
import TestImg from 'src/components/img/TestImg.vue'
import { LocalStorage } from 'quasar'
const router = useRouter()
const username = ref(null)
const password = ref(null)
const errors = ref({
    username: false,
    password: false,
})

watch(username, () => {
    errors.value.username = false
    errors.value.password = false
});
watch(password, () => {
    errors.value.username = false
    errors.value.password = false
});
const validate = () => {
    if (username.value === '' || username.value === null | username.value === undefined) {
        errors.value.username = true
        return false
    }
    if (password.value === '' || password.value === null | password.value === undefined) {
        errors.value.password = true
        return false
    }
    return true
}
const store = useStore();

const fetchUser = () => {
    if (!validate()) {
        return
    }
    api.post('/auth/login', {
        username: username.value.trim(),
        password: password.value.trim()
    }).then((res) => {
        console.log(res.data)
        const token = res.data.token
        const user = {
            name: res.data.firstName,
            email: res.data.email,
            role: 'user',
            id: res.data.id,
            image: res.data.image,
            username: res.data.username,
        }
        store.commit('updateUser', user);
        store.commit('updateToken', token);
        localStorage.setItem('authToken', token)
        const logins = {
            username: username.value,
            password: password.value
        }
        localStorage.setItem('logins', logins) // это костыль на перепроверку юзера
        router.push('/')
    }).catch((err) => {
        console.log(err)
        errors.value.username = true
        errors.value.password = true
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