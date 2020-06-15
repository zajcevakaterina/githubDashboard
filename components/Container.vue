<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>

.container {
  width: calc(100% - 120px);
  max-width: 1280px;
  margin: 0 auto;
}
@media screen and (max-width: 1280px) {
  .container {
    width: calc(100% - 100px);
  }
}
@media screen and (max-width: 1024px) {
  .container {
    width: calc(100% - 100px);
  }
}

@media screen and (max-width: 768px) {
  .container {
    width: calc(100% - 80px);
  }
}

@media screen and (max-width: 425px) {
  .container {
    width: calc(100% - 30px);
  }
}

</style>
