import React from 'react'
import Header from './Header';
import AllUsersList from './AllUsersList';
import SearchBar from './SearchBar';

const UsersPage = () => {
  return (
    <div className='bg-black max-w-full h-screen'>
       <Header></Header>
       <div className='flex justify-center'>
          <SearchBar></SearchBar>
       </div>
       <AllUsersList></AllUsersList>
    </div>
  )
}

export default UsersPage;
