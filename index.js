const { select, input, checkbox } = require ('@inquirer/prompts') // buscando na pasta prompts as funções dentro de {}

let meta = {
    value: 'Tomar 3L de água por dia',
    checked: false,
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input ({ message: "Digite a meta: "})

    if(meta.length == 0){ //meta.length == 0 significa que a leitura da constante 'meta' mostrou que não tem nenhum texto ou está vazia
        console.log('A meta não pode ser vazia!')
        return // aqui encerra a condição
        // return cadastrarMeta() -- Isso poderia ser usado para que o usuário ficasse preso até digitar a meta e passar para próxima etapa

    }

    metas.push( //push é uma função! nesse caso vai colocar aqui dentro os objetos as metas criadas na "let metas"
        {value: meta, checked: false }
    )

}

const listarMetas = async () => {
    const respostas = await checkbox ({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e Enter para finalizar essa etapa",
        choices: [...metas],// aqui estamos fazendo uma cópia da let metas na linha 3, copiando todas as informações que entrarem em metas
        instructions: false,
    })

    if(respostas.length ==0){
        console.log("Nenhuma meta selecionada!")
        return

    }

    metas.forEach((m) => {
        m.checked = false
    })

    //forEach significa para cada resposta, ele vai tomar uma ação
    respostas.forEach((resposta) => {
        // metas.find a função find vai procurar em meta 
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        
        meta.checked = true
    })

    console.log('Meta(s) concluída(s)')
}

const metasRealizadas = async () => {
    // Toda Higher Order Function (HOF) recebe uma função, nesse caso vai ser no .filter, onde ele vai pegar uma meta (variavel meta) e vai realizar uma ação
    const realizadas = metas.filter((meta) => {// filter vai filtrar e substituir o array
        return meta.checked
        //sempre que o retorno for verdadeiro, ele vai pegar uma nova meta a adcionar a "realizadas"
    })

    if(realizadas.length ==0){
        console.log("Não existem metas realizadas!")
        return
    }

    await select({
        message: "Metas Realizadas "+ realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () =>{
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if (abertas.length == 0){
        console.log("Não existem metas abertas!")
        return
    }

    await select({
        message: "Metas Abertas " + abertas.length,//aqui ele mostra a quantidade de metas abertas com o "abertas.length"
        choices: [...abertas]
    })
}

const deletarMetas = async () =>{
    const metasDesmarcadas = metas.map((meta) =>{//map aqui serve para modificar o item original dentro do array. Nesse caso o 'meta'
        return { value: meta.value, checked: false}//checked:false vai desmarcar o que estiver marcado
    })

    const itemsADeletar = await checkbox({
        message: "Selecione item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if(itemsADeletar.length == 0){
        console.log("Não há nenhum item para deletar!")
        return
    }

    itemsADeletar.forEach((item) =>{ //O bloco itemsADeletar tem a função de verificar se a meta listada é verdadeira para ser deletada
        metas = metas.filter((meta) =>{ // Ex.: Se Tomar 3L de água for diferente de outro item da lista, o value vai ser alterado e a meta vai ser deletada. 
            return meta.value != item 
        })
    })

    console.log("Meta(s) deletada(s) com sucesso!")

}

const start = async () =>{
    
    while(true){
        //let opcao = 'cadastrar' //essa let opção está definindo para onde ele vai. Se eu colocar 'sair' ele vai para o case de sair e encerra o loop

        const opcao = await select ({ // await = aguardar e sempre que utilizar a função deve conter a expressão 'async'
            // o await vai aguardar o usuário selecionar um ação
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas Realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas Abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar Metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ] 
        }) 
        
            switch(opcao)
            {
                case "cadastrar":
                    await cadastrarMeta() //sempre usar await antes da função, quando ela for assíncrona
                    console.log("Vamos cadastrar")
                    break
                case "listar":
                    await listarMetas() 
                    console.log("Vamos listar")
                    break
                case "realizadas":
                    await metasRealizadas()
                    break
                case "abertas":
                    await metasAbertas()
                    break
                case "deletar":
                    await deletarMetas()
                    break
                case "sair":
                    console.log("Até a próxima!")
                    return
            }
    
    }
}

start()