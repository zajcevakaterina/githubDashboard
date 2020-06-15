<template>
  <div v-if="totalItems" class="pagination">
    <ul class="pagination__list">
      <li
        class="pagination__button"
        :class="{pagination__button_active: page === currentPage}"
        @click="getCurrentRepos (page, reposPerPage, inputText)"
        v-for="page in pages"
        :key="page"
      > {{page}}
      </li>
    </ul>

    <div class="pagination__direction">
    <button
      v-if="lastPageToShow > pagesToShow"
      class="pagination__direction-button"
      @click="loadPreviousPages"
      type="button"
    >Предыдущие страницы</button>

    <button
      v-if="areMorePages"
      type="button"
      class="pagination__direction-button"
      @click="loadNextPages"
    >Следующие страницы</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['totalItems', 'inputText'],

  data() {
    return {
      pagesToShow: 10,
      reposPerPage: 10,
      pagesLimit: 100,
      doWeHavePagination: true,
    };
  },

  computed: {
    pages() {
      const pages = [];
      for (let i = this.startingPageForLoading; i <= this.lastPageToShow; i++) {
        pages.push(i);
      }
      return pages;
    },

    startingPageForLoading() {
      if (this.currentPage <= 10) {
        return 1;
      } else {
        return (
          Math.floor(this.currentPage / this.pagesToShow) * this.pagesToShow + 1
        );
      }
    },

    nextStartingPageForClicking() {
      if (this.currentPage <= 10) {
        return 11;
      } else {
        return (
          Math.ceil(this.currentPage / this.pagesToShow) * this.pagesToShow + 1
        );
      }
    },

    previousStartingPageForClicking() {
      if (this.currentPage < 20) {
        return 1;
      } else {
        return (
          Math.floor(this.currentPage / this.pagesToShow) * this.pagesToShow -
          10 +
          1
        );
      }
    },

    currentPage() {
      return this.$route.query.page ? this.$route.query.page : 1;
    },

    pagesTotalNumber() {
      return Math.floor(this.totalItems / this.pagesToShow);
    },

    lastPageToShow() {
      const lastPageToShow = this.startingPageForLoading + this.pagesToShow - 1;
      if (lastPageToShow > this.totalItems / this.pagesToShow) {
        return this.pagesTotalNumber
          ? this.pagesTotalNumber
          : 1;
      } else {
        return lastPageToShow;
      }
    },

    areMorePages() {
      if (this.pagesTotalNumber === 0) {
        return false;
      } else if (this.pagesTotalNumber > this.pagesLimit) {
        return this.lastPageToShow === this.pagesLimit ? false : true;
      } else {
        return this.lastPageToShow === this.pagesTotalNumber ? false : true;
      }
    },
  },

  methods: {
    getCurrentRepos(page, perPage, inputText) {
      this.$router.push({ path: '/', query: { page: page, search: inputText }});
      this.$store.dispatch('repos/fetchRepos', {
        page: page,
        perPage: perPage,
        inputText: inputText,
      });
    },

    loadNextPages() {
      this.$router.push({
        path: '/',
        query: { page: this.nextStartingPageForClicking },
      });
      this.getCurrentRepos(
        this.nextStartingPageForClicking,
        this.reposPerPage,
        this.inputText
      );
    },

    loadPreviousPages() {
      this.$router.push({
        path: '/',
        query: { page: this.previousStartingPageForClicking },
      });
      this.getCurrentRepos(
        this.previousStartingPageForClicking,
        this.reposPerPage,
        this.inputText
      );
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}

.pagination__list {
  padding: 0;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pagination__button {
  list-style: none;
  padding: 0;
  margin: 0 0 0 20px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  color: #000;
  font-family: inherit;
}

.pagination__button_active {
  background: #e6e2e2;
}

.pagination__direction-button {
  border: none;
  background-color: #fafafa;
  width: 100px;
  height: 40px;
  cursor: pointer;
  font-family: inherit;
}

.pagination__button:hover {
  transition: background-color .3s linear;
  background-color: #e6e2e2;
}

.pagination__direction-button:first-of-type {
  margin-right: 20px ;
}

@media screen and (max-width: 768px) {

.pagination__button {
  margin: 0 10px 10px 0;
}
.pagination__link {
  width: 30px;
  height: 30px;
}

.pagination__direction-button:first-of-type {
  margin-right: 10px;
}

}

@media screen and (max-width: 475px) {

.pagination {
  max-width: 70%;;
}

.pagination__link {
  margin-bottom: 10px;
}

.pagination__direction-button {
  width: 74px;
  font-size: 11px;
}
}
</style>
