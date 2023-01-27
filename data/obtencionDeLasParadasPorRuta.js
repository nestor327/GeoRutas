    
    
    import React from "react";
    import { useQuery,queryKey } from "react-query";
    import { Marker, Polyline } from "react-native-maps";
    import {Image,View,Text} from 'react-native'

    const obtenerParadasPorParadas=(idRuta,emailState,tokenState)=>{

        const {data,error,isLoading}=useQuery(['obtenerParadasConDireccion',idRuta,emailState,tokenState],async({queryKey})=>{
            //return await fetch('https://georutas.somee.com/api/Paradas').then(res=>datos=res.json())
            return await fetch('http://georutas.us-east-2.elasticbeanstalk.com/api/Paradas?IdRuta='+queryKey[1]+'&Email='+queryKey[2]+'&Token='+queryKey[3]).then(res=>datos=res.json())
        },{
            staleTime:Infinity
        })

    if(isLoading){
        //console.log("Se estan cargando las paradas");        
    }

    if(isLoading==false){
        //let paradasNecesarias=[];

        //console.log("El id es: "+idRuta);
        // if(idRuta==1){        
        //     for(let y=0;y<134;y++){
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==2){
        //     for(let y=134;y<248;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==3){
        //     for(let y=248;y<357;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==4){
        //     for(let y=357;y<455;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==5){
        //     for(let y=455;y<561;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==6){
        //     for(let y=561;y<659;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==7){
        //     for(let y=659;y<773;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==8){
        //     for(let y=773;y<859;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==9){
        //     for(let y=859;y<965;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==10){
        //     for(let y=965;y<1079;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==11){
        //     for(let y=1079;y<1176;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==12){
        //     for(let y=1176;y<1293;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==13){
        //     for(let y=1293;y<1405;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==14){
        //     for(let y=1405;y<1507;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==15){
        //     for(let y=1507;y<1602;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==16){
        //     for(let y=1602;y<1715;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==17){
        //     for(let y=1715;y<1804;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==18){
        //     for(let y=1804;y<1891;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==19){
        //     for(let y=1891;y<2006;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==20){
        //     for(let y=2006;y<2105;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==21){
        //     for(let y=2105;y<2192;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==22){
        //     for(let y=2192;y<2314;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==23){
        //     for(let y=2314;y<2375;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==24){
        //     for(let y=2375;y<2472;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==25){
        //     for(let y=2472;y<2537;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==26){
        //     for(let y=2537;y<2652;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==27){
        //     for(let y=2652;y<2724;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==28){
        //     for(let y=2724;y<2839;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==29){
        //     for(let y=2839;y<2940;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==30){
        //     for(let y=2940;y<3024;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==31){
        //     for(let y=3024;y<3125;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==32){
        //     for(let y=3125;y<3242;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==33){
        //     for(let y=3242;y<3340;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==34){
        //     for(let y=3340;y<3421;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==35){
        //     for(let y=3421;y<3485;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==36){
        //     for(let y=3485;y<3559;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==37){
        //     for(let y=3559;y<3683;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==38){
        //     for(let y=3683;y<3800;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==39){
        //     for(let y=3800;y<3877;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==40){
        //     for(let y=3877;y<4003;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==41){
        //     for(let y=4003;y<4061;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==42){
        //     for(let y=4061;y<4175;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==43){
        //     for(let y=4175;y<4234;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==44){
        //     for(let y=4234;y<4304;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else if(idRuta==45){
        //     for(let y=4304;y<4355;y++){                
        //         paradasNecesarias.push(data[y]);
        //     }
        // }else{
        //     return[];
        // }


        return(data)
    }

    return([])

    }

    export default obtenerParadasPorParadas