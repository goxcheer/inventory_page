export default [
  {
    path: '/login',
    name: 'login',
    meta:{
      title: '登陆'
    },
    component: () => import('@/view/Login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: () => import('@/view/Main.vue'),
    children: [
      {
        path: '/home',
        meta: {
          title: '首页'
        },
        component: () => import('@/view/Home.vue')
      }
    ]
  }
]
