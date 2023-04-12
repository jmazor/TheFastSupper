import * as React from 'react';
import * as SecureStore from 'expo-secure-store';

async function store(key, value){
    //console.log(key+value);
    await SecureStore.setItemAsync(key, value);
}

async function retrieve(key){

    let result = await SecureStore.getItemAsync(key);
    return result;
}

export {store, retrieve};