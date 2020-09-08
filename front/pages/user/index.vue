<template>
  <v-container>
    <v-layout class="layoutContainer">
      <profile-component :userProfile="userProfile"
               v-on:saveUserProfile="saveUserProfile"></profile-component>
    </v-layout>
    <v-layout class="layoutContainer">
      <problem-component :questions="questions" :answers="answers"></problem-component>
    </v-layout>
  </v-container>
</template>

<script>
import ProfileComponent from '@/components/user/Profile';
import ProblemComponent from '@/components/user/Problem';
import { profileValues } from '@/components/user/ProfileValues';
import { questionValues, answerValues, problemItem } from '@/components/user/ProblemValues';

export default {
  name: 'User',
  components: {
    'profile-component': ProfileComponent,
    'problem-component': ProblemComponent,
  },
  data() {
    return {
      // Profile component
      userProfile: profileValues,
      // Problem component
      questions: questionValues,
      answers: answerValues,
    };
  },
  computed: {
    userId() {
      return localStorage.getItem('userId');
    },
  },
  mounted() {
    // TODO : 사용자 질문, 답변 가져오기
    const items = [];
    let item;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 3; i++) {
      item = problemItem;
      item.like = 10;
      item.question = 'How do mathematicians and physicists think of SL(2,R) acting on Gaussian functions?';
      item.date = '2018.01.01';
      items.push(item);
    }
    this.questions.items = items;
    this.questions.number = items.length + 10;
    // TODO : 사용자 정보 가져오기
    new Promise((resolve, reject) => {
      this.getUserProfile(this.userId, resolve, reject);
    }).then((res) => {
      if (res.nickname) this.userProfile.nickname = res.nickname;
    }).catch((err) => { console.log(err); });
  },
  methods: {
    getUserProfile(userId, resolve, reject) {
      // TODO : Will be moved to store
      this.$axios.post('http://localhost:3333/graphql', {
        query:
          `query { user(id: ${userId}) {
            username
            nickname
          }}`,
        variables: null,
      }).then((result) => {
        if (result.data.data.user) resolve(result.data.data.user);
        else reject('사용자 정보가 없습니다.');
      }).catch((err) => {
        reject(err);
      });
    },
    saveUserProfile(userProfile, resolve, reject) {
      // TODO : Will be moved to store
      this.$axios.post('http://localhost:3333/graphql', {
        query:
          `mutation ($id: Int!, $input:UserUpdate!) {
            updateUser(id: $id, input:$input) {
              nickname
            }
          }`,
        variables: { input: { nickname: userProfile.nickname }, id: this.userId },
      }).then((result) => {
        if (result.data.data.updateUser) {
          this.userProfile.nickname = result.data.data.updateUser.nickname;
          resolve('저장되었습니다.');
        } else {
          reject('사용자 정보가 없습니다.');
        }
      }).catch((err) => {
        reject(err);
      });
    },
  },
};
</script>

<style scoped>
.layoutContainer {
  max-width: 1089px;
  margin-bottom: 50px;
}
</style>
