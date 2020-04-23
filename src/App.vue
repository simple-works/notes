<template>
  <div id="app">
    <TheNavBar />
    <router-view />
    <TheFooter />
  </div>
</template>

<script>
import TheNavBar from "@/components/Layout/TheNavBar";
import TheFooter from "@/components/Layout/TheFooter";

export default {
  name: "App",
  components: {
    TheNavBar,
    TheFooter
  },
  metaInfo: {
    titleTemplate: titleChunk =>
      titleChunk ? `${titleChunk} - Amb-Notes` : "Amb-Notes",
    description: "Public notes sharing platform",
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  }
};
</script>

<style lang="scss">
@import "./styles";
</style>
