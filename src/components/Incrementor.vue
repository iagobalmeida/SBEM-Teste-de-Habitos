<template>
    <div class="form-group w-100">
        <label><b>{{label}}</b></label>
        <div class="input-group">
        <button tabIndex="-1" type="button" class="btn btn-outline-secondary border-left-radius" v-on:click="$emit('clickMinus')"><i class="fa fa-minus fa-sm text-muted p-0"></i></button>
        <input tabIndex="0" :name="label" type="number" class="form-control" :value="modelValue" @input="$emit('update:modelValue', parseFloat($event.target.value))" _required>
        <button tabIndex="-1" type="button" class="btn btn-outline-secondary border-right-radius" v-on:click="$emit('clickPlus')"><i class="fa fa-plus fa-sm text-muted p-0"></i></button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Incrementor',
  props: {
    modelValue: { type: Number, default: 0},
    label: { tyope: String, default: ''},
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
