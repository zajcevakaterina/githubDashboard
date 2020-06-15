<template>
    <main class="repo">
      <div class="repo__section">
        <h1 class="repo__name">{{ repo.name}}</h1>
        <div class="repo__heading-info">
          <div class="repo__main-info">
          <stars-info :starsNumber="repo.stargazers_count" />
          <update-date class="repo__update-date" :dateToFormat="repo.updated_at"></update-date>
          <a class="repo__link" :href="repo.html_url" target="_blank">Посмотреть на GitHub &rarr;</a>
          </div>
          <div class="repo__owner-info">
            <h2 class="repo__owner">Владелец репозитория <span class="repo__owner-name">{{ repo.owner.login }}</span></h2>
             <div class="repo__avatar" :style="`background-image: url('${repo.owner.avatar_url}')`"></div>
          </div>

        </div>
      </div>
      <div class="repo__section"></div>

      <div class="repo__section" v-if="(langs.length > 0)">
        <h2 class="repo__section-title">Языки программирования</h2>
        <ul class="repo__langs">
          <li class="repo__lang" v-for="lang in langs" :key="lang">{{ lang }}</li>
        </ul>
      </div>

      <div class="repo__section" v-if="(repo.description)">
        <h2 class="repo__section-title">Описание репозитория</h2>
        <p class="repo__description">{{ repo.description }}</p>
      </div>

      <div class="repo__section">
        <h2 class="repo__section-title">Наиболее активные контрибьюторы</h2>
          <ul class="repo__contributors">
          <li class="repo__contributor" v-for="contributor in contributors" :key="contributor.id">
            <div class="repo__contributor-avatar" :style="`background-image: url('${contributor.avatar_url}')`"></div>
            <p class="repo__contributor-name">{{contributor.login}}</p>
            </li>
            </ul>
      </div>
    </main>
</template>

<script>
import StarsInfo from '@/components/StarsInfo';
import DateFormatted from '@/components/DateFormatted';

export default {
  components: {
    'stars-info': StarsInfo,
    'update-date': DateFormatted,
  },

  computed: {
    repoId() {
      return this.$route.params.id;
    },

    repo() {
      return this.$store.getters['repos/getCurrentRepo'];
    },

    langs() {
      return this.$store.getters['repos/getLangs'];
    },

    contributors() {
      return this.$store.getters['repos/getContributors'];
    },
  },

  async fetch({ store, route }) {
    await Promise.all([
     store.dispatch('repos/fetchCurrentRepo', route.params.companyName + '/' + route.params.name),
     store.dispatch('repos/fetchCurrentRepoLangs', route.params.companyName + '/' + route.params.name),
     store.dispatch('repos/fetchCurrentRepoContributors', route.params.companyName + '/' + route.params.name),
    ]);
  },
};
</script>

<style scoped>
.repo {
  padding: 40px 0;
}

.repo__heading-info {
  display: flex;
  justify-content: space-between;
}
.repo__section {
  margin-bottom: 32px;
}

.repo__section:last-of-type {
  margin-bottom: 0;
}

.repo__link {
  color: #000;
  transition: color .2s linear;
}

.repo__link:hover {
  color: orange;
}

.repo__owner-info {
  display: flex;
}

.repo__owner {
  max-width: 250px;
  text-align: right;
  margin: 0 20px 0;
  font-weight: 400;
  font-size: 20px;
}

.repo__owner-name {
  font-weight: 600;
  font-size: 28px;
  margin: 20px 0 0;
}

.repo__name {
  font-size: 40px;
  font-weight: 800;
  margin: 0 0 40px;
}

.repo__avatar {
  width: 100px;
  height: 100px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 50%;
}

.repo__section-title {
  font-size: 20px;
  margin: 0 0 20px;
}

.repo__contributors {
  padding: 20px 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  column-gap: 15px;
  justify-items: center;
  align-items: center;
}

.repo__contributor {
  list-style: none;
  padding: 0;
  margin: 0;
}

.repo__contributor-name {
 font-weight: 600;
 text-align: center;
 max-width: 120px;
 overflow: hidden;
 text-overflow: ellipsis;
}

.repo__contributor-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

@media screen and (max-width: 768px) {

  .repo {
  padding: 30px 0;
}

  .repo__name {
    font-size: 28px;
  }
  .repo__heading-info {
  flex-direction: column;
}

.repo__owner-info {
  flex-direction: column;
}

.repo__owner {
  max-width: 100%;
  text-align: left;
  margin: 40px 0 20px;
  font-weight: 400;
  font-size: 20px;
}

.repo__owner-name {
  font-weight: 600;
  font-size: 20px;
}

.repo__contributors {
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  column-gap: 10px;
}
}
</style>
