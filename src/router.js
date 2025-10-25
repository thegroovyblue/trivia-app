import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import QuestionPage from '@/views/QuestionPage.vue'

const router = createRouter({
  history: createWebHistory('/trivia-app/'), // <-- align with your URL
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/question/category/:id', name: 'questionByCategory', component: QuestionPage, props: true },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
