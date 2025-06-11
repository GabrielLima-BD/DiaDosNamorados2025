let stars = [];
let meteors = [];
let lastHeartTime = 0;
const heartDelay = 60;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '-1');

  for (let i = 0; i < 170; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 4),
      brightness: random(150, 250),
      twinkle: random() < 0.3,
      twinkleSpeed: random(0.02, 0.05),
      twinklePhase: random(TWO_PI),
      nextTwinkle: random(100, 500)
    });
  }

  let numMeteors = floor(random(2, 4));
  for (let i = 0; i < numMeteors; i++) {
    meteors.push(createMeteor(i, numMeteors));
  }
}

function draw() {
  let c1 = color(0, 0, 0);
  let c2 = color(26, 26, 64);
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }

  for (let star of stars) {
    if (star.twinkle) {
      star.nextTwinkle--;
      if (star.nextTwinkle <= 0) {
        let alpha = star.brightness + sin(frameCount * star.twinkleSpeed + star.twinklePhase) * 40;
        fill(255, 255, 255, alpha);
        star.nextTwinkle = random(100, 500);
      } else {
        fill(255, 255, 255, star.brightness);
      }
    } else {
      fill(255, 255, 255, star.brightness);
    }
    noStroke();
    ellipse(star.x, star.y, star.size, star.size);
  }

  for (let meteor of meteors) {
    meteor.x += meteor.speedX;
    meteor.y += meteor.speedY;
    let alpha = map(meteor.life, 0, meteor.maxLife, 0, 180);

    push();
    noStroke();
    fill(255, 255, 255, 200);
    ellipse(meteor.x, meteor.y, 5, 5);
    fill(255, 255, 255, 50);
    ellipse(meteor.x, meteor.y, 10, 10);
    pop();

    stroke(255, 255, 255, alpha);
    strokeWeight(1.5);
    line(meteor.x, meteor.y, meteor.x - meteor.speedX * 10, meteor.y - meteor.speedY * 10);

    meteor.life--;
    if (meteor.x < -50 || meteor.y > height + 50) {
      let index = meteors.indexOf(meteor);
      [meteors=index] = createMeteor(index, meteors.length);
    }
  }
}

function createMeteor(index, numMeteors) {
  let zoneWidth = width / numMeteors;
  let x = random(index * zoneWidth, (index + 1) * zoneWidth);
  let y = random(-10, 0);
  let speed = random(3, 6.5);

  let speedX = -speed * random(0.7, 0.9);
  let speedY = speed * random(0.7, 0.9);

  return {
    x: x,
    y: y,
    speedX: speedX,
    speedY: speedY,
    life: random(300, 500),
    maxLife: random(300, 500)
  };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  stars = [];
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 4),
      brightness: random(80, 180),
      twinkle: random() < 0.3,
      twinkleSpeed: random(0.02, 0.05),
      twinklePhase: random(TWO_PI),
      nextTwinkle: random(100, 500)
    });
  }
  meteors = [];
  let numMeteors = floor(random(2, 6));
  for (let i = 0; i < numMeteors; i++) {
    meteors.push(createMeteor(i, numMeteors));
  }
}

// MENSAGENS + ÁUDIO
const mensagens = [
  "Eu te amo mil milhões",
  "Te amar é a arte mais bonita que já criei",
  "Cada segundo ao seu lado se torna especial",
  "Você é meu universo favorito, mesmo com tantas galáxias por aí",
  "Movo mundo e montanhas por vc",
  "Se eu fosse um bug, você seria o motivo pra não querer ser corrigido",
  "Você ilumina meu universo com seu sorriso.",
  "Seu sorriso tem o mesmo efeito de um refrão de reggae num dia de sol",
  "Você é a minha estrela mais brilhante no céu da vida.",
  "Amar você é tipo meme bom: sempre arranca um sorriso",
  "Seu olhar tem o brilho das galáxias distantes.",
  "Você é meu poema favorito, mesmo sem rima nem métrica",
  "Você é o meu cometa raro que apareceu pra ficar.",
  "Cada segundo com você é como flutuar entre as estrelas",
  "Nosso amor é como o universo: em constante expansão.",
  "Se eu fosse código, você seria meu ponto e vírgula",
  "Seu abraço é meu planeta favorito.",
  "Você me dá a paz de um pôr do sol com som de Marley ao fundo",
  "Você é a gravidade que mantém meu mundo em equilíbrio.",
  "Você me deixa mais bobo que crush chamando de 'mozão'",
  "Estar com você é como flutuar entre estrelas.",
  "Você é como tinta espalhada num quadro caótico — fez tudo fazer sentido",
  "Você é a luz que guia minha nave pelo infinito.",
  "Nosso amor é como um eclipse: raro, intenso e lindo de ver",
  "Seu amor é o Big Bang do meu coração.",
  "Com você, até as falhas de sistema viram piada boa",
  "Cada beijo seu é uma estrela que nasce no meu peito.",
  "Seu olhar me acalma mais que refrão de reggae cantado baixinho",
  "Você é o eclipse perfeito no meu céu.",
  "Você me tira do sério e me coloca no riso, tudo ao mesmo tempo",
  "Nosso amor brilha mais forte que qualquer supernova.",
  "Seu amor é como pintura em aquarela: suave, mas cheio de cor",
  "Seu toque é como poeira de estrela na minha pele.",
  "Entre tantas estrelas, escolhi te amar na Terra",
  "Você é a minha constelação favorita.",
  "Você reiniciou minha vida como um 'reset' cheio de paz",
  "Com você, cada segundo vira eternidade no cosmos.",
  "Te amar é viver no compasso tranquilo de uma música roots",
  "Você é o centro do meu sistema solar.",
  "Você é a legenda perfeita das minhas fotos mais bobas",
  "Seu sorriso tem o poder de criar galáxias em mim.",
  "Você é obra de arte: não precisa entender, só sentir",
  "Entre bilhões de estrelas, escolhi você.",
  "Te amar é tipo olhar o céu e achar a constelação mais bonita",
  "Você é meu universo paralelo favorito.",
  "Você entrou no meu coração sem login nem senha",
  "Em você encontrei o infinito.",
  "Nosso amor tem o ritmo de um reggae bem tocado na laje",
  "Nosso amor é como uma estrela cadente: mágico e raro.",
  "Com você, até os dias nublados têm seu brilho",
  "Você faz o meu coração orbitar mais rápido.",
  "Você me inspira como se fosse quadro inacabado e cheio de possibilidades",
  "Com você, até o silêncio tem som de estrelas.",
  "Estar com você é como dançar no vácuo do universo: sem gravidade, mas com sentido",
  "Você é meu destino traçado nas estrelas.",
  "Você é meu compilado de paz, zoeira e abraço apertado",
  "Seu amor é meu norte mesmo em noites sem lua.",
  "Seu amor é como reggae acústico: simples, direto e que toca fundo",
  "Minha vida ganhou brilho desde que você chegou.",
  "Te amar é viver com aquele friozinho bom de primeira aula de desenho",
  "Você é o céu estrelado que eu sempre desejei contemplar.",
  "Você é meu portal pro espaço sideral do carinho",
  "Você chegou e virou minha vida do avesso — do melhor jeito.",
  "Se amor fosse código, o nosso teria 0 bugs",
  "Meu sorriso te procura até quando eu não percebo.",
  "Você é tipo batida de reggae: entra no peito e fica",
  "Você é o carinho que meu coração esperou por tanto tempo.",
  "Você me faz rir até nas segundas-feiras mais pesadas",
  "Seu jeito de amar é a calmaria que faltava em mim.",
  "Nosso amor é um quadro cheio de cores que só a gente entende",
  "Com você, até os dias ruins têm cheiro de esperança.",
  "Você é a gravidade que me mantém perto, mesmo quando tudo gira",
  "Eu te escolheria mil vezes, sem pensar duas vezes.",
  "Amar você é mais fácil que encontrar erro de sintaxe no HTML",
  "Cada toque seu me mostra que o amor mora aqui.",
  "Você é como refrão chiclete de reggae bom: grudou em mim",
  "Você é a calma no caos da minha vida.",
  "Com você, até a fila da cantina vira passeio romântico",
  "Nosso amor é leve, sincero e cheio de verdade.",
  "Você me inspira como lápis num caderno em branco",
  "Você é o riso mais bonito dos meus dias.",
  "Estar ao seu lado é como observar o espaço — infinito e mágico",
  "Seu amor me dá asas e raízes ao mesmo tempo.",
  "Você é a função que meu coração nunca desativa",
  "Eu sou feliz só por saber que você existe.",
  "Seu abraço tem cheiro de praia, sol e som tranquilo",
  "Você é a paz que meu coração sempre procurou.",
  "Você me dá aquele bug bom de quem se apaixonou do nada",
  "Quando você sorri, o mundo para por um segundo.",
  "Você é meu rabisco mais bonito",
  "Você chegou e trouxe sentido pra tudo.",
  "Nosso amor é como gravidade: invisível, mas presente o tempo todo",
  "Seu nome combina com a palavra amor.",
  "Se fosse código, você seria meu import preferido",
  "Meu futuro favorito é qualquer um com você dentro.",
  "Com você, minha alma dança em ritmo de reggae",
  "Você me entende até no silêncio.",
  "Você faz meu coração gargalhar com qualquer bobagem",
  "Seu toque acalma minhas tempestades.",
  "Você é meu desenho inacabado que não quero terminar nunca",
  "Ficar com você é meu plano favorito.",
  "Seu sorriso é o brilho da estrela mais perto de mim",
  "Você é meu canto seguro neste mundo louco.",
  "Você tem a sintaxe perfeita pra compilar meu coração",
  "Nos seus olhos, encontrei um novo lar.",
  "Com você, minha vibe é sempre good vibes",
  "Você é meu presente mais bonito da vida.",
  "Você faz meu coração gargalhar com qualquer bobagem",
  "Seu cheiro ficou na minha alma.",
  "Você é meu verso torto que faz a poesia funcionar",
  "Não preciso de muito, só você aqui comigo.",
  "Amar você é como descobrir vida em outro planeta",
  "Com você, até o tempo desacelera.",
  "Você é o comando que executa minha paz",
  "Você é o ‘pra sempre’ que eu quero escrever todos os dias.",
  "Seu carinho é tipo batida leve de reggae ao pôr do sol",
  "Meu coração sorri quando te vê.",
  "Você é a piada interna que só eu entendo e nunca enjoa",
  "Você vale cada suspiro, cada pensamento, cada sonho.",
  "Você é meu rabisco favorito entre todas as páginas",
  "Se o amor tem forma, ele se parece com você.",
  "Nosso amor é constelação desenhada a dedo",
  "Seu amor é o lugar onde eu encontro paz.",
  "Você é o print que salvei na memória e no coração",
  "Você transforma qualquer dia comum em algo especial.",
  "Amar você é ouvir reggae no volume certo: alto e com o coração",
  "Seu sorriso é meu refúgio preferido.",
  "Você é o crush que não deu erro de conexão",
  "Te amar é a parte mais bonita da minha rotina.",
  "Com você, até a aula de história parece filme romântico",
  "Seu abraço é o melhor lugar do mundo.",
  "Você é meu esboço mais sincero",
  "Com você, até o silêncio é confortável.",
  "Te amar é mais gostoso que banho de chuva em dia quente",
  "Meu coração escolheu você e não quer mais voltar atrás.",
  "Você é o planeta onde minha alma resolveu morar",
  "Você é o meu sonho mais real.",
  "Você é meu breakpoint emocional: pausa, respira, ama",
  "Te encontrar foi como achar um lar dentro de alguém.",
  "Você é o refrão que não sai da cabeça",
  "Você me ensina todos os dias o que é amar de verdade.",
  "Se amar fosse matéria, com você eu tirava 10",
  "Meu mundo é mais bonito desde que você chegou.",
  "Você é meu traço mais firme no meio do caos artístico da vida",
  "Você é a melhor parte de mim.",
  "Seu amor é luz mesmo nas noites mais escuras",
  "Amar você é leve como o vento e forte como o tempo.",
  "Você entrou no meu sistema e virou usuário principal",
  "Cada detalhe seu me faz te amar ainda mais.",
  "Com você, a vida toca em um reggae mais calmo",
  "Você é meu pensamento bom do dia todo.",
  "Você é a piada ruim que me faz rir mesmo assim",
  "Te amar é fácil, viver sem você seria impossível.",
  "Você é o bug que eu nunca quero consertar",
  "Você é o sorriso que meu coração procura.",
  "Nosso amor é arte de rua: livre, lindo e cheio de cor",
  "Com você, tudo tem mais cor e mais sentido.",
  "Você é o código-fonte do meu coração",
  "Você é a resposta mais bonita que a vida me deu.",
  "Você é o traço firme em meio às linhas tortas da vida",
  "Meu coração te reconheceu antes mesmo dos meus olhos.",
  "Você é o filtro solar do meu caos emocional",
  "Você é poesia em forma de gente.",
  "Você é a vibe que toca fundo e não cansa",
  "Seu amor é meu abrigo em qualquer tempestade.",
  "Você é o plugin que faltava pra minha felicidade funcionar",
  "Você me completa de um jeito que eu nem sabia que faltava.",
  "Você é tipo playlist boa: não enjoo nunca",
  "Meu melhor lugar sempre vai ser ao seu lado.",
  "Você é o ponto de exclamação dos meus dias",
  "Você faz meu coração bater no compasso certo.",
  "Você é meu sketch favorito do caderno inteiro",
  "Te amar é a minha parte favorita de viver.",
  "Você é como cor que não sai mesmo depois de lavar",
  "Você me faz querer ser melhor todos os dias.",
  "Você é meu bug mais fofo",
  "Meu dia só começa de verdade quando penso em você.",
  "Você é a arte que me inspira até nos dias cinzas",
  "Você é o amor que eu sempre sonhei, acordado.",
  "Você é meu motivo de continuar tentando todos os dias"
];

// Mostrar frase aleatória ao carregar
window.addEventListener('DOMContentLoaded', () => {
  const mensagemInicial = mensagens[Math.floor(Math.random() * mensagens.length)];
  document.getElementById('mensagem-texto').textContent = mensagemInicial;

  // Iniciar o relógio assim que a página carregar
  atualizarRelogio();
  setInterval(atualizarRelogio, 1000);
});

// Trocar mensagem ao clicar
document.getElementById('mudar-mensagem').addEventListener('click', function () {
  const mensagemAtual = document.getElementById('mensagem-texto').textContent;
  let novaMensagem = mensagemAtual;
  while (novaMensagem === mensagemAtual) {
    novaMensagem = mensagens[Math.floor(Math.random() * mensagens.length)];
  }
  document.getElementById('mensagem-texto').textContent = novaMensagem;
});

// Música nos cartões
const player = document.getElementById('player');
const cards = document.querySelectorAll('.card');
let currentCard = null;

cards.forEach(card => {
  card.addEventListener('click', () => {
    if (currentCard === card && !player.paused) {
      player.pause();
      card.classList.remove('active');
      currentCard = null;
    } else {
      player.pause();
      player.currentTime = 0;
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      player.src = card.dataset.music;
      player.play().catch(error => console.log('Erro ao tocar:', error));
      currentCard = card;
    }
  });
});

// Relógio do namoro
function atualizarRelogio() {
  const inicioNamoro = new Date('2023-09-08T00:00:00-03:00'); // Início do namoro com fuso horário -03:00
  const agora = new Date(); // Data e hora atual

  // Calcular diferença em milissegundos
  const diferenca = agora.getTime() - inicioNamoro.getTime();

  // Calcular unidades de tempo
  const segundosTotais = Math.floor(diferenca / 1000);
  const anos = Math.floor(segundosTotais / (365.25 * 24 * 60 * 60));
  const restoAnos = segundosTotais % (365.25 * 24 * 60 * 60);
  const meses = Math.floor(restoAnos / (30.42 * 24 * 60 * 60));
  const restoMeses = restoAnos % (30.42 * 24 * 60 * 60);
  const dias = Math.floor(restoMeses / (24 * 60 * 60));
  const restoDias = restoMeses % (24 * 60 * 60);
  const horas = Math.floor(restoDias / (60 * 60));
  const restoHoras = restoDias % (60 * 60);
  const minutos = Math.floor(restoHoras / 60);
  const segundos = restoHoras % 60;

  // Atualizar os elementos HTML
  try {
    document.getElementById('anos').textContent = anos;
    document.getElementById('meses').textContent = meses;
    document.getElementById('dias').textContent = dias;
    document.getElementById('horas').textContent = horas;
    document.getElementById('minutos').textContent = minutos;
    document.getElementById('segundos').textContent = segundos;
  } catch (error) {
    console.error('Erro ao atualizar o relógio:', error);
  }
}
