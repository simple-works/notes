<template>
  <div id="notification">
    <b-notification v-bind="$attrs" v-on="$listeners">
      <h1 class="title">{{ title }}</h1>
      <p class="subtitle">{{ message }}</p>
      <slot></slot>
    </b-notification>
  </div>
</template>

<script>
export default {
  name: "notification",
  props: {
    title: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      default: ""
    }
  }
};
</script>
