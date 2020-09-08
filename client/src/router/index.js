import Home from '../components/Home';
import Problems from '../components/problems/Problems';
import ProblemForm from '../components/problemForm/ProblemForm';
import Search from '../components/Search';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

export default [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/problems',
    component: Problems,
  },
  {
    path: '/problemForm',
    component: ProblemForm,
  },
  {
    path: '/search',
    component: Search,
    props: route => ({
      isSuccess: route.query.isSuccess,
    }),
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
];
