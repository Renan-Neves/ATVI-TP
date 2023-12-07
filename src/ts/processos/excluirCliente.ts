import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";

export default class ExcluirCliente extends Processo {
    constructor() {
        super();
    }

    processar(): void {
        let armazem = Armazem.InstanciaUnica
        let clienteDeletado: Cliente[] = []
        let deletarCliente = this.entrada.receberTexto("Insira o nome do cliente a deletar")
        console.log('Inciando a exclusão...');
        armazem.Clientes.forEach((c) => {
            if(c.Nome != deletarCliente) {
                if(c.Titular != undefined) {
                    if(c.Titular.Nome != deletarCliente) {
                        clienteDeletado.push(c)
                    }
                } else {
                    clienteDeletado.push(c)
                }
            } else {
                if(c.Titular != undefined) {
                    let titular = c.Titular
                    armazem.Clientes.forEach((c2) => {
                        if(c2.Nome == titular.Nome) {
                            let newDependentes: Cliente[] = []
                            for (let index = 0; index < c2.Dependentes.length; index++) {
                                if(c2.Dependentes[index].Nome != c.Nome) {
                                    newDependentes.push(c2.Dependentes[index])
                                }
                            }
                            c2.setDependentes = newDependentes
                        }
                    })
                }
            }
        })
        armazem.Clientes = clienteDeletado
        console.log(`Exclusão do cliente terminada...`);
    }
}