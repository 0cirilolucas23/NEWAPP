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
    // Toda HOF recebe uma função, nesse caso vai ser no .filter
    const realizadas = metas.filter((meta) => {
        return meta.checked
        //sempre que o retorno for verdadeiro, ele vai pegar uma nova meta a adcionar a "realizadas"
    })

    if(realizadas.length ==0){
        console.log("Não existem metas realizadas!")
        return
    }

    await select({
        message: "Metas Realizadas",
        choices: [...realizadas]
    })
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
                case "sair":
                    console.log("Até a próxima!")
                    return
            }
    
    }
}

start()