<template>
  <div class="music dribbble-theme">
    <div class="background-art" :style="{ backgroundImage: `url(${albumArt})` }"></div>
    <div class="foreground">
      <div :class="{ 'album-artwork': true, playing: musicData.isplaying }" :style="{ backgroundImage: `url(${albumArt})` }"></div>

      <div class="track-info">
        <h2 class="song">{{ musicData.title }}</h2>
        <h3 class="artist">{{ musicData.artist }}</h3>
        <h4 class="album">{{ musicData.album }}</h4>
      </div>

      <div class="track-ui">
        <div class="progress">{{ musicData.currentElapsedTime }} | {{ t }}================== {{ musicData.currentDuration }}</div>

        <div class="controls">
          <a href="xeninfo:prevtrack" class="prev smaller"><img src="xui://resource/default/media/previous.svg" /></a>
          <a href="xeninfo:playpause" class="play-pause"><img :src="playPauseIcon" /></a>
          <a href="xeninfo:nexttrack" class="next smaller">
            <img src="xui://resource/default/media/next.svg" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  // const albumBase = require('../assets/Artwork.jpg');
  const albumBase = 'file:///var/mobile/Documents/Artwork.jpg';
  export default {
    data() {
      return {
        key: 0,
        t: '--:--',
      };
    },
    computed: {
      ...mapState(['musicData']),
      albumArt() {
        return this.musicData.title !== '(null)' ? `${albumBase}?v=${this.key}` : 'xui://resource/default/media/no-artwork.svg';
      },
      song() {
        return this.musicData.title !== '(null)' ? this.musicData.title : '';
      },
      artist() {
        return this.musicData.artist !== '(null)' ? this.musicData.artist : '';
      },
      album() {
        return this.musicData.album !== '(null)' ? this.musicData.album : '';
      },
      playPauseIcon() {
        return this.musicData.isplaying ? 'xui://resource/default/media/pause.svg' : 'xui://resource/default/media/play.svg';
      },
    },
    watch: {
      musicData: {
        handler(newVal, oldVal) {
          if (newVal.currentElapsedTime !== oldVal.currentElapsedTime) {
            this.t = newVal.currentElapsedTime;
          }
        },
        deep: true,
      },
    },
  };
</script>

<style lang="scss">
  .music {
    height: 100%;
    overflow: hidden;
  }

  .classic-theme {
    .background-art {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 0;
      width: 120%;
      height: 120%;
      // background-image: url('../assets/Artwork.jpg');
      // background-image: url(file:///var/mobile/Documents/Artwork.jpg);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      filter: blur(30px);
    }

    .foreground {
      position: relative;
      z-index: 2;
      margin-top: 10vh;
    }
    .album-artwork {
      height: 320px;
      width: 320px;
      margin: auto;
      margin-top: 15px;
      border: solid 10px white;
      background-color: ghostwhite;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .track-info {
      text-shadow: 0 0 1em rgba(0, 0, 0, 0.5);

      h3,
      h4 {
        font-weight: normal;
      }
    }

    .controls {
      display: flex;
      justify-content: space-around;
      align-items: center;

      button,
      a {
        outline: none;
        appearance: none;
        border: none;
        background: transparent;
        color: white;
        font-size: 2rem;
        text-decoration: none;
        max-width: 35px;
      }
    }
  }

  .dribbble-theme {
    background: #222;
    width: 100vw;
    overflow: hidden;

    .background-art {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      // background-image: url(file:///var/mobile/Documents/Artwork.jpg);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      filter: blur(30px);
    }

    .album-artwork {
      height: 300px;
      width: 300px;
      margin: auto;
      margin-top: 15px;
      box-shadow: -20px 0 100px rgba(0, 0, 0, 0.75);
      // background-color: red;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: 50%;
      position: absolute;
      right: -20%;
      z-index: 2;
      &::before {
        content: '';
        display: block;
        position: absolute;
        width: 190px;
        height: 190px;
        background-image: inherit;
        background-size: contain;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      &::after {
        content: '';
        display: block;
        position: absolute;
        width: 300px;
        height: 300px;
        background-image: url(../assets/vinyl-cropped.png);
        background-size: contain;
        top: 0;
        left: 0;
        // background: rgba(0, 0, 0, 0.5);
      }

      &.playing::after {
        animation: spin forwards 30s infinite linear;
      }
    }

    .foreground {
      position: relative;
      z-index: 2;
      padding-top: 10vh;
      background: rgba(#222, 75%);
      height: 100%;
    }

    .track-info {
      top: 5vh;
      left: 10px;
      position: relative;
      z-index: 3;
      text-align: left;
      padding: 0 10px;
    }

    .track-ui {
      position: relative;
      top: 25vh;
    }

    .song {
      font-style: italic;
      text-transform: uppercase;
      font-size: 1.75rem;
      word-break: break-word;
      font-weight: 900;
    }

    .artist {
      font-size: 1.2rem;
      width: 35vw;
      font-weight: lighter;
      // background: pink;
    }

    .album {
      display: none;
    }

    .controls {
      position: relative;
      z-index: 3;
      display: flex;
      align-items: center;
      margin-left: 5%;
      top: 5vh;
      a {
        max-width: 50px;
        margin: 0 10px;
      }

      img {
        transform: scale(0.5);
        max-width: 40px;
      }
    }

    .play-pause {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
