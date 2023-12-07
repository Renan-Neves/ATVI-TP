import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Telefone from "../modelos/telefone";

export default class CadastrarTelefonesCliente extends Processo {
    private cliente: Cliente

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.execucao = true
    }

    processar(): void {
        console.log('Inciando o cadastro de telefones...')
        let res = ''
        while (this.execucao) {
            res = this.entrada.receberTexto('Tem algum telefone para cadastrar?(S/N)')
            switch(res){
                case "S":
                    let ddd = this.entrada.receberTexto('Qual a ddd?')
                    let numero = this.entrada.receberTexto('Qual o numero?')
                    let telefone = new Telefone(ddd,numero)
                    this.cliente.Telefones.push(telefone)
                    break;
                case "N":
                    this.execucao = false
                    break;
                default:
                    console.log('Opção não entendida :(')
            }
        }
    }
}