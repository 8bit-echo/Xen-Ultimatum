<template>
  <div id="app" :style="{ backgroundImage }">
    <router-view />
    <Nav />
  </div>
</template>

<script>
  import Nav from './components/Nav';
  export default {
    components: {
      Nav,
    },
    computed: {
      // gets a random background image on safari for development env
      backgroundImage() {
        return process.env.NODE_ENV === 'development'
          ? 'url(https://picsum.photos/375/812)'
          : 'none';
      },
    }
  };
</script>
