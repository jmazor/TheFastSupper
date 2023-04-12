import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

export const removeUserSession = async() => {
    try {
        await EncryptedStorage.removeItem("user_session");
        // Congrats! You've just removed your first value!
    } catch (error) {
        console.log(error.code);
    }
  };
  