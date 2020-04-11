<template>
  <div class="uk-background-primary uk-light uk-position-fixed uk-width-1-1" style="z-index: 2">
    <div class="uk-container">
      <div uk-grid>
        <div class="uk-width-3-5 uk-flex uk-flex-middle">
          <div class="logo">
            <router-link :to="{name: 'Home'}" class="uk-link-reset">
              <h4 class="uk-margin-remove">
                <img src="/assets/logo-ok.png" alt="logo" width="30"> 
                <small class="uk-text-uppercase uk-margin-small-left" style="letter-spacing: 1px;">Dirumahaja</small> 
              </h4>
            </router-link>
          </div>
        </div>
        <div class="uk-width-2-5 uk-text-right">
          <div class="logo">
            <h4 class="uk-margin-small-top uk-margin-small-bottom" uk-toggle="target: #offcanvas-slide">
              Info
              <span uk-icon="menu"></span>
            </h4>
          </div>
        </div>
      </div>
    </div>
    <div id="offcanvas-slide" uk-offcanvas="overlay: true">
      <div class="uk-offcanvas-bar">
        <button class="uk-offcanvas-close" type="button" uk-close></button>
        <h5>Tentang</h5>
        <p>
          Data-data pedagang Pasar Jaya yang ada di web ini adalah milik <a href="http://pasarjaya.co.id/" class="uk-link-reset" target="_blank">Pasar Jaya</a> yang ada di website <a href="http://belanja.pasarjaya.co.id/" class="uk-link-reset" target="_blank">http://belanja.pasarjaya.co.id/</a>
        </p>
        <div uk-grid class="uk-grid-small">
          <div class="uk-width-auto">
            <img src="/assets/quote.svg" alt="quote" width="30">
          </div>
          <div class="uk-width-expand">
            <small>Pesanan dapat dilakukan langsung ke Pedagang setiap pasar</small> 
          </div>
        </div>
        <div uk-grid class="uk-grid-small">
          <div class="uk-width-auto">
            <img src="/assets/quote.svg" alt="quote" width="30">
          </div>
          <div class="uk-width-expand">
            <small>Kualitas barang dagangan merupakan tanggung jawab Pedagang</small> 
          </div>
        </div>
        <div uk-grid class="uk-grid-small">
          <div class="uk-width-auto">
            <img src="/assets/quote.svg" alt="quote" width="30">
          </div>
          <div class="uk-width-expand">
            <small>Metode pengiriman dan pembayaran merupakan kesepakatan antara Pembeli dan Pedagang</small> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  padding: 5px 0;
}
</style>