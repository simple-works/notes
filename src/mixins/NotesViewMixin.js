import { findIndex } from "lodash";

export default {
  data() {
    return {
      notes: [],
      limit: 5,
      page: 1
    };
  },
  methods: {
    async getNotes(query = {}) {
      return await this.$api("notes").read({
        $expand: "users",
        $limit: this.limit,
        $page: this.page,
        ...query
      });
    },
    addNote(note) {
      note.user = this.currentUser;
      this.notes.unshift(note);
    },
    modifyNote(note) {
      const index = findIndex(this.notes, { id: note.id });
      if (index >= 0) {
        note.user = this.currentUser;
        this.$set(this.notes, index, note);
      }
    },
    removeNote(note) {
      const index = findIndex(this.notes, { id: note.id });
      if (index >= 0) {
        this.notes.splice(index, 1);
      }
    }
  }
};
