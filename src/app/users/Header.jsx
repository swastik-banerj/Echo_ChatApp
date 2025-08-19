import React from 'react'
import Image from 'next/image';

const UsersPageHeader = () => {
    return (
        <nav>
            <div className='grid grid-cols-12'>
                <div className='col-start-1 col-span-2 flex items-center gap-5 m-2'>

                    <div>
                        <Image src={'/Chat_Logo.JPG'} alt='' width={75} height={75}
                            className='rounded-full'
                        ></Image>
                    </div>
                    <div>
                        <h1 className='text-3xl'>Echo  Chat</h1>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default UsersPageHeader;