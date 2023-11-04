export default {
    state:{
        user: '',
        token: '',
    },
    getters:{
        getUser(state){
            return state.user
        },
        getToken(state){
            return state.token
        },
    },
    mutations:{
        updateUser(state, payload){
            state.user = payload
            console.log(payload,'user')
        },
        updateToken(state, payload){
            state.token = payload
            console.log(payload,'token')

        }
    },
}