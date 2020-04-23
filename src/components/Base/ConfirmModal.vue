<template>
  <div id="note-remove-modal">
    <b-modal :active="active" @close="close" has-modal-card trap-focus>
      <div class="modal-card">
        <div class="modal-card-head">
          <div class="modal-card-title">
            {{ title }}
          </div>
        </div>
        <div class="modal-card-body">{{ message }}</div>
        <div class="modal-card-foot">
          <b-button @click="no" :type="noType" expanded>
            <b-icon icon="times-circle" size="is-small" />
            <span>{{ noMessage }}</span>
          </b-button>
          <b-button @click="yes" :type="yesType" expanded>
            <b-icon icon="check-circle" size="is-small" />
            <span>{{ yesMessage }}</span>
          </b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "NoteRemoveModal",
  props: {
    active: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "Message"
    },
    message: {
      type: String,
      default: "Are you sure ?"
    },
    yesMessage: {
      type: String,
      default: "Yes"
    },
    noMessage: {
      type: String,
      default: "No"
    },
    yesType: {
      type: String,
      default: "is-primary"
    },
    noType: {
      type: String,
      default: ""
    }
  },
  methods: {
    yes() {
      this.emitCommonEvents();
      this.$emit("yes");
    },
    no() {
      this.emitCommonEvents();
      this.$emit("no");
    },
    close() {
      this.emitCommonEvents();
      this.$emit("close");
    },
    emitCommonEvents() {
      this.$emit("update:active", false);
      this.$emit("action");
    }
  }
};
</script>
