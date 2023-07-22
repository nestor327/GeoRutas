import AsyncStorage from "@react-native-async-storage/async-storage";



export const setUsuario = async (usuarioState) => {
    try{
        await AsyncStorage.setItem('usuario',usuarioState);
    }catch (e){
        console.log("No se encontro el usuario");
    }
  return true;
}



export const getUsuario = async (setUsuarioState) => {
    
    try{
        const value=await AsyncStorage.getItem('usuario');

        if(value==null){
            setUsuarioState("");
        }else{
            setUsuarioState(value);
        }

          
    }catch (e){
        console.log("No se encontro el usuario");
        setUsuarioState("");      
    }
  return true;
}

export const setTipoDeUsuario= async (usuarioState) => {
    try{
        await AsyncStorage.setItem('tipoDeUsuario',usuarioState);
    }catch (e){
        console.log("No se encontro el usuario");
    }
  return true;
}

export const getTipoDeUsuario = async (setTipoDeUsuarioState) => {   
    try{
        const value=await AsyncStorage.getItem('tipoDeUsuario');
        if(value==null){
            setTipoDeUsuarioState("Niinguno");
        }else{
            setTipoDeUsuarioState(value);
        }          
    }catch (e){
        console.log("No se encontro el usuario");
        setTipoDeUsuarioState("");      
    }
  return true;
}

export const setContraseña= async (contraseña) => {
    try{
        await AsyncStorage.setItem('contraseñausuario',contraseña);
    }catch (e){
        console.log("No se encontro el usuario");        
    }
  return true;
}

export const getContraseña = async (setContraseña) => {   
    try{
        const value=await AsyncStorage.getItem('contraseñausuario');

        if(value==null){
            setContraseña("");      
        }else{
            setContraseña(value);      
        }
        
          
    }catch (e){
        console.log("No se encontro el usuario");
        setContraseña("");
    }
  return true;
}

export const setNombre= async (contraseña) => {
    try{
        await AsyncStorage.setItem('nombreUsuario',contraseña);
    }catch (e){
        console.log("No se encontro el usuario");
    }
  return true;
}

export const getNombre = async (setNombre) => {   
    try{
        const value=await AsyncStorage.getItem('nombreUsuario');
        if(value==null){
            setNombre("");
        }else{
            setNombre(value);      
        }

          
    }catch (e){
        console.log("No se encontro el usuario");
        setNombre("");      
    }
  return true;
}
export const setTelefonoAsync= async (telefono) => {
    try{
        await AsyncStorage.setItem('telefonoUsuario',telefono);
    }catch (e){
        console.log("No se encontro el usuario");
    }
  return true;
}

export const getTelefono = async (setTelefono) => {   
    try{
        const value=await AsyncStorage.getItem('telefonoUsuario');
        if(value==null){
            setTelefono("");
        }else{
            setTelefono(value);      
        }

          
    }catch (e){
        console.log("No se encontro el usuario");
        setNombre("");      
    }
  return true;
}

export const setApellidos= async (apellidos) => {
    try{
        await AsyncStorage.setItem('apellidosUsuario',apellidos);
    }catch (e){
        console.log("No se encontro el usuario");
    }
  return true;
}

export const getApellidos = async (setApellidos) => {   
    try{
        const value=await AsyncStorage.getItem('apellidosUsuario');
        if(value==null){
            setApellidos("");
        }else{
            setApellidos(value);      
        }

          
    }catch (e){
        console.log("No se encontro el usuario");
        setNombre("");      
    }
  return true;
}

export const setCorreo= async (correo) => {
    try{
        await AsyncStorage.setItem('correo',correo);
    }catch (e){
        console.log("No se encontro el usuario");
    }
  return true;
}

export const getCorreo = async (setCorreo) => {   
    try{
        const value=await AsyncStorage.getItem('correo');
        if(value==null){
            setCorreo("");      
        }else{
            setCorreo(value);      
        }

          
    }catch (e){
        console.log("No se encontro el usuario");
        setCorreo("");      
    }
  return true;
}

export const setPermitirEnvio= async (correo) => {
    try{
        await AsyncStorage.setItem('permitirEnvio',correo);
    }catch (e){
        console.log("No se encontro el permitir envio");
    }
  return true;
}

export const getPermitirEnvio = async (setPermitirEnvio) => {   
    try{
        const value=await AsyncStorage.getItem('permitirEnvio');

        if(value!=null){
            setPermitirEnvio(value);
        }else if(value==="false"){
            setPermitirEnvio(false);
        }else if(value==="true"){
            setPermitirEnvio(true);
        }else{
            setPermitirEnvio(false);
        }
    }catch (e){
        console.log("No se encontro el permitir envio");
        setPermitirEnvio(false);      
    }
  return true;
}

export const setRutasParadasValue= async (rutasParadas) => {
    try{
        await AsyncStorage.setItem('rutasParadas',rutasParadas);
    }catch (e){
        console.log("No se encontro el usuario");
    }
  return true;
}

export const getRutasParadasValue = async () => {   
    try{
        const value=await AsyncStorage.getItem('rutasParadas');
        if(value==null){
            return [];
        }else{
            return (JSON.parse(value));
        }
          
    }catch (e){
        console.log("No se encontraron las paradas");
        return [];
    }
  
}

export const setRutasFavoritas= async (rutasParadas) => {
    try{
        await AsyncStorage.setItem('rutasFavoritas',rutasParadas);
    }catch (e){
        console.log("No se encontro el usuario");
    }
  return true;
}

export const getRutasFavoritas = async (setRutas) => {   
    try{
        const value=await AsyncStorage.getItem('rutasFavoritas');
        if(value==null){
            setRutas([]);
        }else{
            setRutas(JSON.parse(value));
        }
          
    }catch (e){
        console.log("No se encontraron las paradas");
        return "[]";
    }
  
}


export const setActualizando= async (actualizando) => {
    try{
        await AsyncStorage.setItem('actualizando',actualizando);
    }catch (e){
        console.log("No se actualizo el actualizando");
    }
  return true;
}

export const getActualizando = async () => {   
    try{
        const value=await AsyncStorage.getItem('actualizando');

        if(value!=null){
            return 
            {
                value
            }
        }else{
            let value="false";
            return 
            {
                value
            }
        }
    }catch (e){
        console.log("No se encontro el actualizando");
        let value="false";
            return 
            {
                value
            }
    }
}

export const setCantidadDeActualizando= async (total) => {
    try{
        await AsyncStorage.setItem('actualizandoCantidad',total);
    }catch (e){
        console.log("No se envio la cantida de actualizando");
    }
  return true;
}

export const getCantidadDeActualizando = async () => {   
    try{
        let cantidad=await AsyncStorage.getItem('actualizando');

        if(value!=null){
            return 
            {
                cantidad;
            }
        }else{
            let cantidad="0";
            return{
                cantidad
            }
        }
    }catch (e){
        console.log("No se encontro la cantidad de actualizando");
        let cantidad="0";
            return{
                cantidad
            }
    }
}

export const setTokenGeoRutasCode= async (token) => {
    try{
        await AsyncStorage.setItem('tokenCodeGeoRutas',token);
    }catch (e){
        return false;
    }
  return true;
}

export const getTokenGeoRutasCode = async (setToken) => {   
    try{
        const value=await AsyncStorage.getItem('tokenCodeGeoRutas');
        if(value==null){
            setToken("");
        }else{
            setToken(value);
        }        
    }catch (e){        
        setToken("");
        return false;
    }
  return true;
}

export const setTipoDeMenbresiaCode= async (menbresia) => {
    try{
        await AsyncStorage.setItem('tipoDeMenbresia',menbresia);
    }catch (e){
        return false;
    }
  return true;
}

export async function getTipoDeMenbresia(){   
    try{
        const value=await AsyncStorage.getItem('tipoDeMenbresia');
        if(value==null){
            return ""
        }else{
            return {
                value
            };
        }
    }catch (e){       

        return {
            value:""
        };
    }
}
export const setTipoDeUsuarioCode= async (tipoDeUsuario) => {
    try{
        await AsyncStorage.setItem('tipoDeUsuario',tipoDeUsuario);
    }catch (e){
        return false;
    }
  return true;
}

export async function getTipoDeUsuarioCode(){   
    try{
        const value=await AsyncStorage.getItem('tipoDeUsuario');
        if(value==null){
            return ""
        }else{
            return {
                value
            };
        }
    }catch (e){       

        return {
            value:""
        };
    }
}

export const setIdUsuarioIniciadoCode= async (idUsuario) => {
    try{
        await AsyncStorage.setItem('IdUsuarioIniciado',idUsuario);
    }catch (e){
        return false;
    }
  return true;
}


export const setIdUsuarioTransportistaQueComparten= async (idUsuario) => {
    try{
        await AsyncStorage.setItem('idUsuarioTransportistaQueComparten',idUsuario);
    }catch (e){
        console.log("No se LOGRO GUARDAR EL ID DEL PUTO USUARIO");
    }
  return true;
}

export const getIdUsuarioTransportistaQueComparten = async (setIdUsuario) => {   
    try{
        const value=await AsyncStorage.getItem('idUsuarioTransportistaQueComparten');

        console.log("El id del usaurio compartido que se obtiene es: "+value);

        if(value==null){
            setIdUsuario(-1);      
        }else{
            setIdUsuario(parseInt(value));
        }
        
          
    }catch (e){
        console.log("No se encontro el id del usuario");
        setIdUsuario(-1);
    }
  return true;
}

export const setCompartiendoUbicacionParaElTransportista= async (valorDeVerdad) => {
    try{
        await AsyncStorage.setItem('estaCompartiendoUbicacionElPasajero',valorDeVerdad);
        console.log("Se actualizo la mierda, el valor fue: "+valorDeVerdad);
    }catch (e){
        console.log("No se logro actualizar el dato de que se esta compartiendo la ubicacion del usuario pasajero");
    }
  return true;
}

export const getCompartiendoUbicacionParaElTransportista = async (setValorDeVerdad) => {   
    try{
        const value=await AsyncStorage.getItem('estaCompartiendoUbicacionElPasajero');

        console.log("Al intentar ver si se esta compartiendo la ubicacion o no del pasajero, obtienes: "+value);

        if(value==null){
            setValorDeVerdad(0);      
        }else if(value=="1"){
            setValorDeVerdad(true);
        }else{
            setValorDeVerdad(false);
        }
          
    }catch (e){
        console.log("No se encontro el id del usuario");
        setValorDeVerdad(false);
    }
  return true;
}


export const setIdRutaDelUsuarioQueComparten= async (idRuta) => {
    try{
        await AsyncStorage.setItem('idRutaDelUsuarioQueComparten',idRuta);
    }catch (e){
        console.log("No se logro actualizar el dato de que se esta compartiendo la ubicacion del usuario pasajero");
    }
  return true;
}

export const getIdRutaDelUsuarioQueComparten = async (setIdRutaQueComparte) => {   
    //try{
        const value=await AsyncStorage.getItem('idRutaDelUsuarioQueComparten');

        console.log("Al intentar obtener el id de la ruta que comparten obtienes: "+value);

        if(value==null){
            setIdRutaQueComparte(-1);
        }else if(parseInt(value)>0){
            setIdRutaQueComparte(parseInt(value));
        }else{
            setIdRutaQueComparte(-1);
        }
          
    //}catch (e){
        //console.log("No se encontro el id de la ruta del usuario");
        //setIdRutaQueComparte(-1);
    //}
  return true;
}
