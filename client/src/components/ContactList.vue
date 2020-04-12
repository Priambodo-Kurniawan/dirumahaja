<template>
  <div class="uk-margin-medium">
    <div style="line-height: 18px" uk-height-match uk-grid>
      <div class="uk-width-expand">
        <b class="uk-text-capitalize">Pedagang {{$store.state.query ? `[ ${$store.state.query} ]` : ''}} Pasar Jaya</b> <br>
        <small class="uk-text-muted">Data dari <a href="http://belanja.pasarjaya.co.id/">Pasar Jaya</a></small>
      </div>
      <div class="uk-width-auto uk-text-right uk-flex uk-flex-middle">
        <div v-if="false">
          <small class="uk-margin-small-right">{{selectedPasar.name}}</small> <i class="fas fa-angle-down"></i>
        </div>
        <div uk-form-custom="target: > * > span:first-child">
          <select class="uk-form-blank" v-model="idPasar">
            <option disabled>Please select...</option>
            <option v-for="(data, index) in pasar" :key="index" :value="data.id">{{ data.name }}</option>
          </select>
          <button class="uk-button uk-button-small uk-button-text" type="button" tabindex="-1">
            <span></span>
            <i class="fas fa-angle-down uk-margin-small-left"></i>
          </button>
        </div>
      </div>
    </div>
    <div style="min-height: 120px" class="uk-flex uk-flex-center uk-flex-middle">
      <div v-if="!isLoading" class="uk-width-1-1">
        <div v-if="!contacts.length">
          <NoData />
        </div>
        <template v-else>
          <div v-for="(contact, index) in contacts" :key="index" class="uk-grid-small uk-margin-top" uk-height-match uk-grid>
            <div class="uk-width-auto uk-text-center">
              <div :class="index%2 == 0 ? 'uk-background-primary' : 'uk-background-secondary'" class="uk-border-circle uk-flex uk-flex-center uk-flex-middle" style="width: 70px; height: 70px;">
                <h1 class="uk-margin-remove" style="color: white">
                  {{contact.contactName.split('')[0]}}
                </h1>
              </div>
            </div>
            <div class="uk-width-expand">
              <b>{{contact.contactName}}</b><br>
              <span class="uk-text-muted uk-text-capitalize">{{contact.pasar.toLowerCase()}}</span><br>
              <small class="uk-text-muted uk-text-capitalize"><i class="fas fa-map-marker-alt uk-text-muted"></i> {{contact.location.toLowerCase()}}</small><br>
              <small class="uk-text-muted">Jual: {{contact.category.join(', ').toLowerCase()}}</small>
            </div>
            <div class="uk-width-auto uk-height-1-1 uk-flex uk-flex-middle">
              <a href="#modal-detail" uk-toggle @click="showModal(contact)" class="uk-link-reset">
                <i class="fas fa-phone"></i>
              </a>
            </div>
          </div>
        </template>
        <div class="uk-text-center uk-margin-top" v-if="limit < $store.state.sellerContacts.length && $route.name !== 'Home'">
          <button class="uk-button uk-button-primary" @click="loadMore()">lebih banyak</button>
        </div>
        <div v-else-if="$route.name == 'Home' && contacts.length" class="uk-text-center uk-margin-top">
          <router-link :to="{name: 'Pasar', query: {id: $store.state.selectedPasarId}}">
            <button class="uk-button uk-button-text">lebih banyak <i class="fas fa-angle-right"></i></button>
          </router-link>
        </div>
      </div>
      <div v-else>
        <Loading />
      </div>
      <div id="modal-detail" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div v-if="selectedContact.contactName" class="uk-grid-small uk-margin-top" uk-height-match uk-grid>
            <div class="uk-width-auto uk-text-center">
              <div class="uk-background-primary uk-border-circle uk-flex uk-flex-center uk-flex-middle" style="width: 70px; height: 70px;">
                <h1 class="uk-margin-remove" style="color: white">
                  {{selectedContact.contactName.split('')[0]}}
                </h1>
              </div>
            </div>
            <div class="uk-width-expand">
              <b>{{selectedContact.contactName}}</b><br>
              <span class="uk-text-muted uk-text-capitalize">{{selectedContact.pasar.toLowerCase()}}</span><br>
              <small class="uk-text-muted uk-text-capitalize"><i class="fas fa-map-marker-alt uk-text-muted"></i> {{selectedContact.location.toLowerCase()}}</small><br>
              <small class="uk-text-muted">Jual: {{selectedContact.category.join(', ').toLowerCase()}}</small>
            </div>
            <div class="uk-width-1-1 uk-margin-medium-top">
              <div class="uk-grid-small" uk-grid>
                <div class="uk-width-auto uk-width-1-2@m">
                  <a href="javascript:void(0)" @click="contactWhatsapp()" class="uk-width-1-1 uk-button uk-button-primary uk-link-reset" style="color: white !important">
                    <small><i class="fab fa-whatsapp uk-margin-small-right"></i> Whatsapp</small>
                  </a>
                </div>
                <div class="uk-width-expand uk-width-1-2@m">
                  <a :href="'tel:' + selectedContact.contactNumber" class="uk-width-1-1 uk-button uk-button-secondary uk-link-reset">
                    <small><i class="fas fa-phone uk-margin-small-right"></i> Call</small>
                  </a>
                </div>
              </div>
              <div>
                <small class="uk-text-muted">*tidak semua penjual memiliki whatsapp</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
export default {
  data() {
    return {
      isLoading: false,
      limit: 5,
      selectedContact: {}
    }
  },
  computed: {
    contacts() {
      return this.$store.state.sellerContacts.slice(0, this.limit)
    },
    pasar() {
      return this.$store.state.pasar
    },
    selectedPasar() {
      return this.$store.getters.selectedPasar(this.idPasar)
    },
    idPasar: {
      get() {
        return this.$store.state.selectedPasarId
      },
      set(newValue) {
        if (this.$route.query.id) {
          this.$router.push({ name: 'Pasar', query: { id: newValue } })
        }
        this.$store.commit('setSelectedPasar', newValue)
      }
    },
    query: {
      get() {
        return this.$store.state.query
      },
      set(newValue) {
        this.$store.commit('setQuery', newValue)
      }
    }
  },
  components: {
    Loading,
    NoData
  },
  methods: {
    getContacts() {
      this.isLoading = true
      this.limit = 5
      axios({
        method: 'GET',
        url: `https://safe-waters-38064.herokuapp.com/pasar/${this.idPasar}?q=${this.query}`
      })
        .then(({data}) => {
          this.$store.commit('setContacts', data.data)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    getPasar() {
      axios({
        method: 'GET',
        url: 'https://safe-waters-38064.herokuapp.com/pasar'
      })
        .then(({data}) => {
          this.$store.commit('setPasar', data.data)
        })
    },
    loadMore() {
      this.limit += 5
    },
    showModal(data) {
      this.$set(this, 'selectedContact', data)
    },
    contactWhatsapp() {
      let message = `*Hallo Bapak/Ibu ${this.selectedContact.contactName}* \n _${this.selectedContact.pasar}_`
      let number = '62'+this.selectedContact.contactNumber.split('').slice(1).join('')
      let link = `https://api.whatsapp.com/send?phone=${number}&text=${message}`
      window.location.href = link
    }
  },
  created() {
    this.getContacts()
    this.getPasar()
  },
  watch: {
    idPasar() {
      this.getContacts()
    },
    query() {
      this.getContacts()
    }
  }
}
</script>
