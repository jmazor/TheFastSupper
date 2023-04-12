
import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

export const storeUserSession = async (token, email) => {
    try {
        await EncryptedStorage.setItem(
            "user_session",
            JSON.stringify({
                token : token,
                email : email,
            })
        );

        
    } 
    
    catch (error) {
        console.log(error.code);
    }
  };
  