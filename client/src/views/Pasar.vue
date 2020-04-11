<template>
  <div class="uk-container">
    <div class="uk-card uk-card-default ">
      <Banner image="/assets/location.svg" v-if="selectedPasar" :title="selectedPasar.name" />
      <div class="uk-padding">
        <CategoryList />
        <ContactList />
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '../components/Banner'
import ContactList from '../components/ContactList'
import CategoryList from '../components/CategoryList'

export default {
  name: 'Pasar',
  components: {
    Banner,
    ContactList,
    CategoryList
  },
  computed: {
    selectedPasar() {
      return this.$store.getters.selectedPasar()
    }
  },
  created() {
    if (this.$route.query.id) {
      this.$store.commit('setSelectedPasar', this.$route.query.id)
    }
  }
}
</script>

