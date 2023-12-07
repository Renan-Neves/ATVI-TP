import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class ListagemDependetes extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }
    processar(): void {
        console.clear()
        console.log('Iniciando a listagem dos clientes dependentes...')
        let titularFound = false
        while(!titularFound) {
            let titular = this.entrada.receberTexto('Qual o nome do titular?')
            this.clientes.forEach(cliente => {
                if(cliente.Nome == titular) {
                    for (let index = 0; index < cliente.Dependentes.length; index++) {
                        this.impressor = new ImpressaorCliente(cliente.Dependentes[index])
                        console.log(this.impressor.imprimir());
                    }
                    titularFound = true
                }
            })
        }
    }
}