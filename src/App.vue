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

    <!-- Formulário de introdução [email] ( passo -1 ) -->
    <FormCard
      v-on:previousStep="previousStep"
      v-on:nextStep="nextStep"
      v-if="currentStep == -1"
    >
      <template v-slot:header>
          <div class="container text-center mb-5">
            <img src="https://sbem-v2.s3.amazonaws.com/static/webportal/liamara/lia_256x256.webp" alt="Lia Trevisan" width="256px" height="256px" class="rounded-circle mb-3">
            <h2 class="display-3 text-primary mb-5" data-aos="fade-up">Teste de Hábitos</h2>
            <!-- Subtitle -->
            <h5 class="text-justify" data-aos="fade-up" data-aos-delay="100" v-html="headerSubtitle"></h5>
          </div>
      </template>
      <template v-slot:body>
          <div class="form-group w-100 mb-0">
            <label><b>E-mail:</b></label>
            <input type="email" v-model="email" placeholder="Seu melhor e-mail" class="form-control mb-3" required>
            <span class="mt-2 text-center text-primary">O resultado do teste será enviado para esse e-mail!</span>
          </div>
      </template>
      <template v-slot:footer>
          <button class="btn btn-primary d-flex justify-content-between align-items-center w-100">
            Começar o Teste
            <i class="fa fa-chevron-right ml-3"></i>
          </button>
      </template>
    </FormCard>

    <!-- Formulário identificação [nome, celular, sexo] ( passo 0 )-->
    <FormCard
      v-on:previousStep="previousStep"
      v-on:nextStep="nextStep"
      v-if="currentStep == 0"
      icon="fa fa-user"
      title="Quem é você"
    >
      <template v-slot:body>
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
      </template>
    </FormCard>

    <!-- Formulário identificação [idade, peso, altura] ( passo 1 )-->
    <FormCard
      v-on:previousStep="previousStep"
      v-on:nextStep="nextStep"
      v-if="currentStep == 1"
      icon="fa fa-user"
      title="Quem é você"
    >
      <template v-slot:body>
        <Incrementor
          label="Quantos anos você tem?"
          v-model="age"
          v-on:clickMinus="age -= 1"
          v-on:clickPlus="age += 1"
        />
        <Incrementor
          label="Qual seu peso atual?"
          v-model="weight"
          v-on:clickMinus="weight -= 1"
          v-on:clickPlus="weight = parseFloat(weight) + 1.0"
        />
        <Incrementor
          label="Qual a sua altura?"
          v-model="height"
          v-on:clickMinus="height -= 0.05"
          v-on:clickPlus="height = parseFloat(height) + 0.05"
        />
      </template>
    </FormCard>

    <!-- Formulário metas [quilos a perder, dificuldades, motivações] ( passo 2 )-->
    <FormCard
      v-on:previousStep="previousStep"
      v-on:nextStep="nextStep"
      v-if="currentStep == 2"
      icon="fa fa-user-check"
      title="O que você quer mudar?"
    >
      <template v-slot:body>
        <Incrementor
          label="Quantos quilos você gostaria de emagrecer?"
          v-model="desiredLoss"
          v-on:clickMinus="desiredLoss -= 1"
          v-on:clickPlus="desiredLoss += 1"
        />
        <div class="form-group w-100">
          <label><b>Qual sua maior dificuldade em emagrecer?</b></label>
          <textarea v-model="biggestDifficulty" class="form-control" _required/>
        </div>
        <div class="form-group w-100">
          <label><b>Qual sua maior motivação em emagrecer?</b></label>
          <textarea v-model="biggestMotivation" class="form-control" _required/>
        </div>
      </template>
    </FormCard>

    <!-- Formulário de sintomas [sintomas] ( passo 3 ) -->
    <FormCard
      v-on:previousStep="previousStep"
      v-on:nextStep="nextStep"
      v-if="currentStep == 3"
      icon="fas fa-street-view"
      title="Como você se sente?"
    >
      <template v-slot:body>
          <label><b>Marque abaixo caso você sinta algum desses sintomas</b></label>
          <RadioDiv
          v-for="simptom, index in simptoms"
          :key="`simptom_${index}`"
          :label="index"
          :selected="simptom"
          :radioId="`radio_simptom_${index}`"
          v-on:handleClick="simptoms[index] = !simptoms[index]"
          />
      </template>
    </FormCard>

    <!-- Formulário de hábitos [alimentos consumidos] ( passo 4 ) -->
    <FormCard
      v-on:previousStep="previousStep"
      v-on:nextStep="nextStep"
      v-if="currentStep == 4"
      icon="fas fa-street-view"
      title="Como são seus hábitos?"
    >
      <template v-slot:body>
          <p>Insira abaixo quantas vezes ao dia você consume esses alimentos.</p>
          <Incrementor
            :label="index"
            v-model="foods[index]"
            v-on:clickMinus="foods[index] -= 1"
            v-on:clickPlus="foods[index] += 1"
            v-for="food, index in foods"
            :key="`food_${index}`"
          />
      </template>
    </FormCard>

    <!-- Formulário de desconfortos [desconforto após refeição] ( passo 5 ) -->
    <FormCard
      v-on:previousStep="previousStep"
      v-on:nextStep="nextStep"
      v-if="currentStep == 5"
      icon="fas fa-utensils"
      title="Como você se sente depois de comer?"
    >
      <template v-slot:body>
        <label><b>Marque abaixo caso você sinta algum desses sintomas após as refeições</b></label>
        <RadioDiv
        v-for="mealSimptom, index in mealSimptoms"
        :key="`mealSimptom_${index}`"
        :label="index"
        :selected="mealSimptom"
        :radioId="`radio_mealSimptom_${index}`"
        v-on:handleClick="mealSimptoms[index] = !mealSimptoms[index]"
        />
      </template>
    </FormCard>

    <!-- Formulário de fome [horários com mais fome] ( passo 6 ) -->
    <FormCard
      v-on:previousStep="previousStep"
      v-on:nextStep="nextStep"
      v-if="currentStep == 6"
      icon="fa fa-clock"
      title="Quando você costuma comer?"
    >
      <template v-slot:body>
        <label><b>Marque os horários que você mais sente fome</b></label>
        <RadioDiv
        v-for="hour, index in hungryHours"
        :key="`hour_${index}`"
        :label="index"
        :selected="hour"
        :radioId="`radio_hour_${index}`"
        v-on:handleClick="hungryHours[index] = !hungryHours[index]"
        />
      </template>
    </FormCard>

    <!-- Formulário final [mensagem de envio/resultado] ( passo 7+ ) -->
    <FormCard
      v-on:previousStep="previousStep"
      v-on:nextStep="nextStep"
      v-if="currentStep > 6"
    >
      <template v-slot:header>
      </template>
      <template v-slot:body>
        <div class="container text-center mb-5">
          <h2 class="display-3 text-primary mb-5" data-aos="fade-up">Teste de Hábitos</h2>
          <!-- Done check -->
          <i v-if="done" class="fas fa-check display-3 text-primary mb-5" data-aos="zoom-in" data-aos-delay="100"></i>
          <!-- Subtitle -->
          <h5 class="" data-aos="fade-up" data-aos-delay="100" v-html="headerSubtitle"></h5>
        </div>
      </template>
      <template v-slot:footer>
        <a href="https://www.saberemagrecer.com.br/" class="btn btn-primary h4 d-flex justify-content-center align-items-center" data-aos="zoom-in" data-aos-delay="150">
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
import RadioDiv from './components/RadioDiv.vue';
import FormCard from './components/FormCard.vue';
import Incrementor from './components/Incrementor.vue';
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
    Paginator,
    FormCard,
    Incrementor
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
          console.log(this.$data);
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
    .btn-primary {
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
