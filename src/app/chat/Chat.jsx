"use client"
import Image from 'next/image'
import React from 'react'

const Chat = () => {
  return (
    <div className='md:h-screen flex md:w-full'>
      <div className='md:w-[400px] bg-amber-600 border'>

          <div className='md:w-full bg-amber-900 min-h-24 border'>
             Sender Info
          </div>
      </div>

      <div className='bg-amber-700 md:w-full'>
        <div className='md:w-full min-h-16 bg-amber-900 flex justify-start items-center gap-6 border'>

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

        <div className='md:h-[85%] bg-amber-900 border'>
          chat-content
        </div>

        <div className='flex border' >
          <textarea name="chat-msg" id="chat"
            className='w-[95%] h-auto min-h-16 ml-3 outline-none'
            placeholder='Write mesage'
          ></textarea>

          <div className='flex justify-center'>
            <button>
              <Image className='filter: invert' src={'/send.png'} alt='send-button' width={40} height={40}></Image>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat;
