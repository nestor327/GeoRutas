import React, { useState } from 'react';
import * as IAP from 'react-native-iap';
import {useEffect} from 'react';


const useComprasPlayStore=(emailState,purchase, setPurchase,setMensajeAlerta,setMostrarAlerte,setTiempoDesdeLaUltimaSuscripcion
                ,setMostrarInformacion,datosDelUsuarioSinSuscripcion,secionIniciada,verificarCualEsElUsuarioDeLaCompra,usuarioRegistrado
                ,tiempoDesdeLaUltimaSuscripcion)=>{

    const items=Platform.select({
        ios:[],
        //android:['productosubcripcionchoferes']
        //android:['suscripcionchofer','suscripcionpasajero','suscripcionpremiun']
        android:['productodeprueba','productosubcripcionchoferes','productosuscripcionpasajero','suscripcionadmin']
    });
    // let items=Platform.select({
    //     ios:[],
    //     //android:['productosubcripcionchoferes']
    //     //android:['suscripcionchofer','suscripcionpasajero','suscripcionpremiun']
    //     android:[]
    // });
    
    
    let purchaseUpdateSuscription=null;
    let purchaseErrorSuscription=null;

    const [productos, setProductos]=useState([]);
    const [historial, setHistorial]=useState("");
    const [purchaseTxt, setPurchaseTxt]=useState("");
    const [idFacturaOApellidos, setIdFacturaOApellidos]=useState("GPA.4394-0891-5913-27372");

    const [finalizandoTransaccion, setFinalizandoTransaccion]=useState(false);

    const [nombreItemsAndroid, setNombreItemsAndroid]=useState([]);

    const obtenerProductosDesdeLaBaseDeDatos=async ()=>{
        let valor=await fetch("https://georutas.somee.com/api/productos");

        console.log("Los datos tratados de una forma diferente son");
        let datos= await valor.json();
        console.log(datos);
        setNombreItemsAndroid(datos);
    }

    useEffect(()=>{
        console.log("Llamas a la funcion");
        obtenerProductosDesdeLaBaseDeDatos();
    },[])

    const finalizarTransaccion=(purchaseEvent,finalizandoTransaccion)=>{
        try{
            if(finalizandoTransaccion==false){
                IAP.finishTransaction({purchase:purchaseEvent, isConsumable: false, developerPayloadAndroid: ""});
                setFinalizandoTransaccion(true);
                console.log("Se mando a llamar al finalizador de las transacciones");
            }            
        }catch{
            console.log("Ocurrio un error al intentar finalizar la transaccion");
        }
    }

    useEffect(()=>{
        if(emailState!=undefined && emailState!=null && emailState.length>8 && nombreItemsAndroid!=null 
            && nombreItemsAndroid!=undefined && nombreItemsAndroid.length>1){
            try{            
                IAP.initConnection().catch(()=>{
                    console.log("Ocurrio un error");
                }).then((res)=>{
                    console.log("Los datos de la tienda son: ");
                    console.log(res);
                    //IAP.getSubscriptions({skus:items}).catch(()=>{

                    let itemsProductsNames=[];

                    for(let i=0;i<nombreItemsAndroid.length;i++){
                        itemsProductsNames.push(nombreItemsAndroid[i].nombreProducto);
                    }

                    IAP.getProducts({skus:itemsProductsNames}).catch(()=>{
                        console.log("Ocurrio un error obteniendo los productos");
                    }).then(res=>{
                        console.log("LAS productos FUERON: NNNNN");
                        console.log(res);
                        setProductos(res);
                    });
                });
            
                purchaseErrorSuscription=IAP.purchaseErrorListener((error)=>{
                    if(!(error.responseCode=="1" || error.responseCode=="7" || error.responseCode=="2")){
                        setMensajeAlerta("Ocurrió un error con la transacción");
                        setMostrarAlerte(true);
                    }
                });
        
                purchaseUpdateSuscription=IAP.purchaseUpdatedListener((purchaseEvent)=>{
                    const reciep=purchaseEvent.transactionReceipt;
                    if(reciep && finalizandoTransaccion==false){
                        finalizarTransaccion(purchaseEvent,finalizandoTransaccion);
                        console.log("EL SUPUESTO PURCHASE DE LA VENTA ES: ");
                        console.log(purchaseEvent);
                        verificarCualEsElUsuarioDeLaCompra(2,emailState);
                        setIdFacturaOApellidos("GPA.3394-0891-5913-27372");
                        setPurchaseTxt(JSON.stringify(purchaseEvent));
                        setMostrarInformacion(true);
    
                        let month=(new Date()).getMonth();
                        let fechaHoy=new Date();
                        fechaHoy.setMonth(month+1);
                        let tiempo=(Date.parse(fechaHoy)+(1000*60*60*24)).toString();
                        setTiempoDesdeLaUltimaSuscripcion(tiempo);
                        console.log("El tiempo que intento actualizar es: ");
                        console.log(tiempo);
                        setPurchase(true);
                    }
                });
                
            }catch{
    
            }
        }
        
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
    },[emailState,finalizandoTransaccion,nombreItemsAndroid]);

    const refrescarHistorial=async()=>{
        try{
            const info=await IAP.getPurchaseHistory().then((res)=>{
                setHistorial(JSON.stringify(res));
            });
        }catch{

        }
    }

    const comprarProducto=async(productoName)=>{
        try{

            let producto="";
            for(let i=0;i<nombreItemsAndroid.length;i++){
                if(productoName==nombreItemsAndroid[i].alias){
                    producto=nombreItemsAndroid[i].nombreProducto;
                }
            }

            if(producto=="" || producto==null){
                return;
            }

            //IAP.requestSubscription({sku:producto});
            setFinalizandoTransaccion(false);
            console.log("lA MIERDA ES: ");            
            console.log(productos[0].productId);
            let subscriptionOffers = [];
            // if(producto==productos[0].productId){
            //     subscriptionOffers={subscriptionOffers:[{sku:producto,offerToken:(productos[0].subscriptionOfferDetails[0].offerToken),}]};
            // }else if(producto==productos[1].productId){
            //     //console.log("la mierda llego hasta aqui ");                
            //     subscriptionOffers={subscriptionOffers:[{sku:producto,offerToken:(productos[1].subscriptionOfferDetails[0].offerToken),}]};
            //     //console.log(subscriptionOffers);
            // }else if(producto==productos[2].productId){
            //     subscriptionOffers={subscriptionOffers:[{sku:producto,offerToken:(productos[2].subscriptionOfferDetails[0].offerToken),}]};
            // }else if(producto==productos[3].productId){
            //     subscriptionOffers={subscriptionOffers:[{sku:producto,offerToken:(productos[3].subscriptionOfferDetails[0].offerToken),}]};
            // }
            // console.log("la mierda llego hasta aqui ");
            // console.log(subscriptionOffers);

            let posicion=-1;
            
            try{
                
                const info=await IAP.getPurchaseHistory().then((res)=>{
                    
                    //console.log(res);                
                    console.log("Enviaste la mierda, pero no se base se se envio");
                    verificarCualEsElUsuarioDeLaCompra(1,emailState);
                    console.log("Enviaste la mierda, pero no se base se se envio");

                    for(let y=0;y<JSON.parse(JSON.stringify(res)).length;y++){
                        // console.log(JSON.parse(JSON.parse(JSON.stringify(res))[y].dataAndroid).productId);
                        // console.log("la comparacion es: ");
                        // console.log(producto);
                        // console.log(JSON.parse(JSON.parse(JSON.stringify(res))[y].dataAndroid).productId);
                        if(JSON.parse(JSON.parse(JSON.stringify(res))[y].dataAndroid).productId==producto){
                            posicion=y;
                        }
                    }
                    // console.log("La posicion es: "+posicion);
                    // console.log("Los datos del  usuario transportista son: ");
                    // console.log(datosDelUsuarioSinSuscripcion);
            
                    console.log("Salio hasta aqui con la posicion "+posicion);
                    if(posicion>0){
                        let tiempo=JSON.parse(JSON.parse(JSON.stringify(res))[posicion].dataAndroid).purchaseTime;                   
                        let cantidadComprada=JSON.parse(JSON.parse(JSON.stringify(res))[posicion].dataAndroid).quantity;
                        console.log(cantidadComprada);
                        let fecha=new Date(1970,0,1);
                        fecha.setMilliseconds((parseInt(tiempo)));

                        let fechaActual= new Date();
                        let mes=fecha.getMonth();
                        console.log("La fecha antes de esta mierda es:");
                        console.log(fecha);
                        fecha.setMonth(mes+1);
                        // fecha.setHours(24);
                        console.log("Las fechas son: ");
                        console.log(fecha);
                        console.log(fechaActual);console.log(fecha>fechaActual);
                        console.log("La cantidad comprada es: ");
                        console.log(parseInt(cantidadComprada));
                        console.log("El empleado incluye la mierda");
                        console.log(datosDelUsuarioSinSuscripcion.apellidos.includes('GPA') );
                        console.log(datosDelUsuarioSinSuscripcion.apellidos.length>21);
                        console.log("El nombre del usuario es: ");
                        console.log(usuarioRegistrado.name);
                        console.log(emailState);
                        console.log(usuarioRegistrado.name.length);
                        console.log("No se que carajos pasa pero llega hasta aqui");
                        console.log((fecha>fechaActual && parseInt(cantidadComprada)>=1 && posicion>=0 && datosDelUsuarioSinSuscripcion.apellidos.includes('GPA') 
                        && datosDelUsuarioSinSuscripcion.apellidos.length>21 && secionIniciada==false));
                        console.log(usuarioRegistrado.name.toUpperCase() === (emailState).toUpperCase());
                        console.log("2"+emailState+"2");
                        console.log("2"+usuarioRegistrado.name+"2");
                        
                        console.log(usuarioRegistrado.name.length);


                        let tiempoDos=(fecha.getTime()+1000*3600*24);

                        if(((fecha>fechaActual && parseInt(cantidadComprada)>=1 && posicion>=0 && datosDelUsuarioSinSuscripcion.apellidos.includes('GPA') 
                                    && datosDelUsuarioSinSuscripcion.apellidos.length>21 && secionIniciada==false) 
                                    || secionIniciada==true)
                                    && usuarioRegistrado.name==emailState && usuarioRegistrado.name.length>8
                                    ){
                                        console.log("Los datos del usuario registrado son: ");
                                        console.log(usuarioRegistrado);

                                        let tiempoDesdeLaVenta=tiempo;
                                        let tiempoDeLaVentaActual=(new Date).getTime();
                                        
                                        console.log("Los tiempos son: ");
                                        console.log(tiempoDesdeLaVenta);
                                        console.log(tiempoDeLaVentaActual);
                                        console.log((tiempoDesdeLaVenta-tiempoDeLaVentaActual));
                                        console.log(fecha>fechaActual && parseInt(cantidadComprada)>=1);
                            if(fecha>fechaActual && parseInt(cantidadComprada)>=1 
                            //&& Math.abs((tiempoDesdeLaVenta-tiempoDeLaVentaActual))>=345600000
                            ){
                                console.log("LA SUSCRIPCION YA ESTA COMPRADA");
                                setTiempoDesdeLaUltimaSuscripcion((tiempoDos).toString());
                                setPurchase(true);    
                                return;                        
                            }
                        }
                        // else if(posicion>=0 && secionIniciada==false && fecha>fechaActual && parseInt(cantidadComprada)>=1){
                        //     setMensajeAlerta("Otro usuario compró esta suscripción, acceda desde otro dispositivo y compre una");
                        //     setMostrarAlerte(true);
                        // }else if(posicion>=0 && secionIniciada==true && fecha>fechaActual && parseInt(cantidadComprada)>=1 && usuarioRegistrado.name!=emailState && usuarioRegistrado.name.length>8){
                        //     setMensajeAlerta("Otro usuario compró esta suscripción, acceda desde otro dispositivo y compre una");                            
                        //     setMostrarAlerte(true);
                        // }
                        // console.log(posicion>=0 && secionIniciada==false && fecha>fechaActual && parseInt(cantidadComprada)>=1);
                        // console.log(fecha>fechaActual );
                        // console.log(posicion>=0);
                        // console.log(parseInt(cantidadComprada)>=1);
                    }

                });
                console.log("HASTA AQUI NO LLEGO");
                console.log("La mierda que intentas comprar es: "+producto);
                //var purchase = await IAP.requestSubscription(subscriptionOffers);
                var purchase = await IAP.requestPurchase({sku:producto});

            }catch{
                console.log("OCURRIO UN ERROR EN EL PRIMER TRY");
            }

        }catch{
           console.log("OCURRIO un error en la compra");
        }
    }

    return{
        comprarProducto,
        refrescarHistorial,
        purchaseTxt,
        historial,
        idFacturaOApellidos
    }
}

export default useComprasPlayStore