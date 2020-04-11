<template>
  <div class="uk-background-secondary">
    <div class="uk-grid uk-grid-match uk-padding-small">
      <div class="uk-width-1-2 uk-flex uk-flex-center uk-flex-middle">
        <h3 class="uk-margin-small-left" v-if="!title">
          <b>Belanja?</b> <br>
          Dari Rumah Aja
        </h3>
        <h1 class="uk-margin-small-left uk-text-uppercase" style="color: white;" v-else>
          <b>{{ title }}</b> 
        </h1>
      </div>
      <div class="uk-width-1-2 uk-margin-small-bottom">
        <img :src="image" alt="food" v-if="image">
        <img src="@/assets/food-online.svg" alt="food" v-else>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['image', 'title']
}
</script>