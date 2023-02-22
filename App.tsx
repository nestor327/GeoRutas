import React, { createContext, useEffect, useState } from 'react'
import type {PropsWithChildren} from 'react';
import {QueryClient,QueryClientProvider} from 'react-query';
import Principal from './Principal.jsx';
import {enableLatestRenderer} from 'react-native-maps';
import { Platform } from 'react-native';
import { MobileAds } from 'react-native-google-mobile-ads';


const queryClient= new QueryClient();

export default function App(): JSX.Element{

  useEffect(()=>{
    enableLatestRenderer();    
    MobileAds()
        .initialize()
        .then(adapterStatuses => {
            
        });
  },[])

  return(
      <QueryClientProvider  client={queryClient}>        
        <Principal></Principal>        
      </QueryClientProvider>
  )
}