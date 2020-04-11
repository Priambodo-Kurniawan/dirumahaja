<template>
  <div class="uk-container">
    <div class="uk-margin-large-top uk-card uk-card-default ">
      <Banner />
      <div class="uk-padding">
        <ContactList />
        <NewsList />
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner'
import ContactList from '../components/ContactList'
import NewsList from '../components/NewsList'
export default {
  components: {
    Banner,
    ContactList,
    NewsList
  },
  created () {
    this.$store.commit('setQuery', '')
  }
}
</script>

