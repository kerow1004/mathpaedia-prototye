<template>
  <v-card v-if="part">
    <v-container>
      <v-layout column>
        <v-flex>
          <div v-if="part.sentence" class="part-sentence">
            <strong>{{ index + 1 }}</strong>. {{ part.sentence }}
          </div>
        </v-flex>
        <v-flex>
          <div v-if="part.picture" class="picture-container">
            <img :src="part.picture" class="picture">
          </div>
        </v-flex>
        <v-flex>
          <div v-if="part.choices && part.choices.length > 1" class="part-choices">
            <ol>
              <li v-for="(choice, index) in part.choices" :key="index">{{ choice }}</li>
            </ol>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'Part',
  props: ['part', 'index'],
  mounted() {
    renderMathInElement(this.$el, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\[', right: '\\]', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false },
      ],
    });
  },
};
</script>

<style scoped>
  .part-sentence {
    white-space: pre-wrap;
  }

  .picture-container {
    text-align: center;
  }

  .picture {
    width: 200px;
  }

  .part-choices {
    margin: 20px;
  }
</style>
