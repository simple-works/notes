<template>
  <div id="spinner">
    <div class="has-text-centered has-text-primary animated infinite pulse">
      <div style="margin-bottom: 10px">
        <b-icon
          icon="spinner"
          size="is-large"
          type="is-primary"
          custom-class="fa-pulse"
        />
      </div>
      <div v-if="message">
        <span class="is-size-5 has-text-weight-bold">{{ message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Spinner",
  props: {
    message: {
      type: String,
      default: ""
    }
  }
};
</script>
