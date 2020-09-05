<template>
  <img class="klear" :src="icon" />
</template>

<script>
  export default {
    props: {
      condition: {
        type: Number,
        required: true,
      },
    },
    computed: {
      icon() {
        return require(`../assets/Klear/${this.condition}.png`);
      }
    }
  };
</script>
