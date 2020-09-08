<template>
  <v-container id="profileContainer">
    <v-layout align-center justify-center row wrap>
      <v-flex class="setting"
              v-if="userProfile.isOwner"
              xs12 sm12 md12>
        <v-icon @click="openDialog">settings</v-icon>
      </v-flex>
      <v-flex xs12 sm3 md3 v-bind:class="{center : smAndDown, avatarMarginBottom : smAndDown}">
        <v-avatar
          :size="smAndDown ? 110 : 130"
          color="grey lighten-4">
          <img :src="userProfile.imageSrc || 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'" alt="avatar">
        </v-avatar>
      </v-flex>
      <v-flex xs12 sm5 md6 v-bind:class="{userIntroductionMarginBottom : smAndDown}">
        <v-layout column>
          <v-flex xs12><h2>{{userProfile.nickname || '사용자명이 입력되지 않았습니다.'}}</h2></v-flex>
          <v-flex xs12>{{userProfile.description || '소개글이 입력되지 않았습니다.'}}</v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm4 md3>
        <v-layout column>
          <v-flex class="infoLists" xs12>
            <v-icon class="infoIcon">location_on</v-icon>
            <span class="infoText">{{userProfile.country || '국가'}}, {{userProfile.city || '도시'}}</span>
          </v-flex>
          <v-flex class="infoLists" xs12>
            <v-icon class="infoIcon">visibility</v-icon>
            <span class="infoText">{{userProfile.visitors || 0}}명 방문</span>
          </v-flex>
          <v-flex class="infoLists" xs12>
            <v-icon class="infoIcon">access_time</v-icon>
            <span class="infoText">가입한지 {{userProfile.registeredSince || ''}}</span>
          </v-flex>
          <v-flex class="infoLists" xs12>
            <v-icon class="infoIcon">star_border</v-icon>
            <span class="infoText">즐겨찾기 {{userProfile.favorite || 0}}명</span>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex>
                  <v-text-field
                    v-model="editUserProfile.nickname"
                    :rules="editUserProfile.nicknameRules"
                    :counter="15"
                    label="사용자 명"
                    required></v-text-field>
                  <v-text-field
                    v-model="editUserProfile.description"
                    :rules="editUserProfile.descriptionRules"
                    :counter="50"
                    label="소개 글"
                    required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn :disabled="editDisabled" color="blue darken-1" flat @click="saveUserProfile">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>/**
 * @props userProfile : 사용자 프로필 정보
 *  imageSrc: 프로필 이미지 경로
 *  nickname: 사용자 이름
 *  description: 사용자 설명 문구
 *  country: 국가
 *  city: 도시
 *  visitors: 방문객 수
 *  favorite: 즐겨찾기 수
 *  registeredSince: 가입일 정보
 *
 *  @props boolean isOwner : 프로필의 소유자인지 여부
 */
import { editProfileValues } from './ProfileValues';

export default {
  name: 'Profile',
  props: ['userProfile', 'isOwner'],
  data() {
    return {
      dialog: false,
      editDisabled: false,
      editUserProfile: editProfileValues,
    };
  },
  computed: {
    smAndDown() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
  methods: {
    openDialog() {
      if (!this.userProfile.isOwner) return;
      _.map(this.userProfile, (value, key) => {
        this.editUserProfile[key] = value;
      });
      this.dialog = true;
    },
    saveUserProfile() {
      this.editDisabled = true;
      const save = new Promise((resolve, reject) => {
        this.$emit('saveUserProfile', this.editUserProfile, resolve, reject);
      });
      save.then((res) => {
        this.editDisabled = false;
        alert(res);
        this.dialog = false;
      }).catch((err) => {
        this.editDisabled = false;
        alert(err);
      });
    },
  },
};
</script>

<style scoped lang="scss">
$container-border-color: #bfbfbf;
$container-bg-color: #ffffff;

.center {text-align: center;}
.avatarMarginBottom, .userIntroductionMarginBottom {margin-bottom: 30px;}

#profileContainer {
  background-color: $container-bg-color;
  border: 1px solid $container-border-color;
  border-top: 3px solid $container-border-color;
  .setting {
    position: relative;
    i {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }
  .infoLists {
    margin-bottom: 7px;
    .infoIcon {
      vertical-align: middle;
      margin-right: 3px;
    }
  }
  .infoLists:last-child {margin-bottom: 0;}
}
</style>
