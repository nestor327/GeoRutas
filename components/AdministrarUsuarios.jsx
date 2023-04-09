import react, { useEffect, useState } from "react"
import { ScrollView, StatusBar, Text, View,Image, TouchableOpacity, ActivityIndicator } from "react-native"
import { getNombre } from "../data/asyncStorageData"
import getAllRutas from "../data/rutasManagua"
import imagen from '../assets/x_icon_imagen.png';
import PerfilesDeUsuarios from "./ComponentesParaAdmins/PerfilesDeUsuarios";

const AdministrarUsuarios=({height,width,emailState,tokenState,setVerAdministrarUsuarios,nombre,setEditarInfoDelChofer,setEmailDelChoferEditar,setChoferAEditar
    ,refrescar,setRefrescar,setMostrarAlerte, setMensajeAlerta,setSecionIniciada,setTipoDeUsuario,setLoguearse,comprarProducto,purchase,setPurchase,idFacturaOApellidos
    ,tiempoDesdeLaUltimaSuscripcion})=>{
    

    const [data,setData]=useState([]);
    
    const [arregloActualizar,setArregloActualizar]=useState([]);
    const [cantidadDeInactivos, setCantidadDeInactivos]=useState(true);
    const [comprando, setComprando]=useState(false);

    const obtenerLosDatos=async()=>{

        let todasLasRutas=getAllRutas();

        let idRuta=1;

        console.log("El nombre del usuario es: "+nombre);
        
        for(let t=0; t<todasLasRutas.length;t++){
            if(nombre==(todasLasRutas[t].nombre)){
                idRuta=(t+1);
            }
        }

        console.log("La mierda posee el id "+idRuta);
        try{
            let value=null;
            value=await fetch('https://www.georutas.lat/api/UsuariosCoperativas?idRuta='+idRuta+'&Email='+emailState+'&Token='+tokenState).then(res=>datos=res.json());
            setData(value);            
            //console.log(value[0]);
            if(value.length>2){
                setCantidadDeInactivos(value.filter(elem => elem.tipoSubscripcion=='B').length);
                let nuevoArreglo=[];
                for(let i=0;i<value.length;i++){
                    nuevoArreglo.push(value[i].email);
                }
                setArregloActualizar(nuevoArreglo);
                //console.log(arregloActualizar);
            }
            if(value.length==1 && value.idTablaForanea==-2){
                setMensajeAlerta("Inicie sesión");
                setMostrarAlerte(true);
                setSecionIniciada(false);            
                setTipoDeUsuario("Ninguno");
                setLoguearse(true);
            }
           }catch{
            setData([]);
           }
    }

    const actualizarUsuario=async(apellidos)=>{
        try{
            console.log("Entraste aqui");
            let emails=[];
            for(let y=0;y<arregloActualizar.length;y++){
                emails.push(arregloActualizar[y]);
            }

            let objeto=
                {
                    emailActualizar: emails
                }
              
    
              const options= {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(objeto)
                };
                let month=(new Date()).getMonth();
                let fechaHoy=new Date();
                fechaHoy.setMonth(month+1);
            let tiempo=Date.parse(fechaHoy).toString();
            console.log("La cantidad de segundos es: "+tiempo);
            console.log("La cantidad de segundos es: "+Date.parse(new Date()));


            let datos=await fetch('https://www.georutas.lat/api/ActualizarMenbresia?Email='+emailState+'&Token='+tokenState+'&tiempo='
                    +tiempoDesdeLaUltimaSuscripcion+'&apellidos='+apellidos,options);
        
                if(datos.ok){
                    console.log(datos);
                    console.log("Se lograron actualizar todos los usuarios");
                    setRefrescar(!refrescar);
                    let json=await datos.json();
                    console.log("El json es: "+json);
                    if(json==4){
                        setMensajeAlerta("Usuarios activados");
                        setMostrarAlerte(true);                        
                    }else if(json==2){
                        setMensajeAlerta("Inicie sesión");
                        setMostrarAlerte(true);
                        setSecionIniciada(false);            
                        setTipoDeUsuario("Ninguno");
                        setLoguearse(true);
                    }else if(json==0){
                        setMensajeAlerta("Ocurrió un error, revise su conexión");
                        setMostrarAlerte(true);
                    }
                    

                }else{
                    console.log(datos);
                }
                

        }catch{
            console.log("Ocurrio un error, no se logro realizar la actualizacion");
        }
    }


        
        useEffect(()=>{
            obtenerLosDatos();
        },[refrescar])

        
        useEffect(()=>{
            console.log("Cuando intentas actualizar los usuario obtienes lo siguiente");
            console.log(purchase);
            console.log(purchase==true);
            console.log(idFacturaOApellidos);
            console.log(idFacturaOApellidos!=null);
            console.log(idFacturaOApellidos);
            console.log(idFacturaOApellidos!=undefined);
            console.log(tiempoDesdeLaUltimaSuscripcion);
            console.log(tiempoDesdeLaUltimaSuscripcion!='0');

            if(purchase==true && idFacturaOApellidos!=null && idFacturaOApellidos!=undefined 
                    && tiempoDesdeLaUltimaSuscripcion!='0'){
                setMensajeAlerta("Se logro realizar la compra");
                setMostrarAlerte(true);
                console.log("Mierda")
                console.log("El valor del is es: "+idFacturaOApellidos);
                actualizarUsuario(idFacturaOApellidos);
                console.log("Mierda")
                setRefrescar(!refrescar);
                setPurchase(false);
            }

        },[purchase,tiempoDesdeLaUltimaSuscripcion,idFacturaOApellidos])

        useEffect(()=>{
            let k=0;
            if(comprando){
                k=setInterval(() => {
                    setComprando(false);
                    console.log("Estas en el interval");
                }, 5000);
            }

            return()=>{
                clearInterval(k);
            }

        },[comprando])

        return(
            
            <View style={{backgroundColor:'#103070',position:'absolute',zIndex:220, height:height+StatusBar.currentHeight, width:width}}>
                
                <View style={{position:'absolute',top:7,left:'90%',zIndex:221}} onTouchEnd={()=>{
                    setVerAdministrarUsuarios(false);
                }}>
                    <Image source={imagen} style={{width:30,height:30, tintColor:'#f1f1f1'}}></Image>
                </View>
                <View style={{alignItems:'center',marginTop:'15%'}}>
                    <Text style={{color:'#f1f1f1',fontSize:29,marginBottom:20}}>Administra tus usuarios</Text>
                    <Text style={{color:'#f1f1f1',fontSize:15,marginBottom:10}}>Has click para editar los datos del chofer</Text>
                </View>
                <View style={{marginLeft:'0%',height:'60%',marginLeft:20}}>
                {data==undefined || data.length<=1 && <ActivityIndicator size="large" color="#0000ff" />}
                {data!=undefined && data.length>1 && <ScrollView>
                    
                    {                        
                        data.map((item,i)=>{      
                             
                                return(
                                    <View key={i} style={{alignItems:'center',flexDirection:'row',alignContent:'center'}}
                                    onTouchEnd={()=>{
                                            setChoferAEditar(item);
                                    }}
                                    >
                                        <PerfilesDeUsuarios  cantidadDeInactivos={cantidadDeInactivos} setEmailDelChoferEditar={setEmailDelChoferEditar} setEditarInfoDelChofer={setEditarInfoDelChofer} arregloActualizar={arregloActualizar} item={item} i={i}></PerfilesDeUsuarios>
                                    </View>
                                )  
                        })
                    }
                </ScrollView>}
                {data==undefined || data==null && <ActivityIndicator style={{height:40, width:40}} size="large" color="#0000ff" />}
                </View>

                <View style={{flexDirection:'row',marginTop:40,justifyContent:'center'}}>
                    <TouchableOpacity style={{height:40,width:'auto',backgroundColor:'blue',borderRadius:7,justifyContent:'center',paddingHorizontal:5}}
                        onPressOut={()=>{
                            comprarProducto("suscripcionpremiun");
                            setComprando(true);
                        }}
                    >
                        <Text style={{fontSize:16, color:'white'}}>{"Activar todos los usuarios"}</Text>
                    </TouchableOpacity>
                    
                </View>
                {comprando==true && <ActivityIndicator size="large" color="#0000ff" />}

                {/* <TouchableOpacity onPressOut={purchaseFullApp}>
                    <Text>Paga las suscriociones</Text>
                </TouchableOpacity> */}
            </View>
        )    
    
}

export default AdministrarUsuarios;