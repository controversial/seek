export default [
  {
    path: '/',
    name: 'home',
    component: require('./home/home.vue').default,
  },
  {
    path: '/classes',
    name: 'classes',
    component: require('./classes/list/classes-list.vue').default,
  },
  {
    path: '/classes/:period',
    name: 'class-detail',
    component: require('./classes/class-detail/class-detail.vue').default,
  },
];
