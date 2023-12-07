import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";
import Telefone from "../modelos/telefone";
import Armazem from "./armazem";
import Entrada from "./entrada";

let armazem = Armazem.InstanciaUnica
let dpergunta = "Possui algum dependente(S/N)"
let entrada = new Entrada()
let running = true
var res = ""
var sn = ""

console.log("Bem vindo");
while(running){
    console.log("-------------------------------");
    console.log("1 - Cadastrar cliente");
    console.log("0 - Sair");
    
    res = entrada.receberTexto("Insira uma ação: ")
    switch(res){
        case "1":
            let cliente = new Cliente()
            cliente.nome = entrada.receberTexto("Insira o nome")
            cliente.nomeSocial = entrada.receberTexto("Insira o nome social(opcional)")
            cliente.dataCadastro = entrada.receberData("Insira a data do cadastro")
            cliente.dataNascimento = entrada.receberData("Insira a data do nascimento")
            let endereco = new Endereco()
            endereco.rua = entrada.receberTexto("Insira sua rua")
            endereco.bairro = entrada.receberTexto("Insira seu bairro")
            endereco.cidade = entrada.receberTexto("Insira sua cidade")
            endereco.estado = entrada.receberTexto("Insira seu estado")
            endereco.pais = entrada.receberTexto("Insira seu pais")
            endereco.codigoPostal = entrada.receberTexto("Insira seu codigo postal")
            cliente.endereco = endereco
            sn = "S"
            dpergunta = "Possui algum dependente(S/N)"
            while(sn == "S"){
                sn = entrada.receberTexto(dpergunta)
                if(sn == "S") {
                    let dependente = new Cliente()
                    dependente.nome = entrada.receberTexto("Insira o nome")
                    dependente.nomeSocial = entrada.receberTexto("Insira o nome social(opcional)")
                    dependente.dataCadastro = entrada.receberData("Insira a data do cadastro")
                    dependente.dataNascimento = entrada.receberData("Insira a data do nascimento")
                    dependente.endereco = cliente.endereco.clonar() as Endereco
                    dependente.titular = cliente
                    cliente.dependentes.push(dependente)
                    dpergunta = "Possui mais algum dependente(S/N)"
                } else if(sn != "N") {
                    sn = "N"
                } else {
                    console.log("Resposta não compreendida - Reentre");
                    sn = "S"
                }
            }
            sn = "S"
            dpergunta = "Possui algum telefone(S/N)"
            while(sn == "S"){
                sn = entrada.receberTexto(dpergunta)
                if(sn == "S") {
                    let telefone = new Telefone()
                    telefone.ddd = entrada.receberTexto("Insira o ddd")
                    telefone.numero = entrada.receberTexto("Insira o numero")
                    cliente.telefones.push(telefone)
                    dpergunta = "Possui mais algum telefone(S/N)"
                } else if(sn != "N") {
                    sn = "N"
                } else {
                    console.log("Resposta não compreendida - Reentre");
                    sn = "S"
                }
            }
            armazem.Clientes.push(cliente)
            break;
        case "0":
            console.log("Adeus");
            running = false
            break;
        default:
            console.log("Ação não encontrada - Reentre");
            break;
    }
}