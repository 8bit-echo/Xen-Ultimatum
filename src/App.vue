<template>
  <div id="app">
    <router-view />
    <Nav />
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Nav from './components/Nav';
  export default {
    components: {
      Nav,
    },
    computed: {
      ...mapState(['musicData']),
    },

    watch: {
      musicData(newValue, oldValue) {
        if (newValue.isplaying) {
          console.log('music is playing...');
          this.$router.push('music');
        }
      },
    },
  };
</script>

<style lang="scss">
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  body,
  html {
    margin: 0;
    width: 100%;
    height: 100%;
  }
  @font-face {
    font-family: icomoon;
    src: url('./assets/icomoon.ttf') format('truetype');
  }

  .icon {
    font-family: icomoon;
  }

  img {
    max-width: 100%;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    height: 100%;
    width: 100%;
    text-shadow: 0 0 1rem rgba(black, 0.75);
    // background-image: url(https://picsum.photos/375/812);
    // background-repeat: no-repeat;
    // background-position: center;
    // background-size: cover;
  }
</style>
