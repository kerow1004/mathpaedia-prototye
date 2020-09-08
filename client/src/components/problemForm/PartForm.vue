/* global MathJax */

<template>
  <div>
    <!-- Modal Component -->
    <b-modal ref="mathEditor"
             title="Math Editor"
             @ok="handleOk">
      <quill v-model="content" :config="config" @text-change="textChange"></quill>
    </b-modal>

    <b-form-group id="problemSentenceGroup"
                  label="Sentence:"
                  description="Click to edit sentence with math equations">
      <div id="problemSentence" class="input-data"
           @click="openMathEditor">{{ part.sentence }}
      </div>
    </b-form-group>

    <b-form-group id="problemPictureGroup"
                  label="Picture(Graph):"
                  label-for="problemPicture">
      <b-form-input id="problemPicture"
                    type="text"
                    v-model="part.picture"
                    placeholder="Enter URL of math picture(graph)">
      </b-form-input>
    </b-form-group>

    <b-form-group id="problemChoicesGroup"
                  label="Choices:">
      <div v-for="(choice, index) in part.choices" :key="index" class="input-choice">
        <b-input-group :prepend="`Choice ${index+1}`">
          <b-form-input type="text"
                        v-model="choice.value">
          </b-form-input>
          <b-input-group-append>
            <b-btn variant="danger"
                   @click="removeChoice(index)"
                   v-if="part.choices.length > 1">-</b-btn>
            <b-btn variant="success"
                   @click="addMoreChoice">+</b-btn>
          </b-input-group-append>
        </b-input-group>
      </div>
    </b-form-group>
  </div>
</template>

<script>
import Vue from 'vue';
import VueQuill from 'vue-quill';

Vue.use(VueQuill);

export default {
  name: 'PartForm',
  props: ['part'],
  data() {
    return {
      content: {
        ops: [],
      },
      config: {
        modules: {
          formula: true,
          toolbar: [
            ['bold', 'italic', 'underline'],
            ['image', 'code-block'],
            ['formula'],
          ],
        },
      },
      show: true,
    };
  },
  methods: {
    addMoreChoice() {
      this.part.choices.push({ value: '' });
    },
    removeChoice(index) {
      this.part.choices.splice(index, 1);
    },
    openMathEditor() {
      this.$log.info('openMathEditor');
      this.$refs.mathEditor.show();
    },
    textChange(editor) {
      // this.$log.info('[editor/text-change] Text', editor.getText());
      this.$log.info('[editor/text-change] Content', editor.getContents());
    },
    handleOk() {
      const { ops } = this.content;

      this.part.sentence = '';

      ops.forEach((op) => {
        if (this._.isPlainObject(op.insert)) {
          if (op.insert.formula) {
            this.part.sentence += `$${op.insert.formula}$`;
          }
        } else {
          this.part.sentence += op.insert;
        }
      });

      this.$log.info('combined sentence', this.part.sentence);

      /* eslint-disable */
      this.$nextTick(() => {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, 'content-sentence']);
      });
      /* eslint-enable */
    },
  },
};
</script>

<style scoped>
  .input-data {
    border: 1px solid black;
    padding: 10px;
    white-space: pre-wrap;
  }

  .input-choice {
    margin: 5px;
  }
</style>
