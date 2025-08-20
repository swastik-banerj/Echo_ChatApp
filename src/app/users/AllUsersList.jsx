"use client"

import { getAllUsers } from '@/services/userService'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const AllUsersList = () => {

  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [currUser, setCurrUser] = useState({});


  useEffect(() => {

    const getUsers = async () => {

      try {

        const result = await getAllUsers();
        setUsers(result);
        console.log(result);

      } catch (error) {
        console.log("Error from server : ", error);
      }
    }

    getUsers();

  }, [])

  return (
    <div className='flex m-10 gap-8'>

      {users.length > 0 ? (
        users.map((user, index) => (
          <div key={index} className="card bg-base-100 w-96 shadow-sm rounded-2xl">
            <figure>

              <div className="relative w-full h-64 bg-cover bg-center"
                style={{ backgroundImage: "url('/cover_image.jpg')" }}>


                <Image src={user?.image || "/avatar_image.jpg"} alt="profile_image" width={100} height={100}
                  className='rounded-full  absolute top-20 left-32 border-2 border-amber-50'
                />
              </div>

            </figure>

            <div className="card-body flex flex-col justify-center items-center">

              <div>
                <h1 className="card-title">{user?.username}</h1>
              </div>

              <div className="card-actions justify-center">
                {(session?.user?.id?.toString() !== user?._id?.toString()) &&
                  <Link href={`/chat/${user._id}`}
                  
                    onClick={() => setCurrUser(user)} className="bg-gray-600 p-2 rounded-full w-2xs text-lg hover:bg-gray-700 flex justify-center">Send Message</Link>}
              </div>

            </div>
          </div>
        ))
      ) : (
        <div className='w-full flex justify-center'>
          <span className="loading loading-spinner loading-lg"></span>
        </div>

      )

      }


    </div>
  )
}

export default AllUsersList;
