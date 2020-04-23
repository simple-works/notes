<template>
  <span id="date">
    <b-tooltip
      :label="date | moment('MMMM Do YYYY, h:mm:ss a')"
      :animated="true"
      :square="true"
      :position="tooltipPosition"
      type="is-dark"
    >
      <small>
        {{ date | moment("from", "now") }}
      </small>
    </b-tooltip>
  </span>
</template>

<script>
export default {
  name: "Date",
  props: {
    date: {
      type: [Date, String, Number],
      default: () => new Date()
    },
    tooltipPosition: {
      type: String,
      default: "is-top"
    }
  }
};
</script>
