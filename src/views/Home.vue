<template>
  <section id="home" class="section">
    <div class="columns is-multiline is-centered">
      <div class="column is-8">
        <!-- Note-Post-Create -->
        <NotePostCreate
          v-if="currentUser"
          :user="currentUser"
          @create="addNote"
          style="margin-bottom:20px;"
        />

        <!-- Notes-Feed -->
        <NotePost
          v-for="note in notes"
          :key="note.id"
          :note="note"
          :user="note.user"
          @delete="removeNote"
          style="margin-bottom:20px;"
        />

        <!-- Infinite-Scroll -->
        <InfiniteScroll
          @infinite="fetchNotes"
          :distance="0"
          loading="LOADING NOTES"
          error="Could not load notes"
          no-more="END"
          no-results="No notes"
        />
      </div>
    </div>
  </section>
</template>

<script>
import NotesViewMixin from "@/mixins/NotesViewMixin";
import NotePost from "@/components/Note/NotePost";
import NotePostCreate from "@/components/Note/NotePostCreate";

export default {
  name: "Home",
  mixins: [NotesViewMixin],
  components: {
    NotePost,
    NotePostCreate
  },
  methods: {
    async fetchNotes(dataState) {
      try {
        const notes = await this.getNotes();
        if (notes.length) {
          this.page++;
          this.notes.push(...notes);
          dataState.loaded();
        } else {
          dataState.complete();
        }
      } catch (err) {
        dataState.error();
      }
    }
  }
};
</script>
