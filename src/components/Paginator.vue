<template>
    <div class="d-flex justify-content-evenly align-items-center mt-5 w-sm-100 w-md-50" v-if="currentPage < pageCount">
      <div class="col p-1 mx-1 d-flex justify-content-center align-items-center" v-for="page, number in pageCount" :key="`page_${number}`">
        <div :class="`${page <= currentPage ? 'bg-primary' : '' } border border-2 border-primary rounded-pill shadow-sm`" :style="getStyle(page)"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Paginator',
  props: {
      pageCount:    Number,
      currentPage:  Number
  },
  methods: {
    getStyle(pageNumber) {
        return `width:${pageNumber==this.currentPage?'3rem':'1.5rem'}; height:1.5rem;transition:all 175ms ease-in-out;`
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
