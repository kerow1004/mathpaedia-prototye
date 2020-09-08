<template>
  <div style="margin-top: 20px;">
    <v-form @submit="onSubmit" @reset="onReset" v-if="show">
      <part-form :part="form.problem"></part-form>

      <v-btn small outline color="success" @click="addPart">
        Add Part
      </v-btn>

      <v-container v-if="form.parts.length > 0">
        <v-card color="grey lighten-4"
                v-for="(part, partIndex) in form.parts" :key="partIndex">
          <v-btn small outline color="warning"
                    @click="removePart(partIndex)">
            <v-icon>remove</v-icon>
          </v-btn>
          <part-form class="float-none" :part="part"></part-form>
        </v-card>
      </v-container>

      <hr/>

      <v-layout row>
        <v-flex xs4>
          <v-subheader>Keywords</v-subheader>
        </v-flex>
        <v-flex xs8>
          <v-text-field
            v-model="form.keywords"
            placeholder="Enter mathematics concept keywords"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-btn type="submit" color="primary">Submit</v-btn>
      <v-btn type="reset" color="error">Reset</v-btn>
    </v-form>
  </div>
</template>

<script>
import PartForm from '@/components/problem/PartForm';

export default {
  name: 'ProblemCreate',
  components: {
    PartForm,
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
        content.choices = _.map(this.form.problem.choices, 'value');
      }
      if (this.form.parts.length > 0) {
        problem.parts = this.form.parts;
      }

      problem.content = content;
      problem.keywords = _.map(this.form.keywords.split(','), _.trim);

      this.$store.dispatch('postProblem', problem)
        .then((response) => {
          console.log('[ProblemCreate] problem post is success', response);
        })
        .catch((error) => {
          console.log('[ProblemCreate] problem post is failure', error);
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
