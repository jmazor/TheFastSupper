
import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

export const retrieveUserSession = async() => {
    try {   
        const session = await EncryptedStorage.getItem("user_session");
    
        if (session !== undefined) {
            return JSON.parse(session);
        }
    } catch (error) {
        console.log(error.code);
    }
  };
  