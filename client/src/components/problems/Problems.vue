<template>
  <b-list-group id="problems-list">
    <problem v-for="problem in problems" :problem="problem" :key="problem._id"></problem>
  </b-list-group>
</template>

<script>
import Problem from './Problem';

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
  created() {
    this.$log.info('[Problems] created');
    this.$store.dispatch('getProblems');

    /* eslint-disable */
    this.$nextTick(() => {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'problems-list']);
    });
    /* eslint-enable */
  },
};
</script>

<style scoped>

</style>
