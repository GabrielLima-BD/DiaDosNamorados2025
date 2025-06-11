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
   "Te amar é a arte mais bonita que já criei",
  "Você é meu universo favorito, mesmo com tantas galáxias por aí",
  "Se eu fosse um bug, você seria o motivo pra não querer ser corrigido",
  "Seu sorriso tem o mesmo efeito de um refrão de reggae num dia de sol",
  "Amar você é tipo meme bom: sempre arranca um sorriso",
  "Você é meu poema favorito, mesmo sem rima nem métrica",
  "Cada segundo com você é como flutuar entre as estrelas",
  "Se eu fosse código, você seria meu ponto e vírgula",
  "Você me dá a paz de um pôr do sol com som de Marley ao fundo",
  "Você me deixa mais bobo que crush chamando de 'mozão'",
  "Você é como tinta espalhada num quadro caótico — fez tudo fazer sentido",
  "Nosso amor é como um eclipse: raro, intenso e lindo de ver",
  "Com você, até as falhas de sistema viram piada boa",
  "Seu olhar me acalma mais que refrão de reggae cantado baixinho",
  "Você me tira do sério e me coloca no riso, tudo ao mesmo tempo",
  "Seu amor é como pintura em aquarela: suave, mas cheio de cor",
  "Entre tantas estrelas, escolhi te amar na Terra",
  "Você reiniciou minha vida como um 'reset' cheio de paz",
  "Te amar é viver no compasso tranquilo de uma música roots",
  "Você é a legenda perfeita das minhas fotos mais bobas",
  "Você é obra de arte: não precisa entender, só sentir",
  "Te amar é tipo olhar o céu e achar a constelação mais bonita",
  "Você entrou no meu coração sem login nem senha",
  "Nosso amor tem o ritmo de um reggae bem tocado na laje",
  "Com você, até os dias nublados têm seu brilho",
  "Você me inspira como se fosse quadro inacabado e cheio de possibilidades",
  "Estar com você é como dançar no vácuo do universo: sem gravidade, mas com sentido",
  "Você é meu compilado de paz, zoeira e abraço apertado",
  "Seu amor é como reggae acústico: simples, direto e que toca fundo",
  "Te amar é viver com aquele friozinho bom de primeira aula de desenho",
  "Você é meu portal pro espaço sideral do carinho",
  "Se amor fosse código, o nosso teria 0 bugs",
  "Você é tipo batida de reggae: entra no peito e fica",
  "Você me faz rir até nas segundas-feiras mais pesadas",
  "Nosso amor é um quadro cheio de cores que só a gente entende",
  "Você é a gravidade que me mantém perto, mesmo quando tudo gira",
  "Amar você é mais fácil que encontrar erro de sintaxe no HTML",
  "Você é como refrão chiclete de reggae bom: grudou em mim",
  "Com você, até a fila da cantina vira passeio romântico",
  "Você me inspira como lápis num caderno em branco",
  "Estar ao seu lado é como observar o espaço — infinito e mágico",
  "Você é a função que meu coração nunca desativa",
  "Seu abraço tem cheiro de praia, sol e som tranquilo",
  "Você me dá aquele bug bom de quem se apaixonou do nada",
  "Você é meu rabisco mais bonito",
  "Nosso amor é como gravidade: invisível, mas presente o tempo todo",
  "Se fosse código, você seria meu import preferido",
  "Com você, minha alma dança em ritmo de reggae",
  "Você me deixa mais feliz que sair mais cedo da aula",
  "Você é meu verso torto que faz a poesia funcionar",
  "Amar você é como descobrir vida em outro planeta",
  "Você é o comando que executa minha paz",
  "Seu carinho é tipo batida leve de reggae ao pôr do sol",
  "Você é a piada interna que só eu entendo e nunca enjoa",
  "Você é meu desenho inacabado que não quero terminar nunca",
  "Seu sorriso é o brilho da estrela mais perto de mim",
  "Você tem a sintaxe perfeita pra compilar meu coração",
  "Com você, minha vibe é sempre good vibes",
  "Você faz meu coração gargalhar com qualquer bobagem",
  "Você é meu rabisco favorito entre todas as páginas",
  "Nosso amor é constelação desenhada a dedo",
  "Você é o print que salvei na memória e no coração",
  "Amar você é ouvir reggae no volume certo: alto e com o coração",
  "Você é o crush que não deu erro de conexão",
  "Com você, até a aula de história parece filme romântico",
  "Você é meu esboço mais sincero",
  "Te amar é mais gostoso que banho de chuva em dia quente",
  "Você é o planeta onde minha alma resolveu morar",
  "Você é meu breakpoint emocional: pausa, respira, ama",
  "Você é o refrão que não sai da cabeça",
  "Se amar fosse matéria, com você eu tirava 10",
  "Você é meu traço mais firme no meio do caos artístico da vida",
  "Seu amor é luz mesmo nas noites mais escuras",
  "Você entrou no meu sistema e virou usuário principal",
  "Com você, a vida toca em um reggae mais calmo",
  "Você é a piada ruim que me faz rir mais do que deveria",
  "Você é o pincel que deu vida ao meu mural",
  "Seu abraço é como galáxia quente: me aquece por dentro",
  "Você tem a lógica que equilibra meu coração",
  "Nosso amor é acústico, mas soa como orquestra",
  "Você é meu motivo pra acordar antes do despertador",
  "Você é a arte que meu caos interior precisava",
  "Seu amor é tipo gravidade zero: me faz flutuar",
  "Você é meu código-fonte de tranquilidade",
  "Seu amor toca em mim como reggae em fone bom",
  "Com você, até o trânsito parece trilha sonora",
  "Você é meu quadro mais sincero, mesmo com os borrões",
  "Você é a estrela que me guia quando tudo escurece",
  "Com você, nenhum erro é fatal, só aprendizado",
  "Você é a vibe boa que chega sem aviso",
  "Nosso amor é filme indie: bonito, estranho e inesquecível",
  "Você é a arte final da minha bagunça emocional",
  "Você é o universo onde eu sempre quero orbitar",
  "Você é meu código limpo e direto ao ponto",
  "Se a vida fosse uma música, você seria o refrão que repete até o fim",
  "Com você, até silêncio tem trilha sonora",
  "Você é o post-it mais colorido no mural da minha vida",
  "Te amar é tipo Wi-Fi forte: tudo flui melhor",
  "Você é meu rascunho que virou arte final",
  "Nosso amor é como céu estrelado: difícil de explicar, impossível de ignorar",
  "Você é a frase que faltava no meu roteiro",
  "Com você, tudo vira história boa pra contar",
  "Você é o sketch mais lindo do meu caderno",
  "Seu toque tem mais calma que sábado com reggae na varanda",
  "Você é meu universo particular e infinito",
  "Se a vida fosse um terminal, eu só digitava: ficar com você",
  "Você me ensina a amar até os rabiscos da vida",
  "Você é o fone de ouvido bom depois de um dia ruim",
  "Amar você é como desenhar no escuro e, no fim, ver que ficou lindo",
  "Você é minha playlist de paz e abraço",
  "Com você, até os bugs viram arte",
  "Você é tudo que eu não sabia que faltava",
  "Te amar é a coisa mais constante e maluca que já vivi",
  "Você é o último traço antes do quadro ficar completo",
  "Nosso amor é tipo arte de rua: verdadeiro, intenso e impossível de ignorar"
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
