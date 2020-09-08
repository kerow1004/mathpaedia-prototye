<template>
  <div>
    <h1>Search</h1>
    <div v-if="searchResults.isSuccess === 'y'">
      <h2 v-if="searchResults.match && searchResults.match.length > 1">Match</h2>
      <problem v-for="problem in searchResults.match"
               :problem="problem"
               :key="`match-${problem._id}`">
      </problem>

      <h2 v-if="searchResults.terms && searchResults.terms.length > 1">Terms</h2>
      <problem v-for="problem in searchResults.terms"
               :problem="problem"
               :key="`terms-${problem._id}`">
      </problem>
    </div>
    <div v-if="searchResults.isSuccess === 'n'">
      <h2>Error on searching</h2>
    </div>
  </div>
</template>

<script>
import Problem from '@/components/problem/Problem';

export default {
  name: 'Search',
  components: {
    problem: Problem,
  },
  computed: {
    searchResults() {
      return this.$store.getters.searchResults;
    },
  },
  async fetch(context) {
    try {
      const response = await context.store.dispatch('search', encodeURI(context.query.searchText));
      console.log('[Search/doSearch] response', response.data);
    } catch (error) {
      console.log('[Search/doSearch] error', error);
    }
  },
};
</script>

<style scoped>

</style>
