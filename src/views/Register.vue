<template>
  <section id="login" class="section">
    <div class="columns is-multiline is-centered">
      <!-- 1st-Column: Register-Form -->
      <div class="column is-6">
        <section class="section has-text-centered">
          <!-- Title -->
          <h1 class="title">Register</h1>

          <!-- Register-Form -->
          <RegisterForm :ref-route="refRoute" />
          <br />

          <!-- Login-Notice -->
          <router-link :to="loginRoute">
            <b-icon icon="user-circle" size="is-small" />
            <span>&nbsp;Log in to existing account</span>
          </router-link>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import RegisterForm from "@/components/User/RegisterForm";

export default {
  name: "Register",
  components: {
    RegisterForm
  },
  metaInfo: {
    title: "Register"
  },
  computed: {
    refRoute() {
      return this.$route.query.ref;
    },
    loginRoute() {
      return {
        name: "Login",
        query: { ref: this.refRoute }
      };
    }
  }
};
</script>
