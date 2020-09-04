<template>
  <transition appear name="slideup">
    <div class="nav">
      <router-link to="/">·</router-link>
      <router-link to="/about">··</router-link>
      <router-link to="/music" class="icon">&#xe911;</router-link>
      <a v-for="app in customApps" :href="`xeninfo:openapp:${app}`" :key="app">I</a>
      <a href="xeninfo:openapp:com.apple.springboard" class="icon">&#xe990;</a>
    </div>
  </transition>
</template>

<script>
  import prefs from '../../public/preferences.json';
  console.log(prefs);
  export default {
    data() {
      return {
        musicIcon: require('../assets/music.svg'),
        customApps: prefs.customDockApps,
      };
    },
  };
</script>

<style lang="scss">
  .nav {
    overflow: visible;
    display: flex;
    position: fixed;
    z-index: 5;
    bottom: 0;
    background-color: black;
    color: white;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
    padding: 5px 0;

    &::before {
      background-image: url('../assets/corners.png');
      position: absolute;
      z-index: 5;
      width: 100%;
      bottom: 96%;
      height: 36px;
      content: '';
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
    a {
      font-weight: bold;
      color: white;
      margin: 0 10px;
      display: inline-block;
      padding: 20px;
      height: 1rem;
      width: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border: solid 3px transparent;
      text-decoration: none;
      &.router-link-exact-active {
        color: orange;
        background-color: black;
        border-radius: 50%;
        border: solid 3px rgb(39, 39, 39);
      }
    }
  }

  .slideup-enter {
    bottom: -100px;
    &-active {
      transition: bottom 0.25s 1s ease-out;
    }
  }

  @media (prefers-color-scheme: light) {
    #nav {
      background-color: whitesmoke;
      a {
        color: black;
        &.router-link-exact-active {
          background-color: whitesmoke;
        }
      }
      &::before {
        filter: invert(0.95);
      }
    }
  }
</style>
