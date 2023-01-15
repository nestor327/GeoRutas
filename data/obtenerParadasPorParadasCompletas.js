

import { useQuery,queryKey } from "react-query";


const obtenerParadasPorParadasCompletas=()=>{

    const {data,error,isLoading}=useQuery(['obtenerParadasConDireccionCompletas'],async({queryKey})=>{
        //return await fetch('https://georutas.somee.com/api/Paradas').then(res=>datos=res.json())
        return await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/Paradas').then(res=>datos=res.json())
    },{
        staleTime:Infinity
    })

if(isLoading){
    //console.log("Se estan cargando las paradas");        
}

if(isLoading==false){
  
    return(data)
}

return([])

}

export default obtenerParadasPorParadasCompletas