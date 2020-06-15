<template>
  <div class="stars">
    <p class="stars__count">{{ starsNumber }}</p>
    <div class="stars__img"></div>
  </div>
</template>

<script>
export default {
  props: ['starsNumber'],
};
</script>

<style scoped>
.stars {
  display: flex;
  align-items: center;
}

.stars__count {
  font-size: 14px;
  margin: 0 10px 0 0;
}

.stars__img {
  background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Linecons_big-star.svg/768px-Linecons_big-star.svg.png);
  width: 15px;
  height: 15px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

@media screen and (max-width: 768px) {
  .stars__count {
    font-size: 12px;
  }

  .stars__img {
    width: 12px;
    height: 12px;
  }
}
</style>
