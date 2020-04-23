<template>
  <section id="not-found" class="section">
    <div class="columns is-multiline is-centered">
      <div class="column is-8 section">
        <Notification
          :message="`No such a page as : ${$route.path}`"
          :closable="false"
          title="Page Not Found"
          type="is-warning"
          has-icon
        >
          <router-link :to="{ name: 'Home' }">
            Return to home page
          </router-link>
        </Notification>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "NotFound",
  metaInfo: {
    title: "Not Found"
  }
};
</script>
