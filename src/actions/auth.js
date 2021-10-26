import Swal from "sweetalert2"
import { fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types"

export const startLogin = (email, password) => {
  return async(dispatch) => {
    const resp = await fetchSinToken('auth/login', {email,password}, 'POST')
    const body = await resp.json()

    if(body.ok){
      localStorage.setItem('token', body.usuario.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(login({
        uid: body.usuario.uid,
        name: body.usuario.name
      }))
    } else{
      Swal.fire('Error', body.msg, 'error')
    }
  }
}

export const starRegister = (name, email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken('auth/new', {name, email, password}, 'POST')
    const body = await resp.json()

    if(body.ok){
      localStorage.setItem('token', body.usuario.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      dispatch(login({
        uid: body.usuario.uid,
        name: body.usuario.name
      }))
    } else{
      Swal.fire('Error', body.msg, 'error')
    }
  }
}

const login = (user) => ({
  type: types.authLogin,
  payload: user
})