<template>
  <header class="header">
    <container class="header__container">
      <h2 class="header__title" @click="restartPage">GitHub Dashboard</h2>
    </container>
  </header>
</template>

<script>
import Container from '@/components/Container';
export default {
  components: {
    container: Container,
  },

  methods: {
    restartPage() {
      this.$router.push({ path: '/', query: { page: 1} });
      this.$store.dispatch('repos/fetchRepos', {
        page: 1,
      });
    },
  },
};
</script>

<style scoped>
.header {
  background: #000;
}

.header__container {
  display: flex;
  align-items: center;
  min-height: 60px;
}

.header__title {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  padding: 0;
  cursor: pointer;
}

.header__link {
  text-decoration: none;
  color: #fff;
  cursor: pointer;
}
</style>
