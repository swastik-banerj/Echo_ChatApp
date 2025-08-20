"use client"
import Image from 'next/image'
import React from 'react'

const Chat = () => {
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

          <div className='flex gap-4 border'>
            
            <div>
               receiver image
            </div>
            <div>
              receiver name
            </div>
          </div>

        </div>

        <div className='md:h-[85%] bg-black border'>
          chat-content
        </div>

        <div className='flex bg-cyan-950 rounded-md m-2' >
          <textarea name="chat-msg" id="chat"
            className='w-[95%] h-auto min-h-16 ml-3 outline-none'
            placeholder='Write message'
          ></textarea>

          <div className='flex justify-center'>
            <button>
              <Image className='filter: invert' src={'/send.png'} alt='send-button' width={30} height={30}></Image>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat;
