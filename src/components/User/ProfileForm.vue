<template>
  <div id="profile-form">
    <ValidationObserver ref="observer" v-slot="{ passes, changed, invalid }">
      <!-- Fields -->
      <fieldset :disabled="loading">
        <!-- Profile-Card -->
        <div class="field">
          <ProfileCard :user="{ ...user }" :notes-count="notesCount" />
        </div>

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

        <!-- Avatar -->
        <div class="field">
          <ValidationInput
            v-model="user.avatar"
            name="Avatar"
            label="Avatar"
            type="text"
            placeholder="Avatar"
            icon="image"
          />
        </div>

        <!-- Name -->
        <div class="field">
          <ValidationInput
            v-model="user.name"
            name="Name"
            label="Name"
            rules="required|min:3|max:30"
            type="text"
            placeholder="Name"
            icon="user"
          />
        </div>

        <!-- Description -->
        <div class="field">
          <ValidationInput
            v-model="user.description"
            name="Description"
            label="Description"
            rules="max:100"
            maxlength="100"
            type="textarea"
            placeholder="Content"
          />
        </div>
      </fieldset>

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
import ProfileCard from "./ProfileCard";

export default {
  name: "ProfileForm",
  components: {
    ProfileCard
  },
  props: {
    user: {
      type: Object,
      default: () => ({
        id: undefined,
        name: "",
        description: "",
        avatar: ""
      })
    }
  },
  async created() {
    await this.fetchNotesCount();
  },
  data() {
    return {
      notesCount: 0,
      loading: false,
      error: null,
      success: null
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
    async fetchNotesCount() {
      this.notesCount = await this.$api("notes").read({
        userId: this.currentUser.id,
        $count: true
      });
    },
    async save() {
      try {
        this.success = null;
        this.error = null;
        this.loading = true;
        const updatedUser = await this.$api("users").update(
          this.currentUser.id,
          {
            name: this.user.name,
            description: this.user.description,
            avatar: this.user.avatar
          }
        );
        this.setCurrentUser(updatedUser);
        this.reset();
        this.success = "Changes saved";
      } catch (err) {
        this.error = "Could not save changes";
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
