<template>
  <footer class="footer">
    <container class="footer__container">
      <p class="footer__copyright">&copy; Екатерина Зайцева</p>
      <a class="footer__link" href="https://github.com/zajcevakaterina">https://github.com/zajcevakaterina</a>
    </container>
  </footer>
</template>

<script>
import Container from '@/components/Container';
export default {
  components: {
    container: Container,
  },
};
</script>

<style scoped>
.footer {
  padding: 20px 0;
}

.footer__copyright {
  font-size: 16px;
  font-weight: 900;
  margin: 0 0 10px;
}

.footer__link {
  color: #000;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.2s linear;
}

.footer__link:hover {
  opacity: 0.8s;
}
</style>
