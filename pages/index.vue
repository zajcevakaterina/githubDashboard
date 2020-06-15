<template>
  <main class="dashboard">
    <h1 class="dashboard__title">Репозитории GitHub</h1>
    <p class="dashboard__subtitle">Это "витрина" репозиториев GitHub.</p>
    <p
      class="dashboard__subtitle"
    >Вы можете посмотреть наиболее популярные репозитории или найти нужный в поиске по его названию.</p>
    <form class="dashboard__search-form" v-on:submit.prevent="searchRepo">
      <input
        class="dashboard__input"
        placeholder="Введите название репозитория"
        v-model="inputText"
        type="text"
        minlength="1"
        maxlength="246"
      />
      <button type="submit" class="dashboard_submit-button">Найти</button>
      <button type="submit" class="dashboard_submit-button_type_mobile"></button>
    </form>
    <repos :repos="repos.items"></repos>
    <pagination :totalItems="repos.total_count" :inputText="inputText"></pagination>
  </main>
</template>

<script>
import Repos from '@/components/Repos';
import Pagination from '@/components/Pagination';

export default {
  components: {
    repos: Repos,
    pagination: Pagination,
  },

  data() {
    return {
      inputText: '',
      repoName: '',
    };
  },

  computed: {
    repos() {
      return this.$store.getters['repos/getRepos'];
    },
  },

  methods: {
    searchRepo() {
      this.$store.dispatch('repos/fetchSearchResults', {
        inputText: this.inputText,
        page: 1,
      });
      this.$router.push({
        path: '/',
        query: { page: 1, search: this.inputText },
      });
    },
  },

  beforeMount() {
    this.inputText = this.$route.query.search;
    if (this.inputText) {
      this.$store.dispatch('repos/fetchSearchResults', {
        inputText: this.inputText,
        page: this.$route.query.page,
      });
    } else {
      this.$store.dispatch('repos/fetchRepos', {
        page: this.$route.query.page,
      });
    }
  },
};
</script>

<style>
.dashboard {
  padding: 60px 0;
}

.dashboard__title {
  font-size: 40px;
  font-weight: 800;
  margin: 0 0 20px;
}

.dashboard__subtitle {
  font-size: 24px;
  margin: 0 0 20px;
}

.dashboard__search-form {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.dashboard__input {
  width: 85%;
  height: 40px;
  border: 1px solid #000;
  border-radius: 2px;
  padding-left: 4px;
  font-size: 20px;
  box-sizing: border-box;
  font-family: inherit;
}

.dashboard_submit-button {
  background: #000;
  box-sizing: border-box;
  width: 12%;
  color: #fff;
  font-size: 20px;
  font-family: inherit;
  border: 1px solid #fff;
  border-radius: 2px;
  opacity: 1;
  transition: opacity 0.2s linear;
  cursor: pointer;
  height: 40px;
}

.dashboard_submit-button:hover {
  opacity: 0.8;
}

.dashboard_submit-button_type_mobile {
  display: none;
  box-sizing: border-box;
  background-color: #000;
  background-image: url(https://www.iconsdb.com/icons/preview/white/magnifying-glass-3-xxl.png);
  width: 12%;
  height: 30px;
  border: 1px solid #000;
  border-radius: 2px;
  padding: 4px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

@media screen and (max-width: 768px) {
  .dashboard {
    padding: 30px 0;
  }

  .dashboard__title {
    font-size: 28px;
    margin: 0 0 10px;
  }

  .dashboard__subtitle {
    font-size: 18px;
    margin: 0 0 40px;
  }

  .dashboard__input {
    height: 30px;
    padding-left: 4px;
    font-size: 14px;
  }

  .dashboard_submit-button {
    display: none;
  }

  .dashboard_submit-button_type_mobile {
    display: block;
  }
}

@media screen and (max-width: 475px) {
  .dashboard {
    padding: 20px 0;
  }

  .dashboard__title {
    font-size: 20px;
  }

  .dashboard__subtitle {
    font-size: 14px;
    margin: 0 0 20px;
  }
}
</style>
