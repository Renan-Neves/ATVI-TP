import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import ImpressaorCliente from "../impressores/impressorCliente";
import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class ListagemTitular extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }
    processar(): void {
        console.clear()
        console.log('Iniciando a listagem do cliente titular...')
        let dependenteFound = false
        while(!dependenteFound){
            let dependente = this.entrada.receberTexto('Qual o nome do dependente?')
            this.clientes.forEach(cliente => {
                if (cliente.Nome == dependente && cliente.Titular != undefined) {
                    this.impressor = new ImpressaorCliente(cliente.Titular)
                    console.log(this.impressor.imprimir())
                    dependenteFound = true
                }
            })
        }
    }
}