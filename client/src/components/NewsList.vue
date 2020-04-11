<template>
  <div class="uk-margin-top">
    <div class="uk-margin-small">
      <b>Berita Terkait</b>
    </div>
    <div style="min-height: 120px" class="uk-flex uk-flex-center uk-flex-middle">
      <div v-if="!isLoading" class="uk-position-relative uk-visible-toggle uk-margin-small-top" tabindex="-1" uk-slider="finite: true">
        <ul class="uk-slider-items uk-grid-small">
          <li class="uk-width-3-5" v-for="news in listNews" :key="news.id">
            <div class="uk-card uk-card-default">
              <div class="uk-card-media-top">
                <img :src="news.urlToImage" :alt="news.title">
              </div>
              <div class="uk-padding-small">
                <b>{{ news.title }}</b><br>
                <small class="uk-text-muted">{{ news.source.name }}</small>
              </div>
              <div class="uk-card-footer uk-padding-small">
                <div class="uk-grid-small" uk-height-match uk-grid>
                  <div class="uk-width-expand" style="line-height: 1.2em">
                    <small class="uk-text-muted">Published at<br>
                      {{ formatDate(news.publishedAt) }}
                    </small>
                  </div>
                  <div class="uk-width-auto">
                    <a :href="news.url" target="_blank">
                      <button class="uk-button uk-button-small uk-button-primary">Baca</button>
                    </a>
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
import moment from 'moment'
import Loading from '../components/Loading'
export default {
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    listNews() {
      return this.$store.state.news
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
        url: 'http://localhost:4000/news'
      })
        .then(({data}) => {
          this.$store.commit('setNews', data.data.articles)
        })
        .finally(() => {
          setTimeout(() => {
            this.isLoading = false
          }, 2000)
        })
    },
    formatDate(date) {
      return moment(date).format('LL')
    }
  },
  created() {
    this.getProducts()
  }
}
</script>
