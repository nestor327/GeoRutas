import react, { useEffect, useState } from "react"
import { ScrollView, StatusBar, Text, View,Image, TouchableOpacity, ActivityIndicator } from "react-native"
import { useQuery } from "react-query"
import { getNombre } from "../data/asyncStorageData"
import getAllRutas from "../data/rutasManagua"
import imagen from '../assets/x_icon_imagen.png';
import PerfilesDeUsuarios from "./ComponentesParaAdmins/PerfilesDeUsuarios";
import * as IAP from 'react-native-iap'
import { Platform,Alert } from 'react-native';

const items=Platform.select({
    ios:[],
    android:['productosubcripcionchoferes']
});

let purchaseUpdateSuscription=null;
let purchaseErrorSuscription=null;

const AdministrarUsuarios=({height,width,emailState,tokenState,setVerAdministrarUsuarios,nombre,setEditarInfoDelChofer,setEmailDelChoferEditar,setChoferAEditar
    ,refrescar,setRefrescar,setMostrarAlerte, setMensajeAlerta,setSecionIniciada,setTipoDeUsuario,setLoguearse})=>{
    

    const [data,setData]=useState([]);
    const [seleccionar, setSeleccionar]=useState(false);
    
    const[arregloActualizar,setArregloActualizar]=useState([]);    
    
    const [purchase, setPurchase]=useState(false);
    const [productos, setProductos]=useState({});

    const obtenerLosDatos=async()=>{

        let todasLasRutas=getAllRutas();

        for(let t=0; t<todasLasRutas.length;t++){        
            if(nombre.includes(todasLasRutas[t].nombre)){
                idRuta=(t+1);
            }
        }

        try{
            let value=null;
            value=await fetch('https://www.georutas.lat/api/UsuariosCoperativas?idRuta=1&Email='+emailState+'&Token='+tokenState).then(res=>datos=res.json());
            setData(value);            
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

    const actualizarUsuario=async()=>{
        try{
            console.log("Entraste aqui");
            let emails=[];
            for(let y=0;y<arregloActualizar.length;y++){
                emails.push(data[arregloActualizar[y]].email);
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


            let datos=await fetch('https://www.georutas.lat/api/ActualizarMenbresia?Email='+emailState+'&Token='+tokenState+'&tiempo='+tiempo,options);
        
                if(datos.ok){
                    console.log(datos);
                    console.log("Se lograron actualizar todos los usuarios");
                    let json=await datos.json();
                    console.log("El json es: "+json);
                    if(json==4){
                        setMensajeAlerta("Usuarios activados");
                        setMostrarAlerte(true);                            
                        setRefrescar(!refrescar);
                        setSeleccionar(!seleccionar);
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

            try{
                IAP.initConnection().catch(()=>{
                    console.log("Ocurrio un error");
                }).then((res)=>{
                    console.log("Los datos de la tienda son: ");
                    console.log(res);
                    IAP.getProducts({skus:items}).catch(()=>{
                        console.log("Ocurrio un error obteniendo los productos");
                    }).then(res=>{
                        console.log(res);
                        setProductos(res);
                    });
                });
            }catch{

            }
            
            purchaseErrorSuscription=IAP.purchaseErrorListener((error)=>{
                if(!(error.responseCode=="1" || error.responseCode=="7" || error.responseCode=="2")){
                    setMensajeAlerta("Ocurrió un error con la transacción");
                    setMostrarAlerte(true);
                }
            });
    
            purchaseUpdateSuscription=IAP.purchaseUpdatedListener((purchase)=>{
                const reciep=purchase.transactionReceipt;
                if(reciep){
                    console.log(reciep);
                    setPurchase(true);
                    IAP.finishTransaction({purchase:purchase, isConsumable: false, developerPayloadAndroid: "" });
                }
            });
    
            return ()=>{
                try{
                    purchaseErrorSuscription.remove();
                }catch{
                    
                }
    
                try{
                    purchaseUpdateSuscription.remove();
                }catch{
    
                }
    
                try{
                    IAP.endConnection();
                }catch{
    
                }
            }
        },[]);

        useEffect(()=>{
            if(purchase==true){
                setMensajeAlerta("Se logro realizar la compra");
                setMostrarAlerte(true);
                console.log("Mierda")
                actualizarUsuario();
                console.log("Mierda")
                setRefrescar(!refrescar);
                setSeleccionar(!seleccionar);
                arregloActualizar([]);
                setPurchase(false);
            }

        },[purchase])

        return(
            
            <View style={{backgroundColor:'#103070',position:'absolute',zIndex:220, height:height+StatusBar.currentHeight, width:width}}>
                
                <View style={{position:'absolute',top:7,left:'90%',zIndex:221}} onTouchEnd={()=>{
                    setVerAdministrarUsuarios(false);
                }}>
                    <Image source={imagen} style={{width:30,height:30, tintColor:'#f1f1f1'}}></Image>
                </View>
                <View style={{alignItems:'center',marginTop:'15%'}}>
                    <Text style={{color:'#f1f1f1',fontSize:29,marginBottom:20}}>Administra tus usuarios</Text>
                    {seleccionar==false && <Text style={{color:'#f1f1f1',fontSize:15,marginBottom:10}}>Has click para editar los datos del chofer</Text>}
                </View>
                <View style={{marginLeft:'0%',height:'60%',marginLeft:20}}>
                {data!=undefined && data.length>1 && <ScrollView>
                    {                        
                        data.map((item,i)=>{      
                             
                                return(
                                    <View key={i} style={{alignItems:'center',flexDirection:'row',alignContent:'center'}}
                                    onTouchEnd={()=>{
                                            setChoferAEditar(item);
                                    }}
                                    >
                                        <PerfilesDeUsuarios setArregloActualizar={setArregloActualizar} setEmailDelChoferEditar={setEmailDelChoferEditar} setEditarInfoDelChofer={setEditarInfoDelChofer} seleccionar={seleccionar} arregloActualizar={arregloActualizar} item={item} i={i}></PerfilesDeUsuarios>
                                    </View>
                                )  
                        })
                    }
                </ScrollView>}
                {data==undefined || data==null && <ActivityIndicator size="large" color="#0000ff" />}
                </View>

                <View style={{flexDirection:'row',marginTop:40,justifyContent:'center'}}>
                    <TouchableOpacity style={{height:40,width:'auto',backgroundColor:'blue',borderRadius:7,justifyContent:'center',paddingHorizontal:5}}
                        onPressOut={()=>{
                            if(seleccionar==false){
                                setSeleccionar(!seleccionar);
                            }else if(seleccionar==true && arregloActualizar.length==0){
                                setMensajeAlerta("Seleccione cuál usuario activar");
                                setMostrarAlerte(true);
                            }else if(seleccionar==true && arregloActualizar.length>0){                                                                
                                try{
                                    IAP.requestPurchase({sku:'productosubcripcionchoferes'});
                                }catch{
                                    console.log("OCURRIO un error en la compra");
                                }
                            }
                            
                        }}
                    >
                        <Text style={{fontSize:16, color:'white'}}>{(seleccionar==false)?"Selecciona cual activar":"Comprar suscripción"}</Text>
                    </TouchableOpacity>
                    {seleccionar==true && <TouchableOpacity style={{marginLeft:10,height:40,width:'auto',borderRadius:7,backgroundColor:'blue',justifyContent:'center',paddingHorizontal:5}}
                        onPressOut={()=>{
                            setSeleccionar(false);
                            setArregloActualizar([]);                            
                        }}
                    >
                        <Text style={{fontSize:16, color:'white'}}>Cancelar</Text>
                    </TouchableOpacity>}
                </View>

                {/* <TouchableOpacity onPressOut={purchaseFullApp}>
                    <Text>Paga las suscriociones</Text>
                </TouchableOpacity> */}
            </View>
        )    
    
}

export default AdministrarUsuarios;