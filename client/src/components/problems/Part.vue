<template>
  <div v-if="part">
    <div v-if="part.sentence" class="part-sentence">
      <strong>{{ index + 1 }}</strong>. {{ part.sentence }}
    </div>
    <div v-if="part.picture" class="picture-container">
      <img :src="part.picture" class="picture">
    </div>
    <div v-if="part.choices && part.choices.length > 1">
      <ol>
        <li v-for="(choice, index) in part.choices" :key="index">{{ choice }}</li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Part',
  props: ['part', 'index'],
};
</script>

<style scoped>
  .part-sentence {
    padding: 10px;
    white-space: pre-wrap;
  }

  .picture-container {
    text-align: center;
  }

  .picture {
    width: 200px;
  }
</style>
