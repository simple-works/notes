<template>
  <div id="the-nav-bar">
    <b-navbar>
      <!-- Brand -->
      <template slot="brand">
        <b-navbar-item tag="router-link" to="/">
          <img
            @click="animateLogo"
            ref="logo"
            src="@/assets/images/logo.png"
            alt="Amb-Notes"
          />
        </b-navbar-item>
      </template>

      <!-- Start -->
      <template slot="start">
        <!-- Home -->
        <b-navbar-item :to="{ name: 'Home' }" tag="router-link">
          <span>Home</span>
        </b-navbar-item>
        <!-- About -->
        <b-navbar-item :to="{ name: 'About' }" tag="router-link">
          <span>About</span>
        </b-navbar-item>
      </template>

      <!-- End -->
      <template slot="end">
        <!-- Authentication-Buttons -->
        <b-navbar-item v-if="!currentUser">
          <!-- Register -->
          <div class="buttons">
            <b-button
              :to="{ name: 'Register' }"
              tag="router-link"
              type="is-primary"
            >
              <b-icon icon="user-circle" size="is-small" />
              <strong>Register</strong>
            </b-button>
            <!-- Login -->
            <b-button :to="{ name: 'Login' }" tag="router-link">
              <b-icon icon="sign-in-alt" size="is-small" />
              <span>Login</span>
            </b-button>
          </div>
        </b-navbar-item>

        <!-- User-Account-Buttons -->
        <div v-if="currentUser" class="buttons">
          <b-dropdown position="is-bottom-left">
            <!-- Avatar/Name-Menu-Trigger-Link -->
            <a class="navbar-item" slot="trigger" slot-scope="{ active }">
              <div class="level is-mobile">
                <div class="level-left">
                  <!-- Avatar -->
                  <figure style="margin-right: 10px;">
                    <img
                      :src="currentUser.avatar"
                      :alt="currentUser.name"
                      style="border-radius: 50%"
                      v-src
                    />
                  </figure>

                  <!-- Name -->
                  <strong>{{ currentUser.name }}</strong>
                  <b-icon
                    :icon="active ? 'caret-up' : 'caret-down'"
                    size="is-small"
                  />
                </div>
              </div>
            </a>

            <!-- Profile-Link -->
            <b-dropdown-item has-link>
              <router-link :to="profileRoute">
                <b-icon icon="user" size="is-small" />
                <span> Profile</span>
              </router-link>
            </b-dropdown-item>

            <!-- Settings-Link -->
            <b-dropdown-item has-link>
              <router-link :to="{ name: 'Settings' }">
                <b-icon icon="cog" size="is-small" />
                <span> Settings</span>
              </router-link>
            </b-dropdown-item>

            <!-- Divider -->
            <hr class="dropdown-divider" />

            <!-- Logout-Link -->
            <b-dropdown-item @click="logout">
              <b-icon icon="sign-out-alt" size="is-small" />
              <span> Log out</span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "TheNavBar",
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    profileRoute() {
      return {
        name: "Profile",
        params: { userName: this.currentUser.name }
      };
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$toast("Logged out", "is-success");
      this.$router.replace({ name: "Login" }).catch(() => null);
    },
    animateLogo() {
      this.$animate(this.$refs.logo, "bounce");
    }
  }
};
</script>
