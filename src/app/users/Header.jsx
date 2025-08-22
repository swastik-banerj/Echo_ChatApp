import React from 'react'
import Image from 'next/image';

const UsersPageHeader = () => {
    return (
        <nav>
            <div className='grid grid-cols-12'>
                <div className='col-start-1 col-span-2 flex items-center gap-5 m-2 p-2 sm:p-4'>

                    <div className='flex justify-center items-center w-full h-28 sm:h-40 md:h-28 lg:h-28 m-2'>
                        <Image src={'/Chat_Logo.JPG'} alt='logo' width={200} height={200}
                            className='rounded-full object-contain m-5'
                        ></Image>
                    </div>
                    <div className='sm:text-sm w-full' > 
                        <h1 className='text-2xl md:text-3xl'>Echo Chat</h1>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default UsersPageHeader;