<template>
  <div :class="wrapperClass" v-on:click="$emit('handleClick')" v-on:keydown="handleKeyDown"  tabindex="0">
    <label :class="`form-check-label ${selected?'text-white':''}`" :for="radioId">
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
    radioId: String,
    name: String
  },
  methods: {
    handleKeyDown(event) {
      let target = event.target;
      let previous = target.previousSibling;
      let next = target.nextSibling;
      console.log(previous);
      console.log(next);
      switch(event.key) {
        case 'Enter':
          this.$emit('handleClick');
        break;
        case 'ArrowUp':
          if(previous.tagName) {
            previous.focus();
          }else{
            next.focus();
          }
        break;
        case 'ArrowDown':
          if(next.tagName) {
            next.focus();
          }else{
            previous.focus();
          }
        break;
      }
    }
  },
  computed: {
    wrapperClass() {
      return `mb-3 px-3 py-2 d-flex flex-column border rounded ${this.selected ? 'border-primary bg-primary text-white' : ''}`;
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
