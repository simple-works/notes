<template>
  <div id="note-post">
    <article @dblclick="setPostForm(!postForm)" class="media box">
      <!-- Left-Side: User-Avatar -->
      <div class="media-left has-text-centered">
        <router-link :to="profileRoute">
          <figure class="image is-64x64 is-square">
            <img :src="user.avatar" :alt="user.name" v-src />
          </figure>
        </router-link>
      </div>

      <!-- Right-Side: Note-Post -->
      <div class="media-content">
        <!-- Note-Post -->
        <div class="content">
          <div style="word-break: break-all;">
            <!-- User-Name-->
            <router-link :to="profileRoute">
              <strong>
                {{ user.name }}
              </strong>
            </router-link>
            -

            <!-- Note-Date -->
            <DateTime :date="Date.now()" />
            <br />

            <!-- Error-Message -->
            <Notification
              v-if="error"
              :message="error"
              title="Error"
              type="is-danger"
              has-icon
            />

            <!-- Note-Form -->
            <div v-if="postForm" style="margin-top: 5px;">
              <NoteForm
                v-on="$listeners"
                @action="setPostForm(false)"
                :update-mode="false"
                :user="user"
              />
            </div>

            <!-- Post-Button -->
            <div v-else style="margin-top: 10px;">
              <b-button @click="setPostForm(true)" type="is-primary" expanded>
                <b-icon icon="pen" size="is-small" />
                <span>Write a new note</span>
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import NoteComponentMixin from "@/mixins/NoteComponentMixin";
import NoteForm from "./NoteForm";

export default {
  name: "NotePost",
  mixins: [NoteComponentMixin],
  components: {
    NoteForm
  },
  data() {
    return {
      postForm: false
    };
  },
  methods: {
    setPostForm(value) {
      this.postForm = value;
    }
  }
};
</script>
