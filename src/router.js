import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import LegoView from './views/LegoView.vue'
import CardView from './views/CardView.vue'
import GkView from './views/GkView.vue'
import ToysView from './views/ToysView.vue'
import AboutView from './views/AboutView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/lego', component: LegoView },
  { path: '/card', component: CardView },
  { path: '/gk', component: GkView },
  { path: '/toys', component: ToysView },
  { path: '/about', component: AboutView }
]

const path = process.env.NODE_ENV === 'production' ? '/collection/' : ''

const router = createRouter({
  history: createWebHistory(path),
  routes
})

export default router