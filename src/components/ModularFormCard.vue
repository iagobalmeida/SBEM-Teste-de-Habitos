<template>
  <div class="card card-custom shadow-sm mb-5" data-aos="fade-left" data-aos-delay="150">
    <form v-on:submit.prevent="$emit('nextStep')">
        <!-- Header -->
        <div class="card-header p-6" v-html="customHeader" v-if="customHeader">
        </div>
        <div class="card-header p-6" v-else>
            <i :class="`${icon} mr-3 h3 text-primary`"></i>
            <b class="card-title text-primary h3">{{title}}</b>
        </div>
        <!-- Body -->
        <div class="card-body">
            <label v-if="description"><b>{{description}}</b></label>
            <div v-for="input, inputIndex in inputs" :key="`page_input_${inputIndex}`">
                <!-- Default Input -->
                <div :class="`form-group w-100 ${inputIndex == inputs.length -1 ? 'mb-0':''}`" v-if="['text','email','tel','password'].includes(input.type)">
                    <label><b>{{input.label}}:</b></label>
                    <input :type="input.type" v-model="input.value" :placeholder="input.placeholder" class="form-control" required>
                    <span class="mt-2 text-center text-primary" v-if="input.help">{{input.help}}</span>
                </div>
                <!-- Default TextArea -->
                <div :class="`form-group w-100 ${inputIndex == inputs.length -1 ? 'mb-0':''}`" v-if="input.type=='textarea'">
                    <label><b>{{input.label}}:</b></label>
                    <textarea v-model="input.value" class="form-control" required/>
                    <span class="mt-2 text-center text-primary" v-if="input.help">{{input.help}}</span>
                </div>
                <!-- Custom RadioDiv -->
                <div class="form-group w-100 mb-0" v-if="input.type == 'radio'">
                    <label><b>{{input.label}}</b></label>
                    <RadioDiv
                    v-for="inputOption, inputOptionIndex in input.options"
                    :key="`page_input_${inputIndex}_option_${inputOptionIndex}`"
                    :label="inputOption"
                    :selected="input.value==inputOption"
                    :radioId="`page_input_${inputIndex}_option_${inputOptionIndex}`"
                    v-on:handleClick="input.value=inputOption"/>
                </div>
                <!-- Custom CheckBox -->
                <div class="form-group w-100 mb-0" v-if="input.type == 'checkbox'">
                    <label><b>{{input.label}}</b></label>
                    <RadioDiv
                    v-for="inputOption, inputOptionIndex in input.value"
                    :key="`page_input_${inputIndex}_option_${inputOptionIndex}`"
                    :label="inputOptionIndex"
                    :selected="inputOption"
                    :radioId="`page_input_${inputIndex}_option_${inputOptionIndex}`"
                    v-on:handleClick="input.value[inputOptionIndex] = !inputOption"/>
                </div>
                <!-- Custom IncrementorList -->
                <div class="form-group w-100 mb-0" v-if="input.type == 'incrementorList'">
                    <label><b>{{input.label}}</b></label>
                    <Incrementor
                    :label="inputValueIndex"
                    v-model="input.value[inputValueIndex]"
                    v-on:clickMinus="input.value[inputValueIndex] -= 1"
                    v-on:clickPlus="input.value[inputValueIndex] += 1"
                    v-for="inputValue, inputValueIndex in input.value"
                    :key="`page_input_${inputIndex}_option_${inputValueIndex}`"
                    />
                </div>
                <!-- Custom Incrementor -->
                <Incrementor
                :label="input.label"
                v-model="input.value"
                v-on:clickMinus="input.value -= 1"
                v-on:clickPlus="input.value += 1"
                v-if="input.type == 'number'"
                />
            </div>
        </div>
        <!-- Footer -->
        <div class="card-footer" v-html="customFooter" v-if="customFooter">
        </div>
        <div class="card-footer" v-else>
            <button class="btn btn-outline-secondary d-flex justify-content-between text-muted align-items-center" type="button" v-on:click="$emit('previousStep')">
                <i class="fa fa-chevron-left text-muted"></i>
            </button>

            <button class="btn btn-primary d-flex justify-content-between  align-items-center w-100" v-bind:disabled="enableNextStep">
                Avançar
                <i class="fa fa-chevron-right ml-3"></i>
            </button>
        </div>
    </form>
  </div>
</template>

<script>
import RadioDiv from './RadioDiv.vue';
import Incrementor from './Incrementor.vue';

export default {
  name: 'FormCard',
  props: {
      title:        { type:String, default:'' },
      icon:         { type:String, default:'' },
      description:  { type:String, default:'' },
      inputs:       { type: Array, default: () => [] },
      customHeader: { type:String, default:null},
      customFooter: { type:String, default:null}
  },
  components: {
      RadioDiv,
      Incrementor
  },
  methods: {
      checkInput(input) {
          return typeof input.value === 'object' ? this.checkComplexInput(input) : this.checkSimpleInput(input);
      },
      checkSimpleInput(input) {
          return input.type != 'number' ? (input.value != '' && input.value.length > 0) : (input.value && input.value > -1);
      },
      checkComplexInput(input) {
        switch(input.type) {
            case 'checkbox':
                return Object.values(input.value).reduce((acc, value) => (acc || value));
            case 'incrementorList':
                return Object.values(input.value).reduce((acc, value) => (acc || value > 0));
            default:
                return true;
        }
      }
  },
  computed: {
    enableNextStep() {
        return !this.inputs.reduce((acc, input) => (input.required ? this.checkInput(input) && acc : acc), true);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
