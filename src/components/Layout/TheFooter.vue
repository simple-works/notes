<template>
  <div id="the-footer">
    <footer class="footer has-text-centered">
      <section>
        <!-- Links -->
        <p>
          <strong>
            <router-link :to="{ name: 'About' }">
              Amb-Notes
            </router-link>
          </strong>
          by
          <strong>Ambratolm</strong>
        </p>

        <!-- Copyright -->
        <p>
          &copy;
          <strong>
            <a href="https://ambratolm.ml" target="_blank">
              Ambratolm
            </a>
          </strong>
          {{ new Date().getFullYear() }}
        </p>
      </section>
      <br />
    </footer>
  </div>
</template>

<script>
export default {
  name: "TheFooter"
};
</script>
