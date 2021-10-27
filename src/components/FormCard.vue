<template>
  <div class="card card-custom shadow-sm mb-5" data-aos="fade-left" data-aos-delay="150">
    <form v-on:submit.prevent="$emit('nextStep')">
      <div class="card-header p-6" v-if="title">
        <slot name="header">
          <i :class="`${icon} mr-3 h3 text-primary`"></i>
          <b class="card-title text-primary h3">{{title}}</b>
        </slot>
      </div>
      <div class="card-body">
        <slot name="body"></slot>
      </div>
      <div class="card-footer">
        <slot name="footer">
          <button class="btn btn-outline-secondary d-flex justify-content-between text-muted align-items-center" type="button" v-on:click="$emit('previousStep')" tabindex="2">
            <i class="fa fa-chevron-left text-muted"></i>
          </button>

          <button class="btn btn-primary d-flex justify-content-between  align-items-center w-100" tabindex="1">
            Avançar
            <i class="fa fa-chevron-right ml-3"></i>
          </button>
        </slot>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FormCard',
  props: {
      title:  { type:String, default:''},
      icon:   { type:String, default:''},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
