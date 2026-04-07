class Calculadora {
    constructor(container){
        this.container = container;
        this.display = this.container.querySelector("#display");
        this.botoes = this.container.querySelectorAll(".botao");
        this.expressao = "";

        this.iniciar();
    }

    iniciar(){
        this.atualizarDisplay("0");
        this.configurarCliques();
        this.configurarTeclado();
    }

    atualizarDisplay(valor){
        this.display.value = valor || "0";
    }

    limpar(){
        this.expresao = "";
        this.atualizarDisplay("0");
    }

    configurarCliques(){
        this.botoes.forEach((botao) => {
            botao.addEventListener("click", (evento) => {
                const valor = evento.target.dataset.valor;

                if (valor){
                    this.tratarEntrada(valor);
                }
            });
        });
    }

    adicionarValor(valor) {
        if (this.display.value === "0" && valor !== "."){
            this.expressao = valor;
        } else {
            this.expressao += valor;
        }
        this.atualizarDisplay(this.expressao);
    }

    calcular(){
        try {
            const resultado = eval(this.expressao);

            if (resultado === undefined || isNaN(resultado)){
                this.atualizarDisplay("Erro");
                this.expressao = "";
                return;
            }

            this.expressao = String(resultado);
            this.atualizarDisplay(this.expressao);
        } catch (erro){
            this.atualizarDisplay("Erro");
            this.expressao = "";
        }
    }

    apagarUltimo(){
        this.expresao = this.expressao.slice(0, -1);
        this.atualizarDisplay(this.expressao);
    }

    tratarEntrada(valor){
        if (valor === "C") {
            this.limpar();
            return;
        }

        if (valor === "="){
            this.calcular();
            return;
        }
        
        this.adicionarValor(valor);
    }

    configurarTeclado(){
        document.addEventListener("keydown", (evento) => {
            const tecla = evento.key;

            if ((tecla >= "0" && tecla <= "9") || ["+", "-", "*", "/", "."].includes(tecla)){
                this.adicionarValor(tecla);
            } else  if (tecla === "Enter") {
                this.calcular();
            } else if (tecla === "Backspace"){
                this.apagarUltimo();
            } else if (tecla === "Escape") {
                this.limpar();
            }
        });
    }
}

const calculadora1 = new Calculadora(document.getElementById("calc1"));
const calculadora2 = new Calculadora(document.getElementById("calc2"));