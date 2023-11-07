import { LocalStorage } from 'quasar';

export default function (to, from, next) {
const logins = JSON.parse(localStorage.getItem('logins'));
    if (logins && logins.role !== 'admin') {
      return next('/')
    } 
    return next();
  }