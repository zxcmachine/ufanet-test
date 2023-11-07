import { LocalStorage } from 'quasar';

export default function (to, from, next) {
  const token = LocalStorage.getItem('authToken'); 
  const role = JSON.parse(localStorage.getItem('logins')).role
  if (!token || token === undefined || token === null || token === '') {
    return next('/auth');
  }
  
  return next();
}