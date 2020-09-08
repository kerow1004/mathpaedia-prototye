<template>
  <b-list-group-item>
    <div v-if="content" class="problem">
      <part :part="content" :index="id"></part>

      <b-list-group v-if="problem.parts">
        <b-list-group-item v-for="(part, partIndex) in problem.parts"
                           :key="`${problem._id}-${partIndex}`">
          <part :part="part" :index="partIndex"></part>
        </b-list-group-item>
      </b-list-group>
    </div>
  </b-list-group-item>
</template>

<script>
import Part from './Part';

export default {
  name: 'Problem',
  props: ['problem'],
  components: {
    part: Part,
  },
  computed: {
    id() {
      /* eslint-disable */
      return this.problem._id;
      /* eslint-enable */
    },
    content() {
      return this.problem.content;
    },
  },
};
</script>

<style scoped>

</style>
