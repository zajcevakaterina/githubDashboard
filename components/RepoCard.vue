<template>
  <div class="repo-card" @click="goToRepoPage">
    <h3 class="repo-card__name">{{ name }}</h3>
    <update-date class="repo-card__update-date" :dateToFormat="updateDate"></update-date>
    <stars-info class="repo-card__stars"
    :starsNumber="stars"
    />
    <a class='repo-card__link' :href="link" target="_blank">Посмотреть на GitHub &rarr;</a>
  </div>
</template>

<script>
import StarsInfo from '@/components/StarsInfo';
import DateFormatted from '@/components/DateFormatted';

  export default {
    components: {
      'stars-info': StarsInfo,
      'update-date': DateFormatted
    },

    props: ['name', 'stars', 'updateDate', 'link', 'fullName', 'id'],

    methods: {
      goToRepoPage: function(evt) {
        if (!evt.target.classList.contains('repo-card__link')) {
          this.$router.push(`/${this.fullName}`);
        } else {
          return;
        }
      }
    }
  }

</script>

<style scoped>
.repo-card {
  display: grid;
  width: 60%;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
  padding: 20px;
  border: 1px solid #000;
  text-decoration: none;
  color: #000;
  transition: all .2s linear;
  cursor: pointer;
  margin: 0 auto;
  box-sizing: border-box;
}

.repo-card:hover {
  transform: scale(1.03);
  -webkit-transform: scale(1.03);
  -moz-transform: scale(1.03);
  -o-transform: scale(1.03);
}

.repo-card__name {
  font-size: 20px;
  font-weight: 800;
  margin: 0 0 20px;
  max-width: 665px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.repo-card__stars {
  align-self: flex-end;
}

.repo-card__update-date {
  font-size: 14px;
  margin: 0;
}

.repo-card__link {
  font-size: 14px;
  color: #000;
  cursor: pointer;
  transition: color .2s linear;
  align-self: flex-end;
}

.repo-card__link:hover {
  color: orange;
}

@media screen and (max-width: 768px){
  .repo-card {
  width: 80%;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
  padding: 10px;
}

.repo-card__name {
  font-size: 16px;
}
.repo-card__update-date {
  font-size: 12px;
}

.repo-card__link {
  font-size: 12px;
}
}

@media screen and (max-width: 475px){
  .repo-card {
  width: 100%;
  }

  .repo-card__name {
  margin-bottom: 10px;
}
.repo-card__update-date {
  margin-bottom: 5px;
}

.repo-card__link {
  margin-top: 20px;
}
}

@media screen and (max-width: 425px){
  .repo-card {
    grid-template-columns: 1fr;
  }

  .repo-card__link {
    text-align: right;
  }
}
</style>
