

import { useQuery,queryKey } from "react-query";


const obtenerParadasPorParadasCompletas=()=>{
try{
    const {data,error,isLoading}=useQuery(['obtenerParadasConDireccionCompletas'],async({queryKey})=>{
        //return await fetch('https://georutas.somee.com/api/Paradas').then(res=>datos=res.json())
        return await fetch('https://georutas.somee.com/api/Paradas').then(res=>datos=res.json())
    },{
        staleTime:Infinity,
        cacheTime:3600000
    })

if(isLoading){
    //console.log("Se estan cargando las paradas");        
}

if(isLoading==false){
  
    return(data)
}

return([])
}catch{
    return([])
}
}

export default obtenerParadasPorParadasCompletas