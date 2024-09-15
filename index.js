const { select, input } = require ('@inquirer/prompts') // buscando na pasta prompts as funções dentro de {}

const cadastrarMeta = async () => {
    const meta = await input ({ message: "Digite a meta: "})

    if(meta.length == 0){ //meta.length == 0 significa que a leitura da função meta mostrou que não tem nenhum texto ou está vazia
        console.log('A meta não pode ser vazia!')
        return // aqui encerra a condição
        // return cadastrarMeta() -- Isso poderia ser usado para que o usuário ficasse preso até digitar a meta e passar para próxima etapa

    }
}

const start= async () =>{
    
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
                    console.log("Vamos listar")
                    break
                case "sair":
                    return
            }
    
    }
}

start()