const state = {
  user: {},
};

const mutations = {
  SET_USER(_state, result) {
    _state.user = result;
  },
  CLEAR_USER(_state) {
    _state.user = {};
  },
};

const actions = {
  login({ commit }, loginData) {
    const url = '/auth/login';

    console.log('[Store/Auth/Login] URL', url);

    return this.$axios.post(url, loginData)
      .then((response) => {
        if (response) {
          const result = response.data;

          console.log('[Store/Auth/Login] Login Result', response);

          if (result && result.username === loginData.username) {
            const token = response.data && response.data.token;
            const userId = response.data && response.data.id;

            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);

            result.authenticated = true;
          }

          commit('SET_USER', result);
        }

        return response;
      })
      .catch((error) => {
        this.$log.error(
          '[Store/Auth/Login] Login Error',
          error.response || error.request || error.message,
        );

        return error.response;
      });
  },
  logout({ commit }) {
    const url = '/auth/logout';
    const logoutData = { username: state.username };

    console.log('[Store/Auth/Logout] URL', url);

    return this.$axios.post(url, logoutData)
      .then((response) => {
        if (response) {
          console.log('[Store/Auth/Logout] Logout Result', response);
          commit('CLEAR_USER');
        }

        return response;
      })
      .catch((error) => {
        this.$log.error(
          '[Store/Auth/Logout] Logout Error',
          error.response || error.request || error.message,
        );

        return error.response;
      });
  },
  register({ commit }, registerData) {
    const url = '/auth/register';

    console.log('[Store/Auth/Register] URL', url);

    return this.$axios.post(url, registerData)
      .then((response) => {
        if (response) {
          const result = response.data;

          console.log('[Store/Auth/Register] Register Result', response);

          result.authenticated = true;

          commit('SET_USER', result);
        }

        return response;
      })
      .catch((error) => {
        this.$log.error(
          '[Store/Auth/Register] Register Error',
          error.response || error.request || error.message,
        );

        return error.response;
      });
  },
};

const getters = {
  user(_state) {
    return _state.user;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
