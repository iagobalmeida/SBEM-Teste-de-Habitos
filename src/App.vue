<template>
  <!-- Warning -->
  <div class="w-100 bg-primary p-5 text-center text-light h4" v-if="currentStep >= 0">
    O teste sera enviado para o email <b>{{email}}</b>
  </div>

  <!-- Spinner -->
  <div class="position-fixed top-0 vh-100 vw-100 d-flex justify-content-center align-items-center" style="z-index:99;background-color:#181C3850;" data-aos="zoom-out" v-if="loading">
    <div class="spinner-border text-primary" role="status">
    </div>
  </div>

  <!-- Main -->
  <div class="d-flex justify-content-center align-items-center flex-column container my-5">

    <!-- Formulário de identificação -->
    <div  class="card card-custom shadow-sm mb-5" data-aos="fade-left" data-aos-delay="150" v-if="currentStep == -1">
      <form v-on:submit.prevent="nextStep">
        <div class="card-header">
          <div class="container text-center mb-5">
            <img src="https://sbem-v2.s3.amazonaws.com/static/webportal/liamara/lia_256x256.webp" alt="Lia Trevisan" width="256px" height="256px" class="rounded-circle mb-3">
            <h2 class="display-3 text-primary mb-5" data-aos="fade-up">Teste de Hábitos</h2>
            <!-- Done check -->
            <i v-if="done" class="fas fa-check display-3 text-primary mb-5" data-aos="zoom-in" data-aos-delay="100"></i>
            <!-- Subtitle -->
            <h5 class="text-justify" data-aos="fade-up" data-aos-delay="100" v-html="headerSubtitle"></h5>
          </div>
        </div>
        <div class="card-body">
          <div class="form-group w-100 mb-0">
            <label><b>E-mail:</b></label>
            <input type="email" v-model="email" placeholder="Seu melhor e-mail" class="form-control mb-3" required>
            <span class="mt-2 text-center text-primary">O resultado do teste será enviado para esse e-mail!</span>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary d-flex justify-content-between align-items-center w-100">
            Começar o Teste
            <i class="fa fa-chevron-right ml-3"></i>
          </button>
        </div>
      </form>
    </div>

    <!-- Formulário identificação parte 01 -->
    <div  class="card card-custom shadow-sm mb-5" data-aos="fade-left" data-aos-delay="150" v-if="currentStep == 0">
      <form v-on:submit.prevent="nextStep">
        <div class="card-header p-6">
          <i class="fa fa-user text-primary mr-3 h3"></i>
          <b class="card-title text-primary h3">Quem é você?</b>
        </div>
        <div class="card-body">
          <div class="form-group w-100">
            <label><b>Nome:</b></label>
            <input type="text" v-model="name" placeholder="Seu nome completo" class="form-control" required>
          </div>
          <div class="form-group w-100">
            <label><b>Celular:</b></label>
            <input type="tel" v-model="cellphone" placeholder="Seu contato do WhatsApp" class="form-control" required>
          </div>
          <div class="form-group w-100 mb-0">
            <label><b>Qual seu sexo de nascença?</b></label>
            <RadioDiv label="Masculino" :selected="sex=='male'"   radioId="radio_sex_male"  v-on:handleClick="sex='male'"/>
            <RadioDiv label="Feminino" :selected="sex=='female'"  radioId="radio_sex_female"  v-on:handleClick="sex='female'"/>
          </div>
        </div>
        <div class="card-footer">

          <button class="btn btn-outline-secondary d-flex justify-content-between text-muted align-items-center" type="button" v-on:click="previousStep">
            <i class="fa fa-chevron-left text-muted"></i>
          </button>

          <button class="btn btn-primary d-flex justify-content-between  align-items-center w-100">
            Avançar
            <i class="fa fa-chevron-right ml-3"></i>
          </button>

        </div>
      </form>
    </div>

    <!-- Formulário identificação parte 02 - idade, peso e altura -->
    <div  class="card card-custom shadow-sm mb-5" data-aos="fade-left" data-aos-delay="150" v-if="currentStep == 1">
      <form v-on:submit.prevent="nextStep">
        <div class="card-header p-6">
          <i class="fa fa-user text-primary mr-3 h3"></i>
          <b class="card-title text-primary h3">Quem é você?</b>
        </div>
        <div class="card-body">
          <div class="form-group w-100">
            <label><b>Quantos anos você tem?</b></label>
            <div class="input-group">
              <button type="button" class="btn btn-outline-secondary border-left-radius" v-on:click="age -= 1"><i class="fa fa-minus fa-sm text-muted p-0"></i></button>
              <input type="number" v-model="age" min="14" max="99" class="form-control" _required>
              <button type="button" class="btn btn-outline-secondary border-right-radius" v-on:click="age += 1"><i class="fa fa-plus fa-sm text-muted p-0"></i></button>
            </div>
          </div>
          <div class="form-group w-100">
            <label><b>Qual seu peso atual?</b></label>
            <div class="input-group">
              <button type="button" class="btn btn-outline-secondary border-left-radius" v-on:click="weight -= 1.00"><i class="fa fa-minus fa-sm text-muted p-0"></i></button>
              <input type="number" v-model="weight" min="25" max="400" step="1.00" class="form-control" _required>
              <button type="button" class="btn btn-outline-secondary border-right-radius" v-on:click="weight = parseFloat(weight) + 1.00"><i class="fa fa-plus fa-sm text-muted p-0"></i></button>
            </div>
          </div>
          <div class="form-group w-100">
            <label><b>Qual a sua altura?</b></label>
            <div class="input-group">
              <button type="button" class="btn btn-outline-secondary border-left-radius" v-on:click="height -= 0.05"><i class="fa fa-minus fa-sm text-muted p-0"></i></button>
              <input type="number" v-model="height" min="0.75" max="2.50" step=".1" class="form-control" _required>
              <button type="button" class="btn btn-outline-secondary border-right-radius" v-on:click="height = parseFloat(height) + 0.05"><i class="fa fa-plus fa-sm text-muted p-0"></i></button>
            </div>
          </div>
        </div>
        <div class="card-footer">

          <button class="btn btn-outline-secondary d-flex justify-content-between text-muted align-items-center" type="button" v-on:click="previousStep">
            <i class="fa fa-chevron-left text-muted"></i>
          </button>

          <button class="btn btn-primary d-flex justify-content-between  align-items-center w-100">
            Avançar
            <i class="fa fa-chevron-right ml-3"></i>
          </button>

        </div>
      </form>
    </div>

    <!-- Formulário de metas -->
    <div  class="card card-custom shadow-sm mb-5" data-aos="fade-left" data-aos-delay="150" v-if="currentStep == 2">
      <form v-on:submit.prevent="nextStep">
        <div class="card-header p-6">
          <i class="fa fa-user text-primary mr-3 h3"></i>
          <b class="card-title text-primary h3">O que você quer mudar?</b>
        </div>
        <div class="card-body">
          <div class="form-group w-100">
            <label><b>Quantos quilos você gostaria de emagrecer?</b></label>
            <div class="input-group">
              <button type="button" class="btn btn-outline-secondary border-left-radius" v-on:click="desiredLoss -= 1"><i class="fa fa-minus fa-sm text-muted p-0"></i></button>
              <input type="number" v-model="desiredLoss" class="form-control" _required>
              <button type="button" class="btn btn-outline-secondary border-right-radius" v-on:click="desiredLoss += 1"><i class="fa fa-plus fa-sm text-muted p-0"></i></button>
            </div>
          </div>
          <div class="form-group w-100">
            <label><b>Qual sua maior dificuldade em emagrecer?</b></label>
            <textarea v-model="biggestDifficulty" class="form-control" _required/>
          </div>
          <div class="form-group w-100">
            <label><b>Qual sua maior motivação em emagrecer?</b></label>
            <textarea v-model="biggestMotivation" class="form-control" _required/>
          </div>
        </div>
        <div class="card-footer">

          <button class="btn btn-outline-secondary d-flex justify-content-between text-muted align-items-center" type="button" v-on:click="previousStep">
            <i class="fa fa-chevron-left text-muted"></i>
          </button>

          <button class="btn btn-primary d-flex justify-content-between  align-items-center w-100">
            Avançar
            <i class="fa fa-chevron-right ml-3"></i>
          </button>

        </div>
      </form>
    </div>

    <!-- Formulário de sintomas -->
    <div  class="card card-custom shadow-sm mb-5" data-aos="fade-left" data-aos-delay="150" v-if="currentStep == 3">
      <form v-on:submit.prevent="nextStep">
        <div class="card-header p-6">
          <i class="fa fa-user text-primary mr-3 h3"></i>
          <b class="card-title text-primary h3">Como você se sente?</b>
        </div>
        <div class="card-body">
          <label><b>Marque abaixo caso você sinta algum desses sintomas</b></label>
          <RadioDiv
          v-for="simptom, index in simptoms"
          :key="`simptom_${index}`"
          :label="index"
          :selected="simptom"
          :radioId="`radio_simptom_${index}`"
          v-on:handleClick="simptoms[index] = !simptoms[index]"
          />
        </div>
        <div class="card-footer">

          <button class="btn btn-outline-secondary d-flex justify-content-between text-muted align-items-center" type="button" v-on:click="previousStep">
            <i class="fa fa-chevron-left text-muted"></i>
          </button>

          <button class="btn btn-primary d-flex justify-content-between  align-items-center w-100">
            Avançar
            <i class="fa fa-chevron-right ml-3"></i>
          </button>

        </div>
      </form>
    </div>

    <!-- Formulário de consumo -->
    <div  class="card card-custom shadow-sm mb-5" data-aos="fade-left" data-aos-delay="150" v-if="currentStep == 4">
      <form v-on:submit.prevent="nextStep">
        <div class="card-header p-6">
          <i class="fas fa-user-clock mr-3 h3 text-primary"></i>
          <b class="card-title text-primary h3">Como são seus hábitos?</b>
        </div>
        <div class="card-body">
          <p>Insira abaixo quantas vezes ao dia você consume esses alimentos.</p>
          <div class="form-group w-100" v-for="food, index in foods" :key="`food_${index}`">
            <label><b>{{index}}</b></label>
            <div class="input-group">
              <button type="button" class="btn btn-outline-secondary border-left-radius" v-on:click="foods[index] -= 1"><i class="fa fa-minus fa-sm text-muted p-0"></i></button>
              <input type="number" v-model="foods[index]" class="form-control" _required>
              <button type="button" class="btn btn-outline-secondary border-right-radius" v-on:click="foods[index] += 1"><i class="fa fa-plus fa-sm text-muted p-0"></i></button>
            </div>
          </div>
        </div>
        <div class="card-footer">

          <button class="btn btn-outline-secondary d-flex justify-content-between text-muted align-items-center" type="button" v-on:click="previousStep">
            <i class="fa fa-chevron-left text-muted"></i>
          </button>

          <button class="btn btn-primary d-flex justify-content-between  align-items-center w-100">
            Avançar
            <i class="fa fa-chevron-right ml-3"></i>
          </button>

        </div>
      </form>
    </div>

    <!-- Formulário de desconfortos -->
    <div  class="card card-custom shadow-sm mb-5" data-aos="fade-left" data-aos-delay="150" v-if="currentStep == 5">
      <form v-on:submit.prevent="nextStep">
        <div class="card-header p-6">
          <i class="fas fa-utensils mr-3 h-3 text-primary"></i>
          <b class="card-title text-primary h3">Como você se sente depois de comer?</b>
        </div>
        <div class="card-body">
          <label><b>Marque abaixo caso você sinta algum desses sintomas após as refeições</b></label>
          <RadioDiv
          v-for="mealSimptom, index in mealSimptoms"
          :key="`mealSimptom_${index}`"
          :label="index"
          :selected="mealSimptom"
          :radioId="`radio_mealSimptom_${index}`"
          v-on:handleClick="mealSimptoms[index] = !mealSimptoms[index]"
          />
        </div>
        <div class="card-footer">

          <button class="btn btn-outline-secondary d-flex justify-content-between text-muted align-items-center" type="button" v-on:click="previousStep">
            <i class="fa fa-chevron-left text-muted"></i>
          </button>

          <button class="btn btn-primary d-flex justify-content-between  align-items-center w-100">
            Avançar
            <i class="fa fa-chevron-right ml-3"></i>
          </button>

        </div>
      </form>
    </div>

    <!-- Formulário de fome -->
    <div  class="card card-custom shadow-sm mb-5" data-aos="fade-left" data-aos-delay="150" v-if="currentStep == 6">
      <form v-on:submit.prevent="nextStep">
        <div class="card-header p-6">
          <i class="fa fa-clock text-primary mr-3 h3"></i>
          <b class="card-title text-primary h3">Quando você costuma comer?</b>
        </div>
        <div class="card-body">
          <label><b>Marque os horários que você mais sente fome</b></label>
          <RadioDiv
          v-for="hour, index in hungryHours"
          :key="`hour_${index}`"
          :label="index"
          :selected="hour"
          :radioId="`radio_hour_${index}`"
          v-on:handleClick="hungryHours[index] = !hungryHours[index]"
          />
        </div>
        <div class="card-footer">

          <button class="btn btn-outline-secondary d-flex justify-content-between text-muted align-items-center" type="button" v-on:click="previousStep">
            <i class="fa fa-chevron-left text-muted"></i>
          </button>

          <button class="btn btn-primary d-flex justify-content-between  align-items-center w-100">
            Avançar
            <i class="fa fa-chevron-right ml-3"></i>
          </button>

        </div>
      </form>
    </div>

    <!-- Formulário final -->
    <div  class="card card-custom shadow-sm mb-5" data-aos="fade-left" data-aos-delay="150" v-if="currentStep > 6">
      <div class="card-body">
        <div class="container text-center mb-5">
          <h2 class="display-3 text-primary mb-5" data-aos="fade-up">Teste de Hábitos</h2>
          <!-- Done check -->
          <i v-if="done" class="fas fa-check display-3 text-primary mb-5" data-aos="zoom-in" data-aos-delay="100"></i>
          <!-- Subtitle -->
          <h5 class="" data-aos="fade-up" data-aos-delay="100" v-html="headerSubtitle"></h5>
        </div>
      </div>
      <div class="card-footer">

        <a href="https://www.saberemagrecer.com.br/" v-if="done" class="btn btn-primary h4 d-flex justify-content-center align-items-center" data-aos="zoom-in" data-aos-delay="150">
          Conheça o programa Saber Emagrecer
          <i class="fa fa-chevron-right ml-3"></i>
        </a>
      </div>
    </div>

    <Paginator ref="paginator" :pageCount="8" :currentPage="currentStep+2" data-aos="fade-left" data-aos-delay="200"/>

    <span class="bottom-0 text-center text-muted my-5 h4">Saber Emagrecer © 2021</span>
  </div>
</template>

<script>
import Paginator from './components/Paginator.vue'
import RadioDiv from './components/RadioDiv.vue'
import './assets/style.css'
import AOS from 'aos';

export default {
  name: 'App',
  data: () => (
    {
      name:               '',
      cellphone:          '',
      email:              '',
      age:                30,
      height:             1.65,
      weight:             85.00,
      sex:                '',
      desiredLoss:        10.00,
      biggestDifficulty:  '',
      biggestMotivation:  '',
      simptoms:           {
        'Alergias de repetição(rinite, sinusite)': false,
        'Dores articulares': false,
        'Dor de cabeça': false,
        'Desconfortos gastrointestinais': false,
        'Cólica menstrual': false,
        'Acne': false,
        'Unhas e cabelos fracos e quebradiços': false,
      },
      foods: {
        'Pão ou Torrada': 0,
        'Arroz ou Macarrão': 0,
        'Trigo ou Farinha': 0,
        'Fritura ou Óleo': 0,
        'Açúcar ou Mel': 0,
        'Doces em geral': 0
      },
      mealSimptoms: {
        'Inchaço': false,
        'Indigestão': false,
        'Cansaço': false,
        'Azia': false,
        'Fome': false,
        'Sono': false
      },
      hungryHours: {
        'Logo que acorda': false,
        'Entre o café e o almoço': false,
        'No almoço': false,
        'A tarde': false,
        'Na janta': false,
        'A noite': false
      },
      loading:            false,
      sending:            false,
      done:               false,
      currentStep:        -1,
    }
  ),
  components: {
    RadioDiv,
    Paginator
  },
  methods: {
    focusNextInput() {
      setTimeout(() => {
        let inputs = document.getElementsByTagName('input');
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
    nextStep() {
      this.currentStep += 1;
    },
    previousStep() {
      this.currentStep -= 1;
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
      if(newValue == 7){
        this.sending = true;
        this.loading = true;
        setTimeout(() => {
          this.sending = false;
          this.loading = false;
          this.done = true;
        }, 5000);
      }
    },
    weight(newValue) {
      console.log(newValue);
      this.weight = parseFloat(newValue).toFixed(2);
    },
    height(newValue) {
      console.log(newValue);
      this.height = parseFloat(newValue).toFixed(2);
    }
  },
  computed: {
    headerSubtitle() {
      return this.sending ?
      `Enviando os resultados para o seu e-mail...` :(
        this.done ? `Os resultados foram enviados para o e-mail <b>${this.email}</b>!<br> Que tal começar agora mesmo a melhorar esses aspectos?` :
        `Complete esse Quizz do <b>Saber Emagrecer</b> em apenas 3 minutos e <b>descubra porque você não emagrece!</b>`
      );
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
    .btn-primary {
      flex: 1;
      margin-left: 1rem;
    }
  }
  img {
    width: 175px;
    height: 175px;
    @media screen and (max-width: 768px) {
      width: 50%;
      height: 50%;
    }
  }
}
</style>
