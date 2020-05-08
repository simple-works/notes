<template>
  <div id="profile-card">
    <div v-if="user" class="box">
      <div class="media">
        <!-- Left-Side: User-Avatar -->
        <div class="media-left">
          <figure class="image is-128x128 is-square">
            <img :src="user.avatar" :alt="user.name" v-src />
          </figure>
        </div>

        <!-- Right-Side: User-Infos -->
        <div class="media-content">
          <!-- User-Name -->
          <h1 class="title">{{ user.name }}</h1>

          <!-- User-Description -->
          <p class="subtitle">{{ user.description }}</p>

          <!-- Notes-Count -->
          <p>
            <b-icon icon="sticky-note" pack="far" size="is-small" />
            &nbsp;<strong>{{ notesCount }}</strong> notes
          </p>

          <!-- User-Creation-Date -->
          <p>
            <b-icon icon="clock" pack="far" size="is-small" />
            Joined
            <strong>
              <DateTime :date="user.createdAt" tooltip-position="is-bottom" />
            </strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileCard",
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({
        name: "name",
        description: "description",
        avatar: require("@/assets/images/avatar.png")
      })
    },
    notesCount: {
      type: Number,
      default: -1
    }
  }
};
</script>
