<template>
  <v-card xs12>
    <div v-if="content" class="problem">
      <part :part="content" :index="id"></part>

      <v-card v-if="problem.parts && problem.parts.length > 0">
        <v-container>
          <v-flex xs12>
            <div v-for="(part, partIndex) in problem.parts"
                               :key="`${problem._id}-${partIndex}`">
                <part :part="part" :index="partIndex"></part>
            </div>
          </v-flex>
        </v-container>
      </v-card>
    </div>
  </v-card>
</template>

<script>
import Part from '@/components/problem/Part';

export default {
  name: 'Problem',
  props: ['problem'],
  components: {
    part: Part,
  },
  computed: {
    id() {
      if (!this.problem) {
        return;
      }
      /* eslint-disable */
      return this.problem._id;
      /* eslint-enable */
    },
    content() {
      /* eslint-disable */
      if (!this.problem) {
        return;
      } else {
        return this.problem.content;
      }
      /* eslint-enable */
    },
  },
};
</script>

<style scoped>

</style>
