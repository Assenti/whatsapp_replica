import axios from 'axios'
import store from '../store'
import config from '../../config'
import { bus } from '../main'

const instance = axios.create({
    baseURL: `${config.devHost}/api`
})

export const backendService = {
    http: instance,
    setJwt: setJwt
}

function setJwt() {
    instance.defaults.headers.common['Authorization'] = store.getters.getToken
}
