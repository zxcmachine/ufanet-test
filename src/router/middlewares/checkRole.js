import { LocalStorage } from 'quasar';

export default function (to, from, next) {
const token = LocalStorage.getItem('authToken'); 
const logins = JSON.parse(localStorage.getItem('logins'));
    if (logins && logins.role !== 'admin') {
      return next('/')
    } 
    return next();
  }