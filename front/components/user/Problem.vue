<template>
  <v-container id="problemContainer">
    <v-layout align-center justify-center row wrap>
      <v-flex class="title" xs12 sm12 md12>
        <h3>Problems</h3>
      </v-flex>
      <problem-lists-component :lists="questions"></problem-lists-component>
      <div class="centerLine"></div>
      <problem-lists-component :lists="answers"></problem-lists-component>
    </v-layout>
  </v-container>
</template>

<script>
import ProblemListsComponent from '@/components/user/ProblemLists';

export default {
  name: 'Problem',
  props: ['questions', 'answers'],
  components: {
    'problem-lists-component': ProblemListsComponent,
  },
};
</script>

<style scoped lang="scss">
$container-border-color: #bfbfbf;
$container-bg-color: #ffffff;

#problemContainer {
  background-color: $container-bg-color;
  border: 1px solid $container-border-color;
  border-top: 3px solid $container-border-color;
  padding: 0;
  .title {
    padding: 10px;
    border-bottom: 1px solid $container-border-color;
    h3 {
      font-size: 1em;
      font-weight: 400;
    }
  }
  .centerLine {
    border-top: 1px dashed $container-border-color;
    height: 1px;
    width: 90%;
  }
}
</style>
