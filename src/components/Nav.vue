<template>
  <transition appear name="slideup">
    <div class="nav">
      <router-link to="/"><span class="icon"></span></router-link>
      <router-link to="/weather"><span class="icon"></span></router-link>
      <router-link to="/calendar"><span class="icon"></span></router-link>
      <router-link to="/music" class="icon"><span>&#xe911;</span></router-link>

      <a
        v-for="app in customApps"
        :href="`xeninfo:openapp:${app}`"
        :key="app"
        class="custom-app"
      >
        <img :src="getAppIcon(app)" />
      </a>

      <a href="xeninfo:openapp:com.apple.springboard" class="icon">&#xe990;</a>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        // from prefrences.js
        customApps: window.config.customDockApps,
      };
    },
    methods: {
      // get user app icon from bundle ID
      getAppIcon(bundleID) {
        if (window.api) {
          return window.api.apps.applicationForIdentifier(bundleID).icon;
        }
        // for desktop development only
        return 'https://placeholder.com/46x46';
      },
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
    text-shadow: none;

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
      height: 46px;
      width: 46px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: solid 3px transparent;
      text-decoration: none;

      img {
        max-width: 100%;
      }

      &.router-link-exact-active {
        // color: orange;
        background-color: black;
        border-radius: 50%;
        border: solid 3px rgb(39, 39, 39);
      }
    }
  }

  .slideup-enter {
    bottom: -100px;
    &-active {
      transition: bottom 0.25s 0.5s ease-out;
    }
  }

  @media (prefers-color-scheme: light) {
    .nav {
      background-color: whitesmoke;
      text-shadow: none !important;
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
