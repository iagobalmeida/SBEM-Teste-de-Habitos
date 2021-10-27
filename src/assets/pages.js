const pages = [
  {
    template: {
      header: `
        <div class="container text-center mb-5">
          <img src="https://sbem-v2.s3.amazonaws.com/static/webportal/liamara/lia_256x256.webp" alt="Lia Trevisan" width="256px" height="256px" class="rounded-circle mb-3">
          <h2 class="display-3 text-primary mb-5">Teste de Hábitos</h2>
          <!-- Subtitle -->
          <h5 class="text-justify">
            Complete esse Quizz do <b>Saber Emagrecer</b> em apenas 3 minutos e <b>descubra porque você não emagrece!</b>
          </h5>
        </div>
      `,
      footer: `
        <button class="btn btn-primary d-flex justify-content-between align-items-center w-100">
          Começar o Teste
          <i class="fa fa-chevron-right ml-3"></i>
        </button>
      `
    },
    inputs: [
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Seu melhor e-mail',
        help: 'O resultado do teste será enviado para esse e-mail!',
        required: true,
        value: ''
      },
    ] 
  },
  {
    title: 'Quem é você?',
    icon: 'fa fa-user',
    inputs: [
      {
        name: 'nome',
        label: 'Nome',
        type: 'text',
        placeholder: 'Seu nome completo',
        required: true,
        value: ''
      },
      {
        name: 'celular',
        label: 'Celular',
        type: 'tel',
        placeholder: 'Seu número do WhatsApp',
        required: true,
        value: ''
      },
      {
        name: 'sexo',
        label: 'Qual seu sexo de nascença?',
        type: 'radio',
        required: true,
        options: [
          'Masculino',
          'Feminino'
        ],
        value: ''
      }
    ]
  },
  {
    title: 'Quem é você?',
    icon: 'fa fa-user',
    inputs: [
      {
        name: 'idade',
        label: 'Quantos anos você tem?',
        type: 'number',
        required: true,
        value: 0
      },
      {
        name: 'peso',
        label: 'Qual seu peso atual?',
        type: 'number',
        required: true,
        value: 0
      },
      {
        name: 'altura',
        label: 'Qual sua altura?',
        type: 'number',
        required: true,
        value: 0
      }
    ]
  },
  {
    title: 'O que você quer mudar?',
    icon: 'fa fa-user-check',
    inputs: [
      {
        name: 'quilosEmagrecer',
        label: 'Quantos quilos você gostaria de emagrecer?',
        type: 'number',
        required: true,
        value: 0
      },
      {
        name: 'maiorDificuldade',
        label: 'Qual sua maior dificuldade em emagrecer?',
        type: 'textarea',
        required: true,
        value: ''
      },
      {
        name: 'maiorMotivacao',
        label: 'Qual sua maior motivação em emagrecer?',
        type: 'textarea',
        required: true,
        value: ''
      }
    ]
  },
  {
    title: 'Como você se sente?',
    icon: 'fas fa-street-view',
    inputs: [
      {
        name: 'sintomas',
        type: 'checkbox',
        label: 'Marque abaixo caso você sinta algum desses sintomas',
        value: {
          'Alergias de repetição(rinite, sinusite)': false,
          'Dores articulares': false,
          'Dor de cabeça': false,
          'Desconfortos gastrointestinais': false,
          'Cólica menstrual': false,
          'Acne': false,
          'Unhas e cabelos fracos e quebradiços': false,
        }
      }
    ]
  },
  {
    title: 'Como são seus hábitos?',
    icon: 'fas fa-street-view',
    inputs: [
      {
        name: 'alimentos',
        type: 'incrementorList',
        label: 'Insira abaixo quantas vezes ao dia você consome esses alimentos',
        value: {
          'Pão ou Torrada': 0,
          'Arroz ou Macarrão': 0,
          'Trigo ou Farinha': 0,
          'Fritura ou Óleo': 0,
          'Açúcar ou Mel': 0,
          'Doces em geral': 0
        }
      }
    ]
  },
  {
    title: 'Como você se sente depois de comer?',
    icon: 'fas fa-utensils',
    inputs: [
      {
        name: 'sintomas',
        type: 'checkbox',
        label: 'Marque abaixo caso você sinta algum desses sintomas após as refeições',
        value: {
          'Inchaço': false,
          'Indigestão': false,
          'Cansaço': false,
          'Azia': false,
          'Fome': false,
          'Sono': false
        }
      }
    ]
  },
  {
    title: 'Quando você costuma comer?',
    icon: 'fa fa-clock',
    inputs: [
      {
        name: 'horariosFome',
        type: 'checkbox',
        label: 'Marque os horários que você mais sente fome',
        required: true,
        value: {
          'Logo que acorda': false,
          'Entre o café e o almoço': false,
          'No almoço': false,
          'A tarde': false,
          'Na janta': false,
          'A noite': false
        }
      }
    ]
  }
];

module.exports = pages;