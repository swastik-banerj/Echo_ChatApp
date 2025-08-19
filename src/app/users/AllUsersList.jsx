"use client"

import { getAllUsers } from '@/services/userService'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const AllUsersList = () => {

  const {data : session} = useSession();

  const [users, setUsers] = useState([])


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


                <Image src={users[index]?.image || "/avatar_image.jpg"} alt="profile_image" width={100} height={100}
                  className='rounded-full  absolute top-20 left-32 border-2 border-amber-50'
                />
              </div>

            </figure>

            <div className="card-body flex flex-col justify-center items-center">

              <div>
                <h1 className="card-title">{users[index]?.username}</h1>
                <h2 className='mt-2'>{users[index]?.email}</h2>
              </div>

              <div className="card-actions justify-center">
                { session && <button className="bg-gray-600 p-2 rounded-full w-2xs text-lg hover:bg-gray-700"></button> }
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
