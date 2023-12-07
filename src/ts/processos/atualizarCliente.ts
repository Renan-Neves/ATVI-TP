import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastrarTelefonesCliente from "./cadastrarTelefonesCliente";
import CadastrarDocumentosCliente from "./cadastroDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";

export default class AtualizarCliente extends Processo {
    processar(): void {
        let listaAtualizada: Cliente[] = []
        let clienteAtualizar = this.entrada.receberTexto('Qual o nome do cliente a atualizar')
        let armazem = Armazem.InstanciaUnica
        armazem.Clientes.forEach((c) => {
            if(c.Nome == clienteAtualizar) {
                console.log('Iniciando a atualização de um cliente...')
                let nome = this.entrada.receberTexto('Qual o novo nome do cliente?')
                let nomeSocial = this.entrada.receberTexto('Qual o novo nome social do cliente?')
                let dataNascimento = this.entrada.receberData('Qual a data de nascimento?')
                let cliente = new Cliente(nome, nomeSocial, dataNascimento)
        
                this.processo = new CadastroEnderecoTitular(cliente)
                this.processo.processar()
        
                this.processo = new CadastrarTelefonesCliente(cliente)
                this.processo.processar()
        
                this.processo = new CadastrarDocumentosCliente(cliente)
                this.processo.processar()

                cliente.setDependentes = c.Dependentes

                listaAtualizada.push(cliente)
        
                console.log('Finalizando a atualização do cliente...')    
            } else {
                listaAtualizada.push(c)
            }
        })
        armazem.Clientes = listaAtualizada
    }
}