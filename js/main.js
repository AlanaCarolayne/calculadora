class Calculadora {
  constructor(resultadoBtn, contaBtn) {
    this.resultadoBtn = resultadoBtn;
    this.contaBtn = contaBtn;
    this.limpa();
  }
  limpa() {
    this.conta = '';
    this.resultado = '';
    this.operacao = undefined;
  }
  deleta() {
    this.conta = this.conta.toString().slice(0, -1);
  }

  addNum(number) {
    if (number === '.' && this.conta.includes('.')) return
    this.conta = this.conta.toString() + number.toString();
  }
  operacaoEscolhida(operacao) {
    if (this.conta === '') return
    if (this.resultado !== '') {
      this.computa();
    }
    this.operacao = operacao;
    this.resultado = this.conta;
    this.conta = "";
  }
  computa() {
    let computar;
    const resul = parseFloat(this.resultado);
    const continha = parseFloat(this.conta);
    if (isNaN(resul) || isNaN(continha)) return;
    switch (this.operacao) {
      case "+":
        computar = resul + continha;
        break;
      case "-":
        computar = resul - continha;
        break;
      case "*":
        computar = resul * continha;
        break;
      case "/":
        computar = resul / continha;
        break;
      default:
        return;
    }
    this.conta = computar;
    this.operacao = undefined;
    this.resultado = "";
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }
  atualizaDisplay() {
    this.contaBtn.innerText = this.getDisplayNumber(this.conta);
    if (this.operacao != null) {
      this.resultadoBtn.innerText =     `${this.getDisplayNumber(this.resultado)} ${this.operacao}`
    }else {
      this.resultadoBtn.innerText = ''
  }
}
}
const numBtn = document.querySelectorAll('[data-number]');
const operacoesBtn = document.querySelectorAll('[data-operation]');
const igualBtn = document.querySelector('[data-equal]');
const resultadoBtn = document.querySelector('[data-resultado]');
const contaBtn = document.querySelector('[data-conta]');
const deletaBtn = document.querySelector('[data-delete]');
const limpaBtn = document.querySelector('[data-clear]');
const calculadora = new Calculadora(resultadoBtn, contaBtn);

numBtn.forEach((button) => {
  button.addEventListener('click', () => {
    calculadora.addNum(button.innerText);
    calculadora.atualizaDisplay();
  });
});
operacoesBtn.forEach((button) => {
  button.addEventListener('click', () => {
    calculadora.operacaoEscolhida(button.innerText);
    calculadora.atualizaDisplay();
  });
});
igualBtn.addEventListener('click', button => {
  calculadora.computa();
  calculadora.atualizaDisplay();
});
limpaBtn.addEventListener('click', button => {
  calculadora.limpa();
  calculadora.atualizaDisplay();
});
deletaBtn.addEventListener('click', button => {
  calculadora.deleta();
  calculadora.atualizaDisplay();
});
