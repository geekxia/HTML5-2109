import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const Home = () => import('./views/study/Home.vue')
const Find = () => import('./views/study/Find.jsx')
const Cnode = () => import('./views/cnode/Cnode.tsx')

const TestA = () => import('./views/study2/TestA.vue')
const TestB = () => import('./views/study2/TestB.jsx')

const router = createRouter({

  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes: [
    { path: '/home', component: Home },
    { path: '/find', component: Find },
    { path: '/cnode', component: Cnode },
    { path: '/test/a', component: TestA },
    { path: '/test/b', component: TestB },
    { from: '/*', redirect: '/find' }
  ]
})
export default router
