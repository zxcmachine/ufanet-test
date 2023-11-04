import { LocalStorage } from 'quasar';

export default function (to, from, next) {
  const token = LocalStorage.getItem('authToken'); 


  if (!token || token == undefined || token == null || token == '') {
    return next('/auth');
  }

  return next();
}