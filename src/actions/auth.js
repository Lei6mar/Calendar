import Swal from "sweetalert2"
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
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

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken('auth/renew')
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
      dispatch(checkingFinished())
    }
  }
}

const checkingFinished = () => ({type: types.authCheckingFinished})

const login = (user) => ({
  type: types.authLogin,
  payload: user
})

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear()
    dispatch(logout())
  }
}

const logout = () => ({type: types.authLogout})