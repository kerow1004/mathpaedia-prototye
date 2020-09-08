/* global MathJax */

<template>
  <div>
    <!-- Modal Component -->
    <v-dialog v-model="showEditor">
      <v-card>
        <v-card-title>Math Editor</v-card-title>
        <v-card-text>
          <!--<quill v-model="content" :config="config" @text-change="textChange"></quill>-->
          <div class="quill-editor"
               :content="content"
               v-quill:myQuillEditor="config">
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="handleCancel">Cancel</v-btn>
          <v-btn color="green darken-1" flat @click.native="handleOk">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-container>
      <v-layout row>
        <v-flex xs4>
          <v-subheader>Sentence</v-subheader>
        </v-flex>
        <v-flex xs8>
          <div id="problemSentence" class="input-data"
               @click="openMathEditor">{{ part.sentence }}
          </div>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs4>
          <v-subheader>Picture(Graph)</v-subheader>
        </v-flex>
        <v-flex xs8>
          <v-text-field
            v-model="part.picture"
            placeholder="Enter URL of math picture(graph)"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex xs4>
          <v-subheader>Choices</v-subheader>
        </v-flex>
        <v-flex xs8>
          <div v-for="(choice, index) in part.choices" :key="index" class="input-choice">
            <v-layout>
              <v-flex xs10>
                Choice {{ index+1 }}
                <v-text-field
                  v-model="choice.value"
                ></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-btn small color="warning"
                       @click="removeChoice(index)"
                       v-if="part.choices.length > 1">-</v-btn>
                <v-btn small color="primary"
                       @click="addMoreChoice">+</v-btn>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'PartForm',
  props: ['part'],
  data() {
    return {
      content: '',
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
      showEditor: false,
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
      this.showEditor = true;
    },
    handleOk() {
      const ops = this.myQuillEditor.getContents();

      this.showEditor = false;

      this.part.sentence = '';

      ops.forEach((op) => {
        if (_.isPlainObject(op.insert)) {
          if (op.insert.formula) {
            this.part.sentence += `$${op.insert.formula}$`;
          }
        } else {
          this.part.sentence += op.insert;
        }
      });
    },
    handleCancel() {
      this.showEditor = false;
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
