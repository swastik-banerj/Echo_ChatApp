"use client"
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { getUser } from '@/services/userService'

const Chat = () => {

  const params = useParams();
  const { userId } = params;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSingleUser = async () => {

      try {

        const result = await getUser(userId);

        if (result.success) {
          console.log(user)
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

  /* const sendMessage = (e) => {
    e.preventDefault();
    setMessage('');
  }; */

  /* useEffect(() => {
    setChat([...chat, message]);
  }, []); */

  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  return (
    <div className='md:h-screen flex md:w-full'>
      <div className='md:w-[400px] bg-black border flex items-center'>

        <div className='md:w-full bg-black min-h-24 flex justify-center'>
          <Image src="/Chat_Logo.JPG" alt="Chat Logo" width={200} height={200} className="rounded-full" />
        </div>
      </div>

      <div className='bg-black md:w-full'>
        <div className='md:w-full min-h-16 bg-cyan-950 flex justify-start items-center gap-6 border'>

          <div className='flex items-center ml-3'>
            <button>
              <Image src={'/arrow-left.png'} alt='arrow-image' width={40} height={40} className='filter: invert'></Image>
            </button>
          </div>

          <div className='flex gap-4 border items-center' >

            <div>
              <Image src={user?.image || "/avatar_image.jpg"} alt='avatar' width={50} height={50}
                className='rounded-full'
              ></Image>
            </div>

            <div className='font-bold' >
              {user?.username}
            </div>
          </div>

          <div className=''>
            <button onClick={logOut}>Sign Out</button>
          </div>

        </div>

        <div className='md:h-[85%] bg-black border'>
          {chat.map((msg, index) => (
            <div key={index} className="chat chat-end">
              <div className="chat-bubble"> <span className='text-white'>{msg}</span> </div>
            </div>
          ))}
        </div>

        <div className='bg-cyan-950 rounded-md m-2' >

          <form className='w-full flex gap-5'>
            
            <textarea name="chat-msg"
              className='w-[90%] h-auto min-h-16 ml-3 outline-none overflow-y-scroll'
              placeholder='Write message'
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
              }}
            ></textarea>

            <button className='ml-7 m-1 p-1'
              type='submit'
            >
              <Image className='filter: invert' src={'/send.png'} alt='send-button' width={30} height={30}></Image>
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Chat;
