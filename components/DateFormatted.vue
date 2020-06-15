<template>
<p class="repo-card__update-date" v-html="getDateFormatted(dateToFormat)">
</p>
</template>

<script>
  export default {
    props:['dateToFormat'],

    methods: {
      getDateFormatted(dateToFormat) {
        const month = [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря',
      ];
      const date = new Date(dateToFormat);
      const commitDay = date.getDate();
      const commitMonth = month[date.getMonth()];
      const commitYear = date.getFullYear();
      return `Последний коммит: ${commitDay}&nbsp;${commitMonth}&nbsp;${commitYear}`;
      }
    }

  }
</script>

<style scoped>

</style>
