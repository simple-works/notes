<template>
  <div id="note-post">
    <article @dblclick="setEditMode(true)" class="media box">
      <!-- Left-Side: User-Avatar -->
      <div class="media-left has-text-centered">
        <router-link :to="profileRoute">
          <figure class="image is-64x64 is-square">
            <img :src="user.avatar" :alt="user.name" v-src />
          </figure>
        </router-link>
      </div>

      <!-- Right-Side: Note-Post -->
      <div class="media-content">
        <!-- Buttons -->
        <div
          v-if="currentUserOwnsNote && !editMode"
          class="buttons is-pulled-right"
        >
          <!-- Menu -->
          <b-dropdown position="is-bottom-left">
            <a slot="trigger" slot-scope="{ active }" size="is-small">
              <b-icon
                :icon="active ? 'circle' : 'ellipsis-h'"
                size="is-small"
              />
            </a>
            <!-- Edit-Button -->
            <b-dropdown-item @click="setEditMode(true)">
              <b-icon icon="edit" size="is-small" />
              Edit
            </b-dropdown-item>
            <!-- Remove-Button -->
            <b-dropdown-item @click="confirmNoteRemoval">
              <b-icon icon="trash-alt" size="is-small" />
              Remove
            </b-dropdown-item>
          </b-dropdown>
        </div>

        <!-- Removal-Confirm-Modal -->
        <ConfirmModal
          :active.sync="removalConfirm"
          :title="note.title"
          @yes="removeNote"
          yes-type="is-danger"
          yes-message="Yes, Delete this note"
          message="This note will be permanently deleted. Are you sure ?"
        />

        <!-- Note-Post -->
        <div class="content">
          <div style="word-break: break-all;">
            <!-- User-Name-->
            <router-link :to="profileRoute">
              <strong>
                {{ user.name }}
              </strong>
            </router-link>
            -

            <!-- Note-Date -->
            <DateTime :date="note.createdAt" />
            <br />

            <!-- Error-Message -->
            <Notification
              v-if="error"
              :message="error"
              title="Error"
              type="is-danger"
              has-icon
            />

            <!-- Note-Form -->
            <div v-if="editMode" style="margin-top: 5px;">
              <NoteForm
                @action="setEditMode(false)"
                @update="setNote"
                :note="innerNote"
                :user="user"
              />
            </div>

            <!-- Note-Body -->
            <div v-else>
              <!-- Note-Title -->
              <strong>{{ innerNote.title }}</strong>
              <br />

              <!-- Note-Content -->
              <span>{{ innerNote.content }}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import NoteComponentMixin from "@/mixins/NoteComponentMixin";
import NoteForm from "./NoteForm";

export default {
  name: "NotePost",
  mixins: [NoteComponentMixin],
  components: {
    NoteForm
  },
  data() {
    return {
      editMode: false,
      removalConfirm: false
    };
  },
  computed: {
    currentUserOwnsNote() {
      return this.currentUser && this.currentUser.id === this.user.id;
    }
  },
  methods: {
    setEditMode(value) {
      if (this.currentUserOwnsNote) {
        this.editMode = value;
      }
    },
    setNote(note) {
      this.innerNote = note;
    },
    confirmNoteRemoval() {
      this.removalConfirm = true;
    },
    async removeNote() {
      try {
        this.error = null;
        this.loading = true;
        const deletedNote = await this.$api("notes").delete(this.innerNote.id);
        this.$emit("delete", deletedNote);
        this.$toast("Note deleted", "is-success");
      } catch (err) {
        console.error(err);
        this.error = "Could not remove note";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
