let stars = [];
let meteors = [];
let lastHeartTime = 0;
const heartDelay = 60; // Delay para rastro contínuo

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '-1');

  // Criar estrelas estagnadas (150), algumas piscando aleatoriamente
  for (let i = 0; i < 170; i++) {
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

  // Criar 2-4 meteoros
  let numMeteors = floor(random(2, 4));
  for (let i = 0; i < numMeteors; i++) {
    meteors.push(createMeteor(i, numMeteors));
  }
}

function draw() {
  // Degradê preto (#000) para azul escuro (#1a1a40)
  let c1 = color(0, 0, 0);
  let c2 = color(26, 26, 64);
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }

  // Desenhar estrelas com piscar aleatório
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

  // Desenhar meteoros em diagonal
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
    // Remover meteoro apenas quando sair pela esquerda ou pelo fundo da tela
    if (meteor.x < -50 || meteor.y > height + 50) {
      let index = meteors.indexOf(meteor);
      meteors[index] = createMeteor(index, meteors.length);
    }
  }
}

function createMeteor(index, numMeteors) {
  // Dividir a borda superior em zonas para os meteoros
  let zoneWidth = width / numMeteors;
  let x = random(index * zoneWidth, (index + 1) * zoneWidth); // Posição x na zona
  let y = random(-10, 0); // Sempre na parte superior
  let speed = random(3, 6.5);
  
  let speedX = -speed * random(0.7, 0.9); // Sempre para a esquerda
  let speedY = speed * random(0.7, 0.9); // Sempre para baixo

  return {
    x: x,
    y: y,
    speedX: speedX,
    speedY: speedY,
    life: random(300, 500), // Vida útil aumentada para atravessar a tela
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

// Botão de mensagens
document.getElementById('mudar-mensagem').addEventListener('click', function() {
  const mensagens = [
    "Você é a minha estrela mais brilhante. Feliz Dia dos Namorados!",
    "Cada momento com você é uma constelação de amor.",
    "Te amo até a lua e além, meu amor!",
    "Você ilumina meu universo com seu sorriso.",
    "Você é a minha estrela mais brilhante no céu da vida.",
    "Seu olhar tem o brilho das galáxias distantes.",
    "Você é o meu cometa raro que apareceu pra ficar.",
    "Nosso amor é como o universo: em constante expansão.",
    "Seu abraço é meu planeta favorito.",
    "Você é a gravidade que mantém meu mundo em equilíbrio.",
    "Estar com você é como flutuar entre estrelas.",
    "Você é a luz que guia minha nave pelo infinito.",
    "Seu amor é o Big Bang do meu coração.",
    "Cada beijo seu é uma estrela que nasce no meu peito.",
    "Você é o eclipse perfeito no meu céu.",
    "Nosso amor brilha mais forte que qualquer supernova.",
    "Seu toque é como poeira de estrela na minha pele.",
    "Você é a minha constelação favorita.",
    "Com você, cada segundo vira eternidade no cosmos.",
    "Você é o centro do meu sistema solar.",
    "Seu sorriso tem o poder de criar galáxias em mim.",
    "Entre bilhões de estrelas, escolhi você.",
    "Você é meu universo paralelo favorito.",
    "Em você encontrei o infinito.",
    "Nosso amor é como uma estrela cadente: mágico e raro.",
    "Você faz o meu coração orbitar mais rápido.",
    "Com você, até o silêncio tem som de estrelas.",
    "Você é meu destino traçado nas estrelas.",
    "Seu amor é meu norte mesmo em noites sem lua.",
    "Minha vida ganhou brilho desde que você chegou.",
    "Você é o céu estrelado que eu sempre desejei contemplar.",
    "Você chegou e virou minha vida do avesso — do melhor jeito.",
    "Meu sorriso te procura até quando eu não percebo.",
    "Você é o carinho que meu coração esperou por tanto tempo.",
    "Seu jeito de amar é a calmaria que faltava em mim.",
    "Com você, até os dias ruins têm cheiro de esperança.",
    "Eu te escolheria mil vezes, sem pensar duas vezes.",
    "Cada toque seu me mostra que o amor mora aqui.",
    "Você é a calma no caos da minha vida.",
    "Nosso amor é leve, sincero e cheio de verdade.",
    "Você é o riso mais bonito dos meus dias.",
    "Seu amor me dá asas e raízes ao mesmo tempo.",
    "Eu sou feliz só por saber que você existe.",
    "Você é a paz que meu coração sempre procurou.",
    "Quando você sorri, o mundo para por um segundo.",
    "Você chegou e trouxe sentido pra tudo.",
    "Seu nome combina com a palavra amor.",
    "Meu futuro favorito é qualquer um com você dentro.",
    "Você me entende até no silêncio.",
    "Seu toque acalma minhas tempestades.",
    "Ficar com você é meu plano favorito.",
    "Você é meu canto seguro neste mundo louco.",
    "Nos seus olhos, encontrei um novo lar.",
    "Você é meu presente mais bonito da vida.",
    "Seu cheiro ficou na minha alma.",
    "Não preciso de muito, só você aqui comigo.",
    "Com você, até o tempo desacelera.",
    "Você é o ‘pra sempre’ que eu quero escrever todos os dias.",
    "Meu coração sorri quando te vê.",
    "Você vale cada suspiro, cada pensamento, cada sonho.",
    "Se o amor tem forma, ele se parece com você.",
    "Seu amor é o lugar onde eu encontro paz.",
    "Você transforma qualquer dia comum em algo especial.",
    "Seu sorriso é meu refúgio preferido.",
    "Te amar é a parte mais bonita da minha rotina.",
    "Seu abraço é o melhor lugar do mundo.",
    "Com você, até o silêncio é confortável.",
    "Meu coração escolheu você e não quer mais voltar atrás.",
    "Você é o meu sonho mais real.",
    "Te encontrar foi como achar um lar dentro de alguém.",
    "Você me ensina todos os dias o que é amar de verdade.",
    "Meu mundo é mais bonito desde que você chegou.",
    "Você é a melhor parte de mim.",
    "Amar você é leve como o vento e forte como o tempo.",
    "Cada detalhe seu me faz te amar ainda mais.",
    "Você é meu pensamento bom do dia todo.",
    "Te amar é fácil, viver sem você seria impossível.",
    "Você é o sorriso que meu coração procura.",
    "Com você, tudo tem mais cor e mais sentido.",
    "Você é a resposta mais bonita que a vida me deu.",
    "Meu coração te reconheceu antes mesmo dos meus olhos.",
    "Você é poesia em forma de gente.",
    "Seu amor é meu abrigo em qualquer tempestade.",
    "Você me completa de um jeito que eu nem sabia que faltava.",
    "Meu melhor lugar sempre vai ser ao seu lado.",
    "Você faz meu coração bater no compasso certo.",
    "Te amar é a minha parte favorita de viver.",
    "Você me faz querer ser melhor todos os dias.",
    "Meu dia só começa de verdade quando penso em você.",
    "Você é o amor que eu sempre sonhei, acordado."
  ];
  const mensagemAtual = document.getElementById('mensagem-texto').textContent;
  let novaMensagem = mensagemAtual;
  while (novaMensagem === mensagemAtual) {
    novaMensagem = mensagens[Math.floor(Math.random() * mensagens.length)];
  }
  document.getElementById('mensagem-texto').textContent = novaMensagem;
});

// Áudio para os cartões
const player = document.getElementById('player');
const cards = document.querySelectorAll('.card');
let currentCard = null;

cards.forEach(card => {
  card.addEventListener('click', () => {
    if (currentCard === card && !player.paused) {
      // Se o mesmo cartão for clicado e a música estiver tocando, pausar
      player.pause();
      card.classList.remove('active');
      currentCard = null;
    } else {
      // Parar música atual, se houver
      player.pause();
      player.currentTime = 0;
      // Remover classe active de outros cartões
      cards.forEach(c => c.classList.remove('active'));
      // Configurar e tocar nova música
      card.classList.add('active');
      player.src = card.dataset.music;
      player.play().catch(error => console.log('Erro ao tocar:', error));
      currentCard = card;
    }
  });
});
