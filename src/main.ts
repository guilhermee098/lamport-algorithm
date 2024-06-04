class relogioLamport {
  private relogio: number;

  constructor() {
    this.relogio = 0; // inicia o relogio em 0
  }

  tique() {
    this.relogio++; // só adiciona 1 ao relogio
  }

  // envia uma mensagem
  enviar() {
    this.tique(); // incrementa antes de enviar
    return this.relogio;
  }

  // recebe uma mensagem
  receber(timestampRecebido: number) {
    // ajusta o relogio pra ser o maior entre o atual e o recebido
    this.relogio = Math.max(this.relogio, timestampRecebido) + 1;
  }

  // obtem o valor atual do relogio logico
  pegaTempo() {
    return this.relogio; // só retorna o valor atual do relogio
  }
}

const processoA = new relogioLamport(); // cria um relogio pro A
const processoB = new relogioLamport(); // cria um relogio para o B

console.log("Relogios iniciais:");
console.log("Relogio do processo A:", processoA.pegaTempo());
console.log("Relogio do processo B:", processoB.pegaTempo());

// evento interno no processo A
processoA.tique();
console.log(
  "Relogio do processo A apos evento interno:",
  processoA.pegaTempo()
);

const timestampMensagem = processoA.enviar();
console.log("Processo A envia mensagem com timestamp:", timestampMensagem);

// processo B recebe a mensagem do processo A
processoB.receber(timestampMensagem);
console.log(
  "Relogio do processo B apos receber mensagem:",
  processoB.pegaTempo()
);

// evento interno no processo B
processoB.tique();
console.log(
  "Relogio do processo B apos evento interno:",
  processoB.pegaTempo()
);
