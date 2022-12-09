
import { useQuery,queryKey } from "react-query";

const getAllRutas=()=>{

    const {data,error,isLoading}=useQuery(['obtenerRutas'],async({queryKey})=>{
        return await fetch('https://georutas.somee.com/api/rutas').then(res=>datos=res.json()).catch(error => datos=[]);
    },{
        staleTime:3600000
    })

if(isLoading){
    //console.log("Se estan cargando las paradas");        
}

if(isLoading==false){
    
    return(data)
}

if(error){
    return([]);
}


return([]);

}
export default getAllRutas