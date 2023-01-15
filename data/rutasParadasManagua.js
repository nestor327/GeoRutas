
import { useQuery } from "react-query";

const rutasParadasManagua=async(idRuta)=>{
    const {data,error,isLoading}=useQuery(['obtenerRutasParadas'],async()=>{
        //return await fetch('https://georutas.somee.com/api/RutasParada').then(res=>datos=res.json())
        return await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/RutasParada').then(res=>datos=res.json())
    },{
        staleTime:Infinity
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
}

export default rutasParadasManagua