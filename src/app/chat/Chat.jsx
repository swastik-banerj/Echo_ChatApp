"use client"
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { getUser } from '@/services/userService'
import io from 'socket.io-client';

const Chat = () => {

  const messagesEndRef = useRef(null);

  const { data: session } = useSession();
  const params = useParams();
  const { userId } = params;
  const [user, setUser] = useState(null);

  const socketRef = useRef(null);

  useEffect(() => {
    const getSingleUser = async () => {

      try {

        const result = await getUser(userId);

        if (result.success) {
          setUser(result.user)
        } else {
          console.log("Error while fetching a user : ", result.message)
        }

      } catch (error) {
        console.log("Error while fetching a user : ", error);
      }
    }

    if (userId) getSingleUser();

  }, [userId])

  const logOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true
    })
  }

  const sendMessage = (e) => {
    e.preventDefault();

    if (!socketRef.current) return;
    if (!message) return; // ignore empty messages

    socketRef.current.emit("privateMessage", {
      senderId: session?.user?.id,
      receiverId: userId,
      message: message
    });

    setMessage('');
  };


  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {

    socketRef.current = io(process.env.NEXTSOCKET_URL, {
      transports: ["websocket"], // helps avoid polling errors
    });

    // join own room
    if (session?.user?.id) {
      socketRef.current.emit("join", session.user.id);
    }

    // listen for new messages
    socketRef.current.on("newMessage", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current.disconnect();
    };

  }, [session?.user?.id])


  return (

    <div className='md:flex-row flex flex-col h-screen w-full'>

      {/* Sidebar Logo Section */}

      <div className='w-full md:w-[400px] h-28 md:h-screen bg-black border flex items-center md:justify-center  justify-start md:flex-col gap-3'>

        <div className=' bg-black ml-6'>
          <Image src="/Chat_Logo.JPG" alt="Chat Logo" width={200} height={200} className="rounded-full w-16" />
        </div>

        <div>
          <h1 className='font-bold'>By Swastik Banerjee</h1>
        </div>

      </div>

      {/* Chat Section */}

      <div className='bg-black md:w-full flex flex-col flex-1'>

        {/* Top bar inside chat */}

        <div className='w-full min-h-16 bg-cyan-950 flex justify-between items-center px-3 sm:px-6 border'>

          {/* Back button (visible on mobile only) */}

          <div className='flex items-center md:hidden'>
            <button>
              <Image src={'/arrow-left.png'} alt='arrow-image' width={40} height={40} className='filter: invert'></Image>
            </button>
          </div>

          {/* Chat Header */}

          <div className="navbar bg-base-100 shadow-sm">

            {/* User Info */}

            <div className="flex items-center gap-3">

              <div className='flex items-center gap-4'>
                <div>
                  <Image src={user?.image || "/avatar_image.jpg"} alt='avatar' width={50} height={50}
                    className='rounded-full'
                  ></Image>
                </div>

                <div>
                  <span className='text-sm sm:text-base'>{user?.username}</span>
                </div>
              </div>

            </div>

             {/* Menu (Sign out, Theme) */}

            <div className="flex-none item-center gap-4">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <div className=''>
                    <button onClick={logOut}>Sign Out</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Chat messages */}

        <div className='flex-1 md:h-[85%] bg-black border overflow-y-auto flex flex-col'>
          {chat.map((msg, index) => {

            {
              return msg.senderId === session?.user?.id ? (
                <div key={index} className="chat chat-end">

                  <div className="chat-bubble bg-gray-500 m-2 sm:m-4" >
                    <span className="text-white" >{msg.message}</span>
                  </div>

                </div>
              ) : (
                <div key={index} className="chat chat-start">

                  <div className="chat-bubble bg-cyan-600 m-2 sm:m-4" >
                    <span className="text-white" >{msg.message}</span>
                  </div>

                </div>
              )

            }


          })}

          <div ref={messagesEndRef} />

        </div>

        {/* Input box */}

        <div className='bg-cyan-950 rounded-md m-2 p-2 sm:p-3' >

          <form className='flex gap-2 sm:gap-5' onSubmit={sendMessage}>

            <textarea name="chat-msg"
              className='flex-1 rounded-lg p-2 text-sm sm:text-base resize-none outline-none overflow-y-scroll'
              placeholder='Write message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <button className='ml-7 m-1 p-1' type='submit'>
              <Image className='filter: invert' src={'/send.png'} alt='send-button' width={30} height={30}></Image>
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Chat;