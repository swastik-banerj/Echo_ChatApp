"use client"

import React, { useEffect, useState } from 'react'
import Chat from '../Chat';
import { useParams } from 'next/navigation';
import { getUser } from '@/services/userService';

const ChatPage = () => {

  return (
     <Chat></Chat>
  )
}

export default ChatPage;
