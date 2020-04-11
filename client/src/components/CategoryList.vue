<template>
  <div>
    <b>Tipe Produk yang dicari</b>
    <div style="min-height: 120px" class="uk-flex uk-flex-center uk-flex-middle">
      <div v-if="!isLoading" class="uk-position-relative uk-visible-toggle uk-margin-remove-top" tabindex="-1" uk-slider="finite: true">
        <ul class="uk-slider-items uk-child-width-1-5@s uk-text-center">
          <li v-for="(category, index) in categories" :key="index">
            <div style="padding: 10px">
              <div 
                class="uk-box-shadow-small uk-border-circle uk-padding-small" 
                :class="category.value == $store.state.query ? 'active-cat' :''" 
                @click="setQuery(category.value)"
                style="cursor: pointer">
                <img :src="category.icon" :alt="category.name">
              </div>
              <small class="uk-text-muted small-title">{{ category.name }}</small>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <Loading />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Loading from '../components/Loading'
export default {
  data() {
    return {
      isLoading: false
    }
  },
  components: {
    Loading
  },
  computed: {
    categories() {
      return this.$store.state.categories
    }
  },
  methods: {
    getCategories() {
      this.isLoading = true
      axios({
        method: 'GET',
        url: 'https://safe-waters-38064.herokuapp.com/categories'
      })
        .then(({data}) => {
          this.$store.commit('setCategories', data.data)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    setQuery(value) {
      this.$store.commit('setQuery', value)
    }
  },
  created() {
    this.getCategories()
  }
}
</script>

<style>
.small-title {
  line-height: 17px;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 17px;
}
.active-cat {
  border: 3px solid #41bdc9;
}
</style>