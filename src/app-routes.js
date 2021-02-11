import { HomePage, DisplayDataPage, ProfilePage, ExampleComponentsPage } from './pages';

export default [
  {
    path: '/display-data',
    component: DisplayDataPage
  },
  {
    path: '/profile',
    component: ProfilePage
  },
  {
    path: '/home',
    component: HomePage
  }, 
  {
    path: '/example-components',
    component: ExampleComponentsPage
  }
];
