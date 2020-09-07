<template>
  <div class="progress-bar">
    <div class="complete" :style="{ width: `${complete}%` }"></div>
  </div>
</template>

<script>
  export default {
    props: {
      complete: {
        required: false,
        default: 0,
        type: Number,
      },
    },
  };
</script>

<style lang="scss" scoped>
.progress-bar {
  height: 10px;
  position: relative;
  width: 100%;
  margin: auto;
  max-width: 50vw;
  border: solid 1px white;
  border-radius: 7.5px;

  .complete {
    position: absolute;
    left: 0;
    top: 0;
    background: white;
    opacity: 0.80;
    height: 8px;
    border-top-right-radius: 7.5px;
    border-bottom-right-radius: 7.5px;
  }

}
</style>
