// @ts-ignore
import Cookies from "js-cookie"

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey,  `${token}`)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getSessionStorage(key: string) {
  return sessionStorage.getItem(key)
}

export function setSessionStorage(key: string, value: string) {
  return sessionStorage.setItem(key, value)
}
