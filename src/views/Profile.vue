<template>
  <section id="profile" class="section">
    <div class="columns is-multiline is-centered">
      <div class="column is-8">
        <!-- Loading-Spinner -->
        <Spinner v-if="loading" message="LOADING USER" class="section" />

        <!-- Error-Message -->
        <Notification
          v-if="error"
          :message="error"
          :closable="false"
          title="Error"
          type="is-danger"
          has-icon
        >
          <div>
            <b-button @click="fetchUser">Retry</b-button>
          </div>
        </Notification>

        <!-- User-Profile -->
        <div v-if="user" style="margin-bottom:20px;">
          <ProfileCard :user="user" :notes-count="notesCount" />
        </div>

        <!-- Note-Post-Create -->
        <NotePostCreate
          v-if="currentUserOwnsProfile"
          :user="currentUser"
          @create="addNote"
          style="margin-bottom:20px;"
        />

        <!-- Notes-Feed -->
        <NotePost
          v-for="note in notes"
          :key="note.id"
          :note="note"
          :user="user"
          @delete="removeNote"
          style="margin-bottom:10px;"
        />

        <!-- Infinite-Scroll -->
        <InfiniteScroll
          v-if="user"
          @infinite="fetchNotes"
          :identifier="identifier"
          :distance="0"
          loading="LOADING NOTES"
          error="Could not load user's notes"
          no-more="END"
          no-results="No notes"
          style="margin-top:20px;"
        />
      </div>
    </div>
  </section>
</template>

<script>
import NotesViewMixin from "@/mixins/NotesViewMixin";
import ProfileCard from "@/components/User/ProfileCard";
import NotePost from "@/components/Note/NotePost";
import NotePostCreate from "@/components/Note/NotePostCreate";

export default {
  name: "Profile",
  metaInfo: {
    title: "Profile"
  },
  mixins: [NotesViewMixin],
  components: {
    ProfileCard,
    NotePost,
    NotePostCreate
  },
  async created() {
    await this.fetchUser();
  },
  data() {
    return {
      user: null,
      notesCount: 0,
      loading: false,
      error: null,
      identifier: Date.now()
    };
  },
  computed: {
    userName() {
      return this.$route.params.userName;
    },
    currentUserOwnsProfile() {
      return (
        this.currentUser && this.user && this.currentUser.id === this.user.id
      );
    }
  },
  watch: {
    async userName() {
      await this.init();
    }
  },
  methods: {
    async init() {
      this.page = 1;
      this.notes = [];
      await this.fetchUser();
      this.identifier = Date.now();
    },
    async fetchUser() {
      try {
        this.error = null;
        this.loading = true;
        this.user = await this.$api("users").read({
          name: this.userName,
          $embed: "notes",
          $one: true,
          $nocase: true
        });
        this.notesCount = await this.$api("notes").read({
          userId: this.user.id,
          $count: true
        });
      } catch (err) {
        if (err.response && err.response.status == 404) {
          this.error =
            "Account with this user name doesn't exist or was deleted";
        } else {
          this.error = "Could not load user's profile";
        }
      } finally {
        this.loading = false;
      }
    },
    async fetchNotes(dataState) {
      try {
        if (!this.user) {
          dataState.error();
          await this.fetchUser();
        }
        if (this.user) {
          const notes = await this.getNotes({ userId: this.user.id });
          if (notes.length) {
            this.page++;
            this.notes.push(...notes);
            dataState.loaded();
          } else {
            dataState.complete();
          }
        }
      } catch (err) {
        dataState.error();
      }
    }
  }
};
</script>
