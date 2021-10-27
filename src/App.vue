<template>
  <!-- Warning -->
  <div class="w-100 bg-primary p-5 text-center text-light h4" v-if="showWarning" data-aos="fade-down">
    O resultado será enviado para o e-mail <b>{{pages[0].inputs[0].value}}</b>
    <br class="d-md-none">
    <button class="btn btn-sm ml-5 btn-primary" v-on:click="changeStep(-1)" tabindex="-1">
      Alterar
    </button>
    <button class="btn btn-sm ml-5 btn-primary" v-on:click="showWarning = false" tabindex="-1">
      Fechar
    </button>
  </div>

  <!-- Spinner -->
  <div class="position-fixed top-0 vh-100 vw-100 d-flex justify-content-center align-items-center" style="z-index:99;background-color:#181C3850;" data-aos="zoom-out" v-if="loading">
    <div class="spinner-border text-primary" role="status">
    </div>
  </div>

  <!-- Main -->
  <div class="d-flex justify-content-center align-items-center flex-column container my-5">


    <!-- Formulário modular -->
    <ModularFormCard
      v-on:previousStep="changeStep(currentStep - 1)"
      v-on:nextStep="changeStep(currentStep + 1)"
      :icon="currentPage.icon || ''"
      :title="currentPage.title || ''"
      :description="currentPage.description || ''"
      :inputs="currentPage.inputs || []"
      :customHeader="currentPage.template ? currentPage.template.header : null"
      :customFooter="currentPage.template ? currentPage.template.footer : null"
      v-if="currentStep + 1 < pages.length"
      data-aos="fade-left" data-aos-delay="200"
      ref="formCard"
    />

    <!-- Formulário final [mensagem de envio/resultado] ( passo 7+ ) -->
    <FormCard
      v-on:previousStep="changeStep(currentStep - 1)"
      v-on:nextStep="changeStep(currentStep + 1)"
      v-else
    >
      <template v-slot:body>
        <div class="container text-center mb-5">
          <h2 class="display-3 text-primary mb-5" data-aos="fade-up">{{title}}</h2>
          <!-- Done check -->
          <i v-if="done" class="fas fa-check display-3 text-primary mb-5" data-aos="zoom-in" data-aos-delay="100"></i>
          <!-- Subtitle -->
          <h5 class="" data-aos="fade-up" data-aos-delay="100" v-html="headerSubtitle"></h5>
          <!-- Result ( dev only ) -->
          <pre class="text-left p-3 bg-secondary rounded">
{{result}}
          </pre>
        </div>
      </template>
      <template v-slot:footer>
        <a href="https://www.saberemagrecer.com.br/" class="btn btn-primary h4 d-flex justify-content-center align-items-center w-100">
          Conheça o programa Saber Emagrecer
          <i class="fa fa-chevron-right ml-3"></i>
        </a>
      </template>
    </FormCard>

    <Paginator ref="paginator" :pageCount="9" :currentPage="currentStep+2" data-aos="fade-left" data-aos-delay="200"/>

    <span class="bottom-0 text-center text-muted my-5 h4">Saber Emagrecer © 2021</span>
  </div>
</template>

<script>
import Paginator from './components/Paginator.vue';
import FormCard from './components/FormCard.vue';
import ModularFormCard from './components/ModularFormCard.vue';
import './assets/style.css'
import AOS from 'aos';
import pages from './assets/pages.js';

export default {
  name: 'App',
  data: () => (
    {
      title:              'Teste de Hábitos',
      pages:              pages,
      loading:            false,
      sending:            false,
      done:               false,
      currentStep:        -1,
      showWarning:        false,
    }
  ),
  components: {
    Paginator,
    FormCard,
    ModularFormCard
  },
  methods: {
    focusNextInput() {
      setTimeout(() => {
        let inputs = document.getElementsByTagName('form');
        if(inputs.length) {
          inputs[0].focus();
        }
      }, 200);
    },
    fakeLoad(callback) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        callback();
      }, 1000);
    },
    changeStep(value) {
      this.$refs.formCard.$el.classList.remove('aos-init');
      this.$refs.formCard.$el.classList.remove('aos-animate');
      setTimeout(() => {
        this.currentStep = value;
        this.$refs.formCard.$el.classList.add('aos-init');
        this.$refs.formCard.$el.classList.add('aos-animate');
      }, 500);
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.paginator.$el.removeAttribute('data-aos')
      this.$refs.paginator.$el.removeAttribute('data-aos-delay')
    }, 180)
  },
  watch: {
    currentStep(newValue) {
      this.focusNextInput();
      this.showWarning = (this.showWarning || newValue == 0) && newValue > -1;
      if(newValue == 7){
        this.sending = true;
        this.loading = true;
        setTimeout(() => {
          this.sending = false;
          this.loading = false;
          this.done = true;
          console.log(this.result);
        }, 5000);
      }
    }
  },
  computed: {
    currentPage() {
      return this.pages[this.currentStep + 1];
    },
    headerSubtitle() {
      return this.sending ?
      `Enviando os resultados para o seu e-mail...` :(
        this.done ? `Os resultados foram enviados para o e-mail <b>${this.pages[0].inputs[0].value}</b>!<br> Que tal começar agora mesmo a melhorar esses aspectos?` :
        `Complete esse Quizz do <b>Saber Emagrecer</b> em apenas 3 minutos e <b>descubra porque você não emagrece!</b>`
      );
    },
    result() {
      return this.pages.reduce((acc, page) => {
        page.inputs.forEach((input) => {
          acc[input.name] = input.type != 'checkbox' && input.type != 'incrementorList' ? input.value : {...input.value};
        })
        return acc;
      }, {});
    }
  },
  created() {
    AOS.init();
  }
}
</script>

<style lang="scss">
#app {
  overflow-x: hidden;
  font-family: 'Poppins', sans-serif;
}
.spinner-border {
  width: 3rem; height: 3rem;
}
.border-left-radius {
  border-radius: 10px 0px 0px 10px;
}
.border-right-radius {
  border-radius: 0px 10px 10px 0px;
}
.card {
  width: 50%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  label, input, span, button {
    font-size: 1.25rem;
  }
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-direction: row;
    button:nth-child(n+2) {
      flex: 1;
      margin-left: 1rem;
    }
  }
  img {
    width: 175px;
    height: 175px;
  }
}
</style>
