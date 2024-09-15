const { select } = require ('@inquirer/prompts')

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