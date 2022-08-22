import Layout from '@/layout'
export default {
  path: '/employees',
  component: Layout,
  meta: {
    id: 'employees'
  },
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      // path: '/employees/detail/:id',
      // 两种写法，注意/
      path: 'detail/:id',
      component: () => import('@/views/employees/detail'),
      // 不在列表页显示
      hidden: true
    },
    {
      // path: '/employees/detail/:id',
      // 两种写法，注意/
      path: 'print/:id',
      component: () => import('@/views/employees/print'),
      // 不在列表页显示
      hidden: true
    }
  ]
}
