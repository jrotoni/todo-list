
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') },
      { path: 'child1', component: () => import('pages/child1') }
    ]
  },
  {
    path: '/todo',
    component: function () {
      return import('pages/todo')
    }
  },
  {
    path: '/parent',
    component: () => import('pages/page1'),
    children: [
      { path: '', component: () => import('pages/index') },
      { path: 'child1', component: () => import('pages/child1') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
