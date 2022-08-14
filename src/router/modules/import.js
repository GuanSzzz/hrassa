import Layout from '@/layout'
export default {
  path: '/import',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/import'),
    //   meta: { title: '员工', icon: 'people' }
    }
  ]
}
