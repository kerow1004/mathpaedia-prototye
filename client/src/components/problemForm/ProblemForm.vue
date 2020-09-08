/* global MathJax */

<template>
  <div style="margin-top: 20px;">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <part-form :part="form.problem"></part-form>

      <b-button size="sm" variant="outline-success" @click="addPart">
        Add Part
      </b-button>

      <b-container v-if="form.parts.length > 0">
        <b-row cols="12" md="6">
          <b-card class="part-card" v-for="(part, partIndex) in form.parts" :key="partIndex">
            <b-button class="float-right remove-part-button" size="sm" variant="outline-danger"
                      @click="removePart(partIndex)">
              <font-awesome-icon :icon="faMinus" />
            </b-button>
            <part-form class="float-none" :part="part"></part-form>
          </b-card>
        </b-row>
      </b-container>

      <hr/>

      <b-form-group id="problemKeywordsGroup"
                    label="Keywords:"
                    label-for="problemKeywords"
                    description="Multiple keywords with comma separation">
        <b-form-input id="problemKeywords"
                      type="text"
                      v-model="form.keywords"
                      placeholder="Enter mathematics concept keywords">
        </b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faMinus from '@fortawesome/fontawesome-free-solid/faMinus';
import Vue from 'vue';
import VueQuill from 'vue-quill';
import PartForm from './PartForm';

Vue.use(VueQuill);

export default {
  name: 'ProblemCreate',
  components: {
    PartForm,
    FontAwesomeIcon,
  },
  data() {
    return {
      form: {
        problem: {
          sentence: '',
          picture: '',
          choices: [
            {
              value: '',
            },
          ],
        },
        parts: [],
        keywords: '',
      },
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
  computed: {
    faMinus() {
      return faMinus;
    },
  },
  methods: {
    addPart() {
      this.form.parts.push({
        sentence: '',
        picture: '',
        choices: [
          {
            value: '',
          },
        ],
      });
    },
    removePart(index) {
      this.form.parts.splice(index, 1);
    },
    onSubmit(evt) {
      evt.preventDefault();

      const problem = {};
      const content = {};

      content.sentence = this.form.problem.sentence;

      if (this.form.problem.picture) {
        content.picture = this.form.problem.picture;
      }
      if (this.form.problem.choices) {
        content.choices = this._.map(this.form.problem.choices, 'value');
      }
      if (this.form.parts.length > 0) {
        problem.parts = this.form.parts;
      }

      problem.content = content;
      problem.keywords = this._.map(this.form.keywords.split(','), this._.trim);

      this.$store.dispatch('postProblem', problem)
        .then((response) => {
          this.$log.info('[ProblemCreate] problem post is success', response);
        })
        .catch((error) => {
          this.$log.info('[ProblemCreate] problem post is failure', error);
        });
    },
    onReset(evt) {
      evt.preventDefault();

      /* Reset our form values */
      this.form.problem = {
        sentence: '',
        picture: '',
        choices: [{ value: '' }],
      };
      this.form.parts = [];

      this.form.keywords = '';

      this.content = { ops: [] };

      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style scoped>
  .part-card {
    margin: 10px 0;
  }

  .remove-part-button {
    position: relative;
    top: -10px;
    right: -10px;
  }
</style>
