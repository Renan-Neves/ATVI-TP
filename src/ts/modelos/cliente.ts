import Acomodacao from "./acomodacao"
import Documento from "./documento"
import Endereco from "./endereco"
import Telefone from "./telefone"

export default class Cliente {
    private nome: string
    private nomeSocial: string
    private dataNascimento: Date
    private dataCadastro: Date
    private telefones: Telefone[] = []
    private endereco!: Endereco
    private documentos: Documento[] = []
    private dependentes: Cliente[] = []
    private titular!: Cliente
    private acomodacao!: Acomodacao

    constructor(nome: string, nomeSocial: string, dataNascimento: Date) {
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.dataNascimento = dataNascimento
        this.dataCadastro = new Date()
    }

    public get Nome() { return this.nome }
    public get NomeSocial() { return this.nomeSocial }
    public get DataNascimento() { return this.dataNascimento }
    public get DataCadastro() { return this.dataCadastro }
    public get Telefones() { return this.telefones }
    public get Endereco() { return this.endereco }
    public get Documentos() { return this.documentos }
    public get Dependentes() { return this.dependentes }
    public get Titular() { return this.titular }
    public get Acomodacao() { return this.acomodacao }

    public set setEndereco(endereco: Endereco) { this.endereco = endereco }
    public set setTelefones(telefones: Telefone[]) {this.telefones = telefones}
    public set setTitular(titular: Cliente) {this.titular = titular}
    public set setDependentes(dependentes: Cliente[]) {this.dependentes = dependentes}
    public set setAcomodacao(acomodacao: Acomodacao) { this.acomodacao = acomodacao }
}