import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";
import Telefone from "../modelos/telefone";

export default class CadastroDependenteClonar extends Processo {
    private cliente: Cliente

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        let titular = ''
        let titularFound = false
        let armazem = Armazem.InstanciaUnica
        while(!titularFound){
            titular = this.entrada.receberTexto('Qual o nome do titular?')
            armazem.Clientes.forEach((c) => {
                if(c.Nome == titular){
                    if(c.Titular == undefined) {
                        titularFound = true
                        this.cliente.setTitular = c
                        this.cliente.setEndereco = c.Endereco.clonar() as Endereco
                        this.cliente.setTelefones = c.Telefones.map(telefone => telefone.clonar()) as Telefone[]
                        this.cliente.setAcomodacao = c.Acomodacao
                        c.Dependentes.push(this.cliente)
                    } else {
                        console.log('Este cliente é um dependente - Reentre');
                    }
                }
            })
            if(!titularFound) console.log('Titular não encontrado - Reentre');
            
        }
    }

}