<template>
  <div :class="['music', `${theme}-theme`]">
    <div
      class="background-art"
      :style="{ backgroundImage: `url(${albumArt})` }"
    ></div>
    <div class="foreground">
      <div
        :class="{ 'album-artwork': true, playing: music.isPlaying }"
        :style="{ backgroundImage: `url(${albumArt})` }"
      ></div>

      <div class="track-info">
        <h2 class="song">{{ title }}</h2>
        <h3 class="artist">{{ artist }}</h3>
        <h4 class="album">{{ album }}</h4>
      </div>

      <div class="track-ui">
        <div class="progress">
          {{ music.elapsed | toTimestamp }}
          <ProgressBar :complete="complete" />
          {{ duration | toTimestamp }}
        </div>

        <div class="controls">
          <a href="xeninfo:prevtrack" class="prev smaller"
            ><img src="xui://resource/default/media/previous.svg"
          /></a>
          <a href="xeninfo:playpause" class="play-pause"
            ><img :src="playPauseIcon"
          /></a>
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
  import ProgressBar from '../components/ProgressBar';
  // const albumBase = require('../assets/Artwork.jpg');
  const albumBase = 'file:///var/mobile/Documents/Artwork.jpg';
  export default {
    components: {
      ProgressBar,
    },
    data() {
      return {
        theme: 'dribbble',
      };
    },
    computed: {
      ...mapState(['music']),
      // I don't think these are needed with the new observer API.
      title() {
        return this.music.nowPlaying ? this.music.nowPlaying.title : '';
      },
      artist() {
        return this.music.nowPlaying ? this.music.nowPlaying.artist : '';
      },
      album() {
        return this.music.nowPlaying ? this.music.nowPlaying.album : '';
      },
      duration() {
        return this.music.nowPlaying && this.music.nowPlaying.length
          ? this.music.nowPlaying.length
          : 0;
      },
      albumArt() {
        return this.music.isStopped ? albumBase : this.music.nowPlaying?.artwork;
      },
      playPauseIcon() {
        return this.music.isPlaying
          ? 'xui://resource/default/media/pause.svg'
          : 'xui://resource/default/media/play.svg';
      },
      complete() {
        return Math.floor((this.music.elapsed / this.duration) * 100);
      },
    },

    filters: {
      // turn seconds into a timestamp by overloading the native JS Date object.
      /* NOTE: Fails on tracks longer than 24hrs long */
      toTimestamp(seconds) {
        if (seconds) {
          return seconds >= 3600
            ? new Date(seconds * 1000).toISOString().substr(11, 8)
            : new Date(seconds * 1000).toISOString().substr(14, 5);
        }
        return '--:--';
      },
    },
    watch: {
      music: {
        // required for nested objects since they pass-by-reference
        handler(newVal, oldVal) {},
        deep: true,
      },
    },
  };
</script>

<style lang="scss">
  .music {
    max-width: 100vw;
    max-height: 100vh;
    height: 100%;
    overflow: hidden;
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
