<template>
  <v-card id="problems-list">
    <v-container
      fluid
      style="min-height: 0;"
      grid-list-lg
    >
      <v-layout row wrap>
        <v-flex xs12>
          <div v-for="problem in problems" :key="problem._id">
            <nuxt-link :to="`/problems/${problem._id}`">
              <problem :problem="problem"></problem>
            </nuxt-link>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import Problem from '@/components/problem/Problem';

export default {
  name: 'Problems',
  components: {
    problem: Problem,
  },
  computed: {
    problems() {
      return this.$store.getters.problems;
    },
  },
  async fetch(context) {
    console.log('[Problems] fetch');
    await context.store.dispatch('getProblems');
  },
  ...['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed'].reduce((acc, method) => {
    acc[method] = function () {
      console.log('[Problems] life cycle method:', method);
    };

    return acc;
  }, {}),
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
