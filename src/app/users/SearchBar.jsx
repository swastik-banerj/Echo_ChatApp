import React from 'react'

const SearchBar = () => {
    return (
        <div className='m-3 p-2'>
            <form className="outline-1 w-2xs rounded-2xl">

                <div className='flex items-center gap-1'>

                    <div className="">
                        <svg
                            className="w-4 h-4 ml-3 text-gray-900 dark:text-gray-300"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="search-username"
                        autoComplete='off'
                        placeholder="Search by Username"
                        required
                        className="w-2xs p-2 rounded-2xl outline-none"
                    />
                </div>

            </form>
        </div>
    )
}

export default SearchBar
