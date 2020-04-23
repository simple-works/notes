<template>
  <section id="about" class="section">
    <div class="columns is-multiline is-centered">
      <!-- 1st-Column: About-App -->
      <div class="column is-8">
        <article class="box">
          <h1 class="title">Amb-Notes</h1>
          <p class="subtitle">Public notes sharing web application.</p>
          <strong>Version 0.1</strong>
        </article>
      </div>

      <!-- 2nd-Column: App-Repo-Infos -->
      <div class="column is-8">
        <!-- Loading-Spinner -->
        <Spinner v-if="loading" message="LOADING" class="section" />

        <!-- Error-Message -->
        <Notification
          v-if="error"
          :message="error"
          :closable="false"
          title="Error"
          type="is-danger"
          has-icon
        >
          <div>
            <b-button @click="fetchRepo">Retry</b-button>
          </div>
        </Notification>

        <!-- Repo-Infos -->
        <article v-if="repo" class="box">
          <!-- Title -->
          <h1 class="title">Repository</h1>

          <!-- Name/Description -->
          <div class="subtitle">
            <a :href="repo.html_url" target="_blank">
              <b-icon icon="github" pack="fab" size="is-small" />
              <span>&nbsp;{{ repo.full_name }}</span>
            </a>
            <br />
            <strong>{{ repo.description }}</strong>
          </div>

          <!-- Size -->
          <div>
            <b-icon icon="save" pack="far" size="is-small" />
            <strong>&nbsp;{{ repo.size / 1000 }} Mb</strong>
          </div>

          <!-- Created-At -->
          <div>
            <b-icon icon="clock" pack="far" size="is-small" /> Created
            <DateTime :date="repo.created_at" />
          </div>

          <!-- Pushed-At -->
          <div>
            <b-icon icon="clock" pack="far" size="is-small" /> Pushed
            <DateTime :date="repo.pushed_at" />
          </div>

          <!-- Updated-At -->
          <div>
            <b-icon icon="clock" pack="far" size="is-small" />
            <strong>
              Pushed
              <DateTime :date="repo.updated_at" />
            </strong>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "About",
  metaInfo: {
    title: "About"
  },
  async created() {
    await this.fetchRepo();
  },
  data() {
    return {
      repo: null,
      loading: false,
      error: null
    };
  },
  methods: {
    async fetchRepo() {
      try {
        this.error = null;
        this.loading = true;
        const url = "https://api.github.com/repos/ambratolm/amb-notes";
        this.repo = (await this.$http.get(url)).data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
