<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <router-link to="/" tag="b-navbar-brand">Problems Bank</router-link>

    <b-collapse is-nav id="nav-collapse">
      <b-navbar-nav>
        <router-link to="/problems" activeClass="active" tag="b-nav-item">
          <a class="nav-link">Problems</a>
        </router-link>
        <router-link to="/problemForm" active-class="active" tag="b-nav-item">
          <a class="nav-link">Problem Create</a>
        </router-link>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text"
                        v-model="searchData" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit"
                    id="search-button"
                    @click="doSearch">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">KO</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <router-link to="/login" active-class="active" tag="b-dropdown-item">
            <a class="nav-link">Login</a>
          </router-link>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      searchData: '',
      isDropdownOpen: false,
    };
  },
  methods: {
    ...mapActions({
      search: 'search',
    }),
    doSearch(e) {
      e.preventDefault();

      this.search(this.searchData)
        .then((response) => {
          let isSuccess = true;

          this.$log.info('[Header/doSearch] response', response);

          if (response.status >= 400) {
            isSuccess = false;
          }

          this.$router.push({
            path: 'search',
            query: { isSuccess },
          });
        })
        .catch((error) => {
          this.$log.error('[Header/doSearch] error', error);
          this.$router.push({
            path: 'search',
            query: { isSuccess: false },
          });
        });
    },
  },
};
</script>

<style scoped>

</style>
