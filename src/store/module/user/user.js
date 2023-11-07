import { api } from 'boot/axios'
export default {
    state: {
        user: JSON.parse(localStorage.getItem('logins')) ? JSON.parse(localStorage.getItem('logins')) : null,
        token: '',
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getToken(state) {
            return state.token
        },
    },
    mutations: {
        updateUser(state, payload) {
            state.user = payload
            console.log(payload, 'user')
        },
        updateToken(state, payload) {
            state.token = payload
            console.log(payload, 'token')
        }
    },
    actions: {
        fetchUser(ctx, logins) {
            return new Promise((resolve, reject) => {
                api.post('/auth/login', {
                    username: logins.username.trim(),
                    password: logins.password.trim(),
                }).then((res) => {
                    let role = 'user'
                    if(res.data.username == 'atuny0'){
                        role = 'admin'
                    }
                    const token = res.data.token;
                    const user = {
                        name: res.data.firstName,
                        email: res.data.email,
                        role: role,
                        id: res.data.id,
                        image: res.data.image,
                        username: res.data.username,
                    }
                    ctx.commit('updateUser', user);
                    ctx.commit('updateToken', token);
                    localStorage.setItem('authToken', token);
                    const loginsData = {
                        name: res.data.firstName,
                        email: res.data.email,
                        role: role,
                        id: res.data.id,
                        image: res.data.image,
                        username: res.data.username,
                    }
                    localStorage.setItem('logins', JSON.stringify(loginsData));
                    this.$router.push('/')
                    resolve();
                }).catch((err) => {
                    reject(err)
                })
            })
        },
        checkToken(ctx) {
            // не возвращает юзера
            api.get('/auth/RESOURCE').catch((err) => {
                if (err.response.status === 401) {
                    console.log(err.response, 'token not ok')
                    localStorage.clear()
                }
                if (err.response.status === 404) {
                    if (localStorage.getItem('logins')) {
                        const user = JSON.parse(localStorage.getItem('logins'))
                        ctx.commit('updateUser', user);
                    }
                    console.log(err.response, 'token ok') // костыль апи дает 404 если токен ок
                }
            })
        },
    },
}
