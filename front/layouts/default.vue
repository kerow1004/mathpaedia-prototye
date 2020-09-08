<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dense fixed app :clipped-left="clipped">
      <v-toolbar-side-icon
        @click="drawer = !drawer">
      </v-toolbar-side-icon>

      <v-toolbar-title v-text="title"></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field
        v-model="searchText"
        clearable
        hide-details
        label="Search Problems"
        :append-outer-icon="searchText ? 'send' : null"
        prepend-icon="search"
        single-line
        @click:prepend.prevent="doSearch"
        @click:append-outer.prevent="doSearch"
        @keyup.enter="doSearch"
      ></v-text-field>

      <v-btn icon>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-menu bottom left>
        <v-btn slot="activator" icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            router
            :to="auth.sign">
            <v-list-tile-title>{{ sign }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            router
            :to="auth.register">
            <v-list-tile-title>Register</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      sign: 'Login',
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { icon: 'home', title: 'Home', to: '/' },
        { icon: 'list_alt', title: 'Problems', to: '/problems' },
        { icon: 'create', title: 'Problem Create', to: '/problems/new' },
      ],
      auth: {
        sign: '/auth/login',
        register: '/auth/register',
      },
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Mathpedia',
      searchText: '',
    };
  },
  methods: {
    doSearch() {
      const routeInfo = {
        path: '/search',
        query: {
          searchText: this.searchText,
        },
      };

      console.log('[Header/doSearch]', this.$route);

      if (this.$route.name === 'search') {
        this.$router.replace(routeInfo);
        location.reload(); // eslint-disable-line
      } else {
        this.$router.push(routeInfo);
      }
    },
  },
};
</script>
