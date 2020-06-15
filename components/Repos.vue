<template>
  <ul v-if="repos && repos.length > 0" class="repos">
    <li class="repos__item" v-for="repo in repos" :key="repo.id">
      <repo-card
        :name="repo.name"
        :stars="repo.stargazers_count"
        :updateDate="repo.updated_at"
        :link="repo.html_url"
        :fullName="repo.full_name"
        :id="repo.id"
      ></repo-card>
    </li>
  </ul>

  <p v-else-if="repos && repos.length === 0" class="error">К сожалению, таких репозиториев не существует :(</p>

</template>

<script>
import RepoCard from '@/components/RepoCard';

export default {
  components: {
    'repo-card': RepoCard,
  },

  props: ['repos'],
};
</script>

<style scoped>
.repos {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 40px 0;
}

.repos__item {
  list-style: none;
  margin: 0 0 20px;
  padding: 0;
}

.error {
  margin: 40px auto;
  font-size: 20px;
}

@media screen and (max-width: 475px) {
  .repos {
    padding: 20px 0;
  }

  .error {
  margin: 20px auto;
  font-size: 14px;
}
}
</style>
