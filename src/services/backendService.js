import axios from 'axios'
import store from '../store'
import { bus } from '../main'

const instance = axios.create({
    baseURL: 'http://localhost:3000/api'
})

export const backendService = {
    http: instance,
    login: login
}

function login(credentials) {
    return new Promise((resolve, reject) => {
        bus.$emit('preloaderOn')
        instance.post('/login', credentials)
        .then(res => {
            store.dispatch('setUser', res.data)
            bus.$emit('loggedIn')
            resolve()
        })
        .catch(err => {
            console.log(err)
            let errMsg = err.response.data ? err.response.data : 'Error occured'
            reject(errMsg)
        })
        .finally(() => {
            bus.$emit('preloaderOff')
        })
    })
}
