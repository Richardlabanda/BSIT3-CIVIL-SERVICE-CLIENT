import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home/index.vue';
import About from '@/views/About/index.vue';
import ContactUs from '@/views/ContactUs/index.vue';
import SignIn from '@/views/SignIn/index.vue';
import SignUp from '@/views/SignUp/index.vue';
import ExamPage from '@/views/ExamPage/index.vue';


const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/contact-us', component: ContactUs },
  { path: '/sign-in', component: SignIn },
  { path: '/sign-up', component: SignUp },
  { path: '/exam', component: ExamPage },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
