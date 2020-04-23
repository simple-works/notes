<template>
  <div id="account-form">
    <ValidationObserver ref="observer" v-slot="{ passes, changed, invalid }">
      <!-- Success-Message -->
      <div class="field">
        <Notification
          v-if="success"
          :message="success"
          title="Success"
          type="is-success"
          class="field"
          has-icon
        />
      </div>

      <!-- Error-Message -->
      <div class="field">
        <Notification
          v-if="error"
          :message="error"
          title="Error"
          type="is-danger"
          class="field"
          has-icon
        />
      </div>

      <!-- Email -->
      <div class="field">
        <ValidationInput
          v-model="user.email"
          :disabled="loading"
          name="Email"
          label="Email"
          rules="required|email"
          type="email"
          placeholder="Email"
          icon="envelope"
        />
      </div>

      <!-- Change-Password-Checkbox -->
      <div class="field">
        <b-checkbox v-model="changePassword">
          Change Password
        </b-checkbox>
      </div>

      <!-- Change-Password-Form -->
      <div v-if="changePassword" class="field">
        <div class="field">
          <!-- Current-Password -->
          <ValidationInput
            v-model="user.password"
            :disabled="loading"
            name="Current Password"
            label="Current Password"
            rules="required|min:8|max:80"
            vid="password"
            type="password"
            placeholder="Current Password"
            icon="key"
            password-reveal
          />
        </div>

        <!-- New-Password -->
        <div class="field">
          <ValidationInput
            v-model="user.newPassword"
            :disabled="loading"
            name="New Password"
            label="New Password"
            rules="required|min:8|max:80"
            vid="newPassword"
            type="password"
            placeholder="New Password"
            icon="key"
            password-reveal
          />
        </div>

        <!-- New-Password-Confirmation -->
        <div class="field">
          <ValidationInput
            v-model="user.newPassword2"
            :disabled="loading"
            name="New Password Confirmation"
            label="New Password Confirmation"
            rules="required|confirmed:newPassword"
            type="password"
            placeholder="New Password Confirmation"
            icon="key"
            password-reveal
          />
        </div>
      </div>

      <!-- Buttons -->
      <div class="field">
        <div class="control buttons is-right">
          <!-- Save-Button -->
          <b-button
            @click="passes(save)"
            :loading="loading"
            :disabled="invalid || !changed"
            type="is-info"
          >
            <b-icon icon="check" size="is-small" />
            <span>Save</span>
          </b-button>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: "AccountForm",
  props: {
    user: {
      type: Object,
      default: () => ({
        email: "",
        password: "",
        newPassword: "",
        newPassword2: ""
      })
    }
  },
  data() {
    return {
      loading: false,
      error: null,
      success: null,
      changePassword: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },
  methods: {
    setCurrentUser(user) {
      return this.$store.commit("setCurrentUser", user);
    },
    async save() {
      try {
        this.success = null;
        this.error = null;
        this.loading = true;
        const updateUser = async user => {
          const updatedUser = await this.$api("users").update(
            this.currentUser.id,
            user
          );
          this.setCurrentUser(updatedUser);
          this.reset();
          this.success = "Changes saved";
        };
        if (this.user.password) {
          const userExists = await this.$api("login")
            .create({
              email: this.currentUser.email,
              password: this.user.password
            })
            .then(
              () => true,
              () => false
            );
          if (userExists) {
            await updateUser({
              email: this.user.email,
              password: this.user.password
            });
          } else {
            this.error = "Wrong current password";
          }
        } else {
          await updateUser({
            email: this.user.email
          });
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status == 400) {
            this.error = "Invalid fields";
          }
          if (err.response.status == 409) {
            this.error = "Email already exists";
          }
        } else {
          console.log(err);
          this.error = "Could not save changes";
        }
      } finally {
        this.loading = false;
      }
    },
    reset() {
      requestAnimationFrame(() => {
        if (this.$refs.observer) {
          this.$refs.observer.reset();
        }
      });
    }
  }
};
</script>
