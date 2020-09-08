<template>
  <div>
    <problem :problem="problem"></problem>
    <div v-if="keywords.equations.length > 0">
      <h4>Equations</h4>
      <ul>
        <li v-for="(eq, eqIndex) in keywords.equations" :key="'eq' + eqIndex">
          {{ eq }}
        </li>
      </ul>
    </div>
    <div v-if="keywords.words.length > 0">
      <h4>Words</h4>
      <li v-for="(wd, wdIndex) in keywords.words" :key="'wd' + wdIndex">
        {{ wd }}
      </li>
    </div>
  </div>
</template>

<script>
import Problem from '@/components/problem/Problem';
import AlgebraLatex from 'algebra-latex';
import algebraJS from 'algebra.js';

export default {
  name: 'Problems',
  components: {
    problem: Problem,
  },
  computed: {
    problem() {
      return this.$store.getters.problem;
    },
    keywords() {
      if (!this.problem.content) {
        return {};
      }

      let { sentence } = this.problem.content;

      console.log('[Pages/problems/_id] problem', this.problem);

      sentence = sentence.replace(/\$\$/g, '$');

      const regex = /\$([^$]+)\$/g;
      const matched = sentence.match(regex);
      const equations = matched ? matched.map(eq => eq.replace(/\$/g, '')) : [];
      const words = sentence.replace(regex, '@##@').split('@##@');

      equations.forEach((eq) => {
        const algebraObj = new AlgebraLatex(eq);
        console.log('[Pages/problems/_id] equation', eq, algebraObj, algebraObj.toAlgebra(algebraJS));
      });

      return { equations, words };
    },
  },
  async fetch(context) {
    console.log('[Pages/problems/_id] params', context.params);

    if (!context.params.id) {
      context.error({ statusCode: 404, message: 'Page Not Found' });
    } else {
      await context.store.dispatch('getProblems', context.params.id);
    }
  },
};
</script>

<style scoped>

</style>
