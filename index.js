const start=() =>
{
    
    while(true){
        let opcao = 'cadastrar' //essa let opção está definindo para onde ele vai. Se eu colocar 'sair' ele vai para o case de sair e encerra o loop
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