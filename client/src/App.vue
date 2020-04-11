<template>
  <div id="app">
    <Navbar />
    <div class="uk-background-muted uk-height-viewport" style="padding-top: 70px;">
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default {
  components: {
    Navbar,
    Footer
  }
};
</script>

<style>
* {
  font-family: 'Cabin', sans-serif;
}
.uk-container, .uk-modal-dialog {
  max-width: 480px !important;
}
.uk-card, .uk-modal-dialog {
  border-radius: 4px;
  overflow: hidden;
}
.uk-background-primary, .uk-button-primary {
  background-color: #41bdc9;
}
.uk-background-secondary, .uk-button-secondary {
  background-color: #f7ce4e;
}
.uk-slider-container {
  margin-left: -15px;
  margin-right: -15px;
}
.uk-card-media-top {
  max-height: 140px;
  overflow: hidden;
}
.uk-slider-items {
  padding-bottom: 20px !important;
}
.uk-button {
  border-radius: 20px;
}
</style>
