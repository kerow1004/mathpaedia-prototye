<template>
  <v-flex class="wrapSection" xs12 sm12 md12>
    <v-layout v-bind="bindingSmAndDown">
      <v-flex class="wrapInfo" xs12 sm12 md2>
        <v-layout align-center justify-center fill-height
                  v-bind="bindingMdAndUp">
          <v-flex class="number">{{lists.number}}</v-flex>
          <v-flex class="text" v-bind:class="{problemInfoMarginLeft : smAndDown}">{{lists.text}}</v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="wrapLists" xs12 sm12 md10>
        <v-layout class="list" row v-for="(item, index) in lists.items" :key="index" v-bind="bindingSmAndDown">
          <v-flex xs10 sm10 md10>
            <v-layout>
              <v-flex class="like">{{item.like}}</v-flex>
              <v-flex class="question" xs12 sm12 md12>{{item.question}}</v-flex>
            </v-layout>
          </v-flex>
          <v-flex class="date" xs2 sm2 md2>{{item.date}}</v-flex>
        </v-layout>
        <v-layout v-if="lists.items.length < 1" align-center fill-height>
          <v-flex v-bind:class="{center : smAndDown}">아직 등록 된 {{lists.text}}이 없습니다.</v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout v-if="lists.number > lists.items.length">
      <v-flex class="wrapMoreButton">
        <v-icon class="moreButton" @click="getMoreLists">expand_more</v-icon>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  name: 'ProblemLists',
  props: ['lists'],
  computed: {
    bindingSmAndDown() {
      const binding = {};
      if (this.$vuetify.breakpoint.smAndDown) binding.column = true;
      return binding;
    },
    bindingMdAndUp() {
      const binding = {};
      if (this.$vuetify.breakpoint.mdAndUp) binding.column = true;
      return binding;
    },
    smAndDown() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
  methods: {
    getMoreLists() {
      // TODO : Get more lists.
    },
  },
};
</script>

<style scoped lang="scss">
$container-border-color: #bfbfbf;
$container-bg-color: #ffffff;

.problemInfoMarginLeft {margin-left: 10px;}

.wrapSection {
  padding: 20px;
  .wrapInfo {
    .number {
      text-align: center;
      font-size: 3.5em;
      flex: none;
    }
    .text {
      font-size: 1.1em;
      flex: none;
    }
  }
  .wrapLists {
    .list {
      margin-bottom: 12px;
      padding-bottom: 10px;
      border-bottom: 1px solid $container-border-color;
      .like {
        height: 33px;
        padding: 5px 10px;
        margin-right: 15px;
        border: 1px solid $container-border-color;
      }
      .question {
        font-size: 1.1em;
      }
      .date {
        width: 100%;
        text-align: right;
      }
    }
    .center {
      text-align: center;
    }
  }
  .wrapMoreButton {
    text-align: center;
    .moreButton {
      cursor: pointer;
    }
  }
}
</style>
