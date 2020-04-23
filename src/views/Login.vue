<template>
  <section id="login" class="section">
    <div class="columns is-multiline is-centered">
      <!-- 1st-Column: Login-Form -->
      <div class="column is-6">
        <section class="section has-text-centered">
          <!-- Title -->
          <h1 class="title">Login</h1>

          <!-- Login-Form -->
          <LoginForm :ref-route="refRoute" />
          <br />

          <!-- Register-Notice -->
          <div class="has-text-centered">
            <router-link :to="registerRoute">
              <b-icon icon="user-circle" size="is-small" />
              <span>&nbsp;Register new account</span>
            </router-link>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import LoginForm from "@/components/User/LoginForm";

export default {
  name: "Login",
  components: {
    LoginForm
  },
  metaInfo: {
    title: "Login"
  },
  computed: {
    refRoute() {
      return this.$route.query.ref;
    },
    registerRoute() {
      return {
        name: "Register",
        query: { ref: this.refRoute }
      };
    }
  }
};
</script>
