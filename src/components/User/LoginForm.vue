<template>
  <div id="login-form">
    <ValidationObserver ref="observer" v-slot="{ passes, changed, invalid }">
      <!-- Access-Denied-Message -->
      <Notification
        v-if="refRoute"
        :message="`Access denied to page : ${refRoute}`"
        :closable="false"
        icon="lock"
        title="Authentication Required"
        type="is-warning"
        class="field"
        has-icon
      />

      <!-- Error-Message -->
      <Notification
        v-if="error"
        :message="error"
        title="Error"
        type="is-danger"
        class="field"
        has-icon
      />

      <!-- Fields -->
      <fieldset @keyup.enter="passes(login)">
        <!-- Email-Field -->
        <div class="field">
          <ValidationInput
            v-model="user.email"
            :disabled="loading"
            name="Email"
            rules="required|email"
            type="text"
            placeholder="Email"
            icon="envelope"
          />
        </div>

        <!-- Password-Field -->
        <div class="field">
          <ValidationInput
            v-model="user.password"
            :disabled="loading"
            name="Password"
            rules="required|min:8|max:80"
            type="password"
            placeholder="Password"
            icon="key"
            password-reveal
          />
        </div>
      </fieldset>

      <!-- Buttons -->
      <div class="field has-addons">
        <!-- Login-Button -->
        <div class="control is-expanded">
          <b-button
            @click="passes(login)"
            :loading="loading"
            :disabled="invalid || !changed"
            type="is-primary"
            expanded
          >
            <b-icon icon="sign-in-alt" size="is-small" />
            <span>&nbsp;Sign In</span>
          </b-button>
        </div>
        <!-- Reset-Button -->
        <div class="control">
          <b-button
            @click="reset"
            :disabled="loading || !changed"
            type="is-primary"
            title="Reset fields"
          >
            <b-icon icon="undo" />
          </b-button>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  props: {
    refRoute: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      loading: false,
      error: null
    };
  },
  methods: {
    async login() {
      try {
        this.error = null;
        this.loading = true;
        await this.$store.dispatch("login", {
          email: this.user.email,
          password: this.user.password
        });
        this.$toast("Logged in", "is-success");
        this.$router
          .replace({ name: this.refRoute || "Home" })
          .catch(() => null);
      } catch (err) {
        this.error = this.$api.error(err).message || "Could not login";
      } finally {
        this.loading = false;
      }
    },
    reset() {
      for (const prop in this.user) {
        this.user[prop] = "";
      }
      this.error = "";
      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });
    }
  }
};
</script>
