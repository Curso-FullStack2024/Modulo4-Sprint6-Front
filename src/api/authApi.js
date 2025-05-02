import axios from "axios";
const api=axios.create({
    baseURL:'http://127.0.0.1:3500',
})

export const createUsuario =  (user) =>  api.post('/auth/register', user)
export const validarMailToken =  (token) =>  api.get('/auth/verify/token/'+token)
export const login =  (credentials) =>  api.post('/auth/login/',credentials)
export const olvidoPass =  (email) =>  api.post('/auth/forgotpassword/', email)
export const resetPass =  (id, password) =>  api.post('/auth/resetpassword', {id, password})


export default api