"use client"
import Image from "next/image";
import packageJson from "../../package.json";

import React from 'react'

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
          <Image src="/Chat_Logo.JPG" alt="Chat Logo" width={200} height={200} className="rounded-full" />
          <h1 className="m-3 font-bold font-sans text-2xl">Echo - Your voice, Amplified</h1>
          <span className="ml-1">Version : v{packageJson.version}</span>
    </div>
  )
}

export default HomePage;
