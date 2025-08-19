"use client"
import { signOut } from 'next-auth/react';
import React from 'react'
import Chat from './Chat';

const ChatPage = () => {

  // Google Logout
    const googleLogout = async () => {
  
      await signOut({
          callbackUrl: "/",
          redirect: true
      })
    }

  return (
    
        <Chat></Chat>


  )
}

export default ChatPage;
