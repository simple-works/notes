<template>
  <div id="infinite-scroll">
    <infinite-loading v-bind="$attrs" v-on="$listeners">
      <div slot="spinner">
        <div style="padding: 20px;">
          <Spinner :message="loading" />
        </div>
      </div>
      <div slot="no-more" class="has-text-grey-light">
        <hr />
        {{ noMore }}
      </div>
      <div slot="no-results" class="notification is-light">
        {{ noResults }}
      </div>
      <div slot="error" slot-scope="{ trigger }">
        <b-icon icon="exclamation-circle" type="is-danger" size="is-large" />
        <p class="has-text-danger has-text-weight-bold">&nbsp;{{ error }}</p>
        <br />
        <b-button @click="trigger" type="is-primary" size="is-small">
          <b-icon icon="sync" size="is-small" />
          <span>Try again</span>
        </b-button>
      </div>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "InfiniteScroll",
  components: {
    InfiniteLoading
  },
  props: {
    noMore: {
      type: String,
      default: "No more results"
    },
    noResults: {
      type: String,
      default: "No results"
    },
    loading: {
      type: String,
      default: "LOADING"
    },
    error: {
      type: String,
      default: "An error has occurred"
    }
  }
};
</script>
