import { LocalStorage } from 'quasar';
export default function (to, from, next) {
  const token = LocalStorage.getItem('authToken'); 
  if (token) {
    return next('/');
  }
  
  return next();
}