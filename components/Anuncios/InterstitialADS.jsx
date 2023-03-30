import React, { useEffect, useState } from 'react';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = 'ca-app-pub-1889500700036964/1659979689';
//const adUnitId = TestIds.INTERSTITIAL;
                  
  const interstitial = InterstitialAd.createForAdRequest(adUnitId,{
    requestNonPersonalizedAdsOnly: false
  });

function InterstitialADS ({VERSIONDELAPLICACION,setMostrarAnuncioCompleto,enviarTiempoDesdeElUltimoAnuncio}) {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log("starting the add");
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
      console.log("unsuscribing to the loading");
    });

    const salida=interstitial.addAdEventListener(AdEventType.CLOSED,()=>{

      console.log('closing the add')
        setMostrarAnuncioCompleto(current=>{current=false});
        setLoaded(current=>{current=false});
        enviarTiempoDesdeElUltimoAnuncio();
    })

    // Start loading the interstitial straight away
    interstitial.load();
    
    // Unsubscribe from events on unmount
    return ()=>{
      interstitial.removeAllListeners();
      console.log("eliminando");
    };
  }, []);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }else
  {
    interstitial.show();
  }
}

export default InterstitialADS

// import React, { useEffect, useState } from 'react';
// import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
// const adUnitId = 'ca-app-pub-1889500700036964/1659979689';
// //const adUnitId = TestIds.INTERSTITIAL;
                  
//   // const interstitial = InterstitialAd.createForAdRequest(adUnitId,{
//   //   requestNonPersonalizedAdsOnly: true
//   // });

// function InterstitialADS ({VERSIONDELAPLICACION,setMostrarAnuncioCompleto,enviarTiempoDesdeElUltimoAnuncio,mostrarAnuncioCompleto}) {

//    const [adLoaded, setAdLoaded] = useState(false);

//   const handleAdEvent = (type) => {
//     if (type === AdEventType.LOADED) {
//       setAdLoaded(true);
//       setMostrarAnuncioCompleto(false);
//     } else if (type === AdEventType.CLOSED) {
//       //setAdLoaded(false);
//       setMostrarAnuncioCompleto(false);
//     } else if(type === AdEventType.REWARDED){
//       setMostrarAnuncioCompleto(false);          
//       enviarTiempoDesdeElUltimoAnuncio(); 
//     }else if(type === AdEventType.OPENED){
//       //setAdLoaded(false);
//     }
//   };

//   useEffect(()=>{
//     setAdLoaded(!adLoaded);
//   },[])

//   const handleAdLoaded = () => {
//     if (adLoaded) {
//       // Ejecutar acción solo si el anuncio está cargado
//       setMostrarAnuncioCompleto(false);
//     }
//   };

//    return (
//     !adLoaded && <InterstitialAd
//       unitId='ca-app-pub-1889500700036964/1659979689'
//       onAdEvent={handleAdEvent}      
//     />
//   );
  
//   // const [noVolverAMostrar, setNoVolverAMostrar]=useState("3");
  
//   // const afirmarCreacion=async()=>{
//   //   try{
//   //     await AsyncStorage.setItem('creacionDelAnucio',"1");
//   //     setNoVolverAMostrar("1");
//   //   }catch{
//   //     setNoVolverAMostrar("1");
//   //   }    
//   // }

//   // const NegarCreacion=async()=>{
//   //   try{
//   //     await AsyncStorage.setItem('creacionDelAnucio',"0");
//   //     setNoVolverAMostrar("0");
//   //   }catch{
//   //     setNoVolverAMostrar("0");
//   //   }    
//   // }
  
//   // const obtenerComprobacion=async()=>{
//   //   try{
//   //     let valor=await AsyncStorage.getItem('creacionDelAnucio');
//   //     if(valor=="0" || valor=="1"){
//   //       setNoVolverAMostrar(valor);
//   //     }else{
//   //       setNoVolverAMostrar("1");
//   //     }
//   //   }catch{
//   //     setNoVolverAMostrar("1");
//   //   }
    

//   // }

//   // useEffect(()=>{
//   //   setMostrarAnuncioCompleto(false);
//   //   console.log("LA MIERDA QUEDA ASI");
//   //   console.log(mostrarAnuncioCompleto);
//   //     interstitial.onAdEvent((type) => {
//   //       if (type === AdEventType.CLOSED) {
//   //         console.log("Entro aqui");
//   //         interstitial.destroy(); // Destruye el anuncio para liberar memoria
//   //         setMostrarAnuncioCompleto(false);
//   //         NegarCreacion();
//   //       } else if (type === AdEventType.REWARDED) {
//   //         interstitial.destroy(); // Destruye el anuncio para liberar memoria
//   //         // Aquí puedes agregar código para recompensar al usuario
//   //         setMostrarAnuncioCompleto(false);          
//   //         enviarTiempoDesdeElUltimoAnuncio();
//   //         NegarCreacion();
//   //       } else if(type===AdEventType.LOADED){
//   //         if(noVolverAMostrar=="0"){
//   //           setNoVolverAMostrar("1");
//   //           afirmarCreacion();
//   //           interstitial.show();
//   //           interstitial.destroy();
//   //         }

//   //       }
//   //     });

//   //     return ()=>{
//   //       interstitial.removeAllListeners();
//   //     }
//   // },[noVolverAMostrar])

//   // useEffect(()=>{
//   //   obtenerComprobacion();
//   //   if(noVolverAMostrar!="0"){
//   //     console.log("La mierda se ejecuta aqui");
//   //     console.log(noVolverAMostrar);
//   //     NegarCreacion();
//   //     interstitial.load();
//   //   }
//   // },[noVolverAMostrar])

//   // try{

//   //   const [loades, setLoaded]=useState(false);
//   //   interstitial.onAdEvent((type) => {
//   //     if (type === AdEventType.CLOSED) {
//   //         setMostrarAnuncioCompleto(false);          
//   //         enviarTiempoDesdeElUltimoAnuncio();
//   //       // El usuario cerró el anuncio antes de que se completara
//   //       interstitial.destroy(); // Destruye el anuncio para liberar memoria
//   //     }
//   //     if(type === AdEventType.LOADED){
//   //       setLoaded(true);
//   //     }
//   //     if(type === AdEventType.ERROR){
//   //       console.log("QUE CREES CABROM, OCURRIO UN ERROR EN EL ANUNCIO, Y ESTE FUE: ");
//   //     }
//   //     if(type===AdEventType.CLOSED){
//   //       console.log("Se cerro el anuncio");
//   //       setLoaded(false);
//   //       setMostrarAnuncioCompleto(false);
//   //     }
//   //   });

//   //   interstitial.load();

//   //   if (interstitial.isLoaded() && loades==true) {
//   //     interstitial.show();          
//   //   }
//   //   // const [loaded, setLoaded] = useState(false);

//   //   // useEffect(() => {
//   //   //   console.log("La mierda si esta cagando");
//   //   //   const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        
//   //   //     console.log("La mierda si entro aqui");
//   //   //   });

//   //   //   const salida=interstitial.addAdEventListener(AdEventType.CLOSED,()=>{
//   //   //       setMostrarAnuncioCompleto(false);
//   //   //       setLoaded(false);
//   //   //       enviarTiempoDesdeElUltimoAnuncio();
//   //   //   })

//   //   //   const erro=interstitial.addAdEventListener(AdEventType.CLICKED,(res)=>{
//   //   //     console.log("QUE CREES CABROM, OCURRIO UN ERROR EN EL ANUNCIO, Y ESTE FUE: ");
//   //   //     setMostrarAnuncioCompleto(false);
//   //   //     setLoaded(false);
//   //   //     console.log(res);
//   //   //   })

//   //   //   // Start loading the interstitial straight away
//   //   //   interstitial.load();
      
//   //   //   // Unsubscribe from events on unmount
//   //   //   return unsubscribe;
//   //   // }, []);

//   //   // No advert ready to show yet
//   //   // if (!loaded) {
//   //   //   return null;
//   //   // }else
//   //   // {
//   //   //   interstitial.show();
//   //   // }
    
//   // }catch{
//   //   setMostrarAnuncioCompleto(false);    
//   //   console.log("Error donde?");
//   // }
// }

// export default InterstitialADS