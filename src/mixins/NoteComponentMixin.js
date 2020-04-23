export default {
  created() {
    this.innerNote = { ...this.note };
  },
  data() {
    return {
      innerNote: null,
      loading: false,
      error: null
    };
  },
  props: {
    note: {
      type: Object,
      default: () => ({
        userId: undefined,
        title: "title",
        content: "content"
      })
    },
    user: {
      type: Object,
      required: true,
      default: () => ({
        id: undefined,
        name: "name",
        avatar: require("@/assets/images/avatar.png")
      })
    }
  },
  computed: {
    profileRoute() {
      return {
        name: "Profile",
        params: { userName: this.user.name }
      };
    }
  }
};
