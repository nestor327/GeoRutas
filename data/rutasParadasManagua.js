
import { useQuery } from "react-query";

const rutasParadasManagua=async(idRuta)=>{
    try{
        const {data,error,isLoading}=useQuery(['obtenerRutasParadas'],async()=>{
            //return await fetch('https://georutas.somee.com/api/RutasParada').then(res=>datos=res.json())
            return await fetch('https://www.georutas.lat/api/RutasParada').then(res=>datos=res.json())
        },{
            staleTime:Infinity,
            cacheTime:3600000
        })
    
    if(isLoading){
        //console.log("Se estan cargando las paradas");        
    }
    
    if(isLoading==false){  
        let dato=data.filter(elemento => elemento.id_Ruta==idRuta);
        return(
            dato
        );
    }
    }catch{
        return([]);
    }
    
}

export default rutasParadasManagua