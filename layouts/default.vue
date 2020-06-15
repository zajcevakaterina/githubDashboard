<template>
<div class="root">
  <page-header/>
  <container>
    <nuxt />
  </container>
  <page-footer/>
</div>

</template>

<script>
import Container from '@/components/Container';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  components: {
    container: Container,
    'page-header': Header,
    'page-footer': Footer
  }
}

</script>
<style>
body {
  margin: 0;
}

.root {
  font-size: 16px;
  font-family: 'Inter', Arial, sans-serif;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  margin: 0 auto;
}

</style>
