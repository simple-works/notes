<template>
  <div id="note-form">
    <ValidationObserver ref="observer" v-slot="{ passes, changed, invalid }">
      <fieldset @keyup.enter="passes(save)" @keyup.esc="cancel">
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

        <!-- Note-Title -->
        <div class="field">
          <ValidationInput
            v-model="innerNote.title"
            :disabled="loading"
            name="Title"
            rules="required|min:3|max:30"
            type="text"
            placeholder="Title"
            autofocus
          />
        </div>

        <!-- Note-Content -->
        <div class="field">
          <ValidationInput
            v-model="innerNote.content"
            :disabled="loading"
            name="Content"
            rules="required|min:10|max:1000"
            maxlength="1000"
            type="textarea"
            placeholder="Content"
          />
        </div>
      </fieldset>

      <!-- Buttons -->
      <div class="field">
        <div class="buttons is-right">
          <!-- Cancel-Button -->
          <b-button @click="cancel()" type="is-primary">
            Cancel
          </b-button>

          <!-- Reset-Button -->
          <!-- <b-button @click="reset()" type="is-primary">
            Reset
          </b-button> -->

          <!-- Save-Button -->
          <b-button
            @click="passes(save)"
            :loading="loading"
            :disabled="invalid || !changed"
            type="is-info"
          >
            <b-icon icon="sticky-note" size="is-small" />
            <span>Save</span>
          </b-button>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import NoteComponentMixin from "@/mixins/NoteComponentMixin";

export default {
  name: "NoteForm",
  mixins: [NoteComponentMixin],
  props: {
    updateMode: {
      type: Boolean,
      default: true
    }
  },
  created() {
    if (!this.updateMode) {
      this.innerNote.title = this.innerNote.content = null;
    }
  },
  methods: {
    async save() {
      try {
        this.error = null;
        this.loading = true;
        if (this.updateMode) {
          await this.updateNote();
        } else {
          await this.createNote();
        }
        this.$emit("action");
      } catch (err) {
        console.error(err);
        this.error = "Could not save note";
      } finally {
        this.loading = false;
      }
    },
    async updateNote() {
      const updatedNote = await this.$api("notes").update(this.innerNote.id, {
        title: this.innerNote.title,
        content: this.innerNote.content
      });
      this.$toast("Note updated", "is-success");
      this.$emit("update", updatedNote);
      this.$emit("save", updatedNote);
    },
    async createNote() {
      const createdNote = await this.$api("notes").create({
        userId: this.user.id,
        title: this.innerNote.title,
        content: this.innerNote.content
      });
      this.$toast("Note created", "is-success");
      this.$emit("create", createdNote);
      this.$emit("save", createdNote);
    },
    cancel() {
      if (this.updateMode) {
        this.innerNote = { ...this.note };
      }
      this.$emit("action");
      this.$emit("cancel", this.innerNote);
    }
    // ,reset() {
    //   this.$emit("action");
    //   this.$emit("reset");
    //   for (const prop in this.note) {
    //     this.note[prop] = "";
    //   }
    //   this.error = null;
    //   requestAnimationFrame(() => {
    //     if (this.$refs.observer) {
    //       this.$refs.observer.reset();
    //     }
    //   });
    // }
  }
};
</script>
