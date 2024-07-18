/Configure Vue Router in router/index.js:

import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import TaskList from '../components/TaskList.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/tasks', component: TaskList },
    { path: '*', redirect: '/login' }
  ]
});
