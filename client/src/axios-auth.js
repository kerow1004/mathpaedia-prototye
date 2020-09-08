import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4060/api',
});

instance.defaults.headers.common['SOMETHING'] = 'something';

export default instance;
