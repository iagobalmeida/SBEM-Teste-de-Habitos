<template>
  <div :class="wrapperClass" v-on:click="$emit('handleClick')">
    <label :class="`form-check-label ${selected?'text-white':'text-muted'}`" :for="radioId">
      <i :class="`far fa-${selected?'check-':''}circle mr-3 ${selected?'text-white':''}`"></i>
      {{label}}
    </label>
  </div>
</template>

<script>
export default {
  name: 'RadioDiv',
  props: {
    label: String,
    selected: Boolean,
    radioId: String
  },
  computed: {
    wrapperClass() {
      return `mb-3 px-3 py-2 d-flex flex-column border rounded ${this.selected ? 'border-primary bg-primary text-white' : 'border-secondary text-muted'}`;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  cursor: pointer;
  transition: all 175ms;
}
label {
  font-size: 1.25rem;
}
</style>
