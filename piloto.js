// Olá, mundo!
const mensagem = 'Olá, eu!'
//variavel global
{//variavel local
    const mensagem = 'Olá, mundo!'
    console.log(mensagem);
}//nesse caso vai aparecer primeiro o que está dentro das chaves, por que foi atribuido e chamado antes de chamar a variavel global que está fora das chaves


console.log(mensagem);


//arrays, objetos

/*let metas = ["Lucas", "alo"]

console.log(metas[0] + metas[1])
console.log(metas[1] + " " + metas[0])*/

// objeto

let meta = {
    value: 'Ler um livro todo mês',
    checked: true,
    /*log: (info) => {
        console.log(info)
    }*/
}

let metas = [
    meta,
    {
        value: "Caminhar 20 minutos todos os dias",
        checked: false,
    }
]

console.log(metas[1].value)
/*console.log(meta.value)
meta.value ="Não é mais ler um livro"
meta.log(meta.value)*/

//function // arrow function

//const criarMeta = () => {}
// function criarMeta () {}