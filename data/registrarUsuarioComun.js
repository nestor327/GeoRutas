
const agregandoUsuarioComun=async (usuarioComun)=>{

    //let datos=await fetch('https://georutas.somee.com/api/UsuariosComunes',{
    let datos=await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/UsuariosComunes',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(usuarioComun)
    })

    console.log("Registro de UsuarioComun exitoso");


}

export default agregandoUsuarioComun;