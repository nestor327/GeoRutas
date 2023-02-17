import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import imagen from '../../assets/x_icon_imagen.png';

const EditarUsuario=({height,width,setEditarInfoDelChofer,emailDelChoferEditar,choferAEditar,emailState, tokenState,
    refrescar,setRefrescar,setMostrarAlerte,setMensajeAlerta})=>{

    const [nombres,setNombres]=useState("");
    const [apellidos, setApellidos]=useState("");
    const [correo, setCorreo]=useState("");
    const [telefono, setTelefono]=useState("");

    useEffect(()=>{
        setCorreo(emailDelChoferEditar);
        setNombres(choferAEditar.nombres);
        setApellidos(choferAEditar.apellidos);
        setTelefono(choferAEditar.telefono);
    },[])


    const actualizarDatos=async()=>{
        if(!correo.includes("@") || correo.length==0){
            setMensajeAlerta("Ingrese un correo válido");
            setMostrarAlerte(true);
            return;
        }else if(nombres==null || nombres.length==0){            
            setMensajeAlerta("Ingrese los nombres");
            setMostrarAlerte(true);
            return;
        }

        try{
            let objeto={
                nombres: nombres,
                apellidos: apellidos,
                telefono: telefono,
                emailActual: emailDelChoferEditar,
                emailNuevo: correo
              }
    
              const options= {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(objeto)
                };

            let datos=await fetch('https://www.georutas.lat/api/UsuariosCoperativas?Email='+emailState+'&Token='+tokenState,options);

            if(datos.ok){
                let json=await datos.json();
                console.log(json);
                if(json=='4'){
                    setMensajeAlerta("La actualización se realizó con éxito");
                    setMostrarAlerte(true);
                    setRefrescar(!refrescar);
                    setEditarInfoDelChofer(false);                    
                }
                if(json=='5'){
                    setMensajeAlerta("El correo ya tiene dueño, no se logró actualizar");

                    setMostrarAlerte(true);                    
                }else if(json=='0'){
                    setMensajeAlerta("No se logró actualizar al usuario");
                    setMostrarAlerte(true);
                }
                setRefrescar(!refrescar);
                setEditarInfoDelChofer(false);
            }

        }catch{
            setMensajeAlerta("No se logró actualizar al usuario");

            setMostrarAlerte(true);
        }
    }

    return(
        <View style={{width:'100%',height:height,position:'absolute',top:0,left:0,zIndex:230,backgroundColor:'#00000045'}}>

            <View style={{backgroundColor:'#101038',height:'90%',width:'90%',position:'absolute',top:'5%',left:'5%',zIndex:190}}>
                <View style={{position:'absolute',zIndex:250,height:50,width:50,left:'85%',top:'3%'}} onTouchEnd={()=>{
                    setEditarInfoDelChofer(false);
                }}>
                    <Image source={imagen} style={{width:35,height:35, tintColor:'#f1f1f1'}}></Image>
                </View>
                <View style={{marginTop:'30%',alignItems:'center'}}>
                    <Text style={{color:'white',fontSize:25}}>{"Editar Informacion"}</Text>
                </View>
                <View style={{ height:(height>width)?height*0.4:height*0.3,paddingTop:30}}>
                    <ScrollView>
                        <TextInput placeholder='Ingresa los nombres' style={{paddingLeft:10,marginBottom:10,borderRadius:20, backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                            onChangeText={
                                (em)=>{
                                    setNombres(em);
                                }
                        }>{nombres}</TextInput>
                        <TextInput placeholder='Ingresa los apellidos' style={{paddingLeft:10,marginBottom:10,borderRadius:20, backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                            onChangeText={
                                (em)=>{
                                    setApellidos(em);
                                }
                        }>{apellidos}</TextInput>
                        <TextInput placeholder='Ingresa su correo' style={{paddingLeft:10,borderRadius:20,marginBottom:10, backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                            onChangeText={
                                (em)=>{
                                    setCorreo(em);
                                }
                        }>{correo}</TextInput>
                        <TextInput placeholder='Ingresa su numero de telefono' style={{paddingLeft:10,borderRadius:20,marginBottom:10, backgroundColor:'#5060A0',marginLeft:'10%',marginRight:'10%',height:40}}
                            onChangeText={
                                (em)=>{
                                    setTelefono(em);
                                }
                        }>{telefono}</TextInput>
                    </ScrollView>
                    <TouchableOpacity style={{marginHorizontal:'20%',alignItems:'center',height:45,backgroundColor:'#2060A5',width:'60%',justifyContent:'center'}}
                        onPressOut={()=>{
                            actualizarDatos();
                        }}
                    >
                        <Text style={{color:'#f1f1f1',fontSize:20}}>Guardar cambios</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default EditarUsuario