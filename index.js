// Olá, mundo!
const mensagem = 'Olá, eu!'
//variavel global
{//variavel local
    const mensagem = 'Olá, mundo!'
    console.log(mensagem);
}//nesse caso vai aparecer primeiro o que está dentro das chaves, por que foi atribuido e chamado antes de chamar a variavel global que está fora das chaves


console.log(mensagem);
