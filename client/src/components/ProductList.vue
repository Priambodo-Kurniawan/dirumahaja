<template>
  <div class="uk-margin-top">
    <div class="uk-margin-small">
      <b>Suggestion For You</b>
    </div>
    <div style="min-height: 120px" class="uk-flex uk-flex-center uk-flex-middle">
      <div v-if="!isLoading" class="uk-position-relative uk-visible-toggle uk-margin-small-top" tabindex="-1" uk-slider="finite: true">
        <ul class="uk-slider-items uk-grid-small">
          <li class="uk-width-3-5" v-for="product in products" :key="product.id">
            <div class="uk-card uk-card-default">
              <div class="uk-card-media-top">
                <img :src="product.photo[0] ? product.photo[0] : ''" alt="">
              </div>
              <div class="uk-padding-small">
                <b>{{ product.productName }}</b><br>
                <small class="uk-text-muted">{{ product.price }}</small>
              </div>
              <div class="uk-card-footer uk-padding-small">
                <div class="uk-grid-small" uk-height-match uk-grid>
                  <div class="uk-width-auto uk-flex uk-flex-middle">
                    <img class="uk-border-circle" :src="product.addedBy.avatar" :alt="product.addedBy.name" width="40">
                  </div>
                  <div class="uk-width-expand" style="line-height: 1.2em">
                    <small class="uk-text-muted">Added by</small><br>
                    {{product.addedBy.name}}
                  </div>
                </div>
              </div>
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
  computed: {
    products() {
      return this.$store.state.products
    }
  },
  components: {
    Loading
  },
  methods: {
    getProducts() {
      this.isLoading = true
      axios({
        method: 'GET',
        url: 'http://localhost:4000/products'
      })
        .then(({data}) => {
          this.$store.commit('setProducts', data)
        })
        .finally(() => {
          setTimeout(() => {
            this.isLoading = false
          }, 2000)
        })
    }
  },
  created() {
    this.getProducts()
  }
}
</script>
