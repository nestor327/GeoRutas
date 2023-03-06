import React, { createContext, useEffect, useState } from 'react'
import type {PropsWithChildren} from 'react';
import {QueryClient,QueryClientProvider} from 'react-query';
import Principal from './Principal.jsx';
import {enableLatestRenderer} from 'react-native-maps';
import { Platform } from 'react-native';
import { MaxAdContentRating, MobileAds } from 'react-native-google-mobile-ads';


const queryClient= new QueryClient();

export default function App(): JSX.Element{

  useEffect(()=>{
    enableLatestRenderer();    
    MobileAds()
        .initialize()
        .then(adapterStatuses => {
          MobileAds().setRequestConfiguration({
            // Update all future requests suitable for parental guidance
            maxAdContentRating: MaxAdContentRating.PG,
  
            // Indicates that you want your content treated as child-directed for purposes of COPPA.
            tagForChildDirectedTreatment: true,
  
            // Indicates that you want the ad request to be handled in a
            // manner suitable for users under the age of consent.
            tagForUnderAgeOfConsent: true,
  
            // An array of test device IDs to allow.
            testDeviceIdentifiers: ['A30sNestor'],
          })
          .then(() => {
            // Request config successfully set!
            console.log("La configuracion se completo correctamente");
            
          });    
        });

        
  },[])

  return(
      <QueryClientProvider  client={queryClient}>        
        <Principal></Principal>        
      </QueryClientProvider>
  )
}
