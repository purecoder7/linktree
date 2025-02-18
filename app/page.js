"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [text, settext] = useState("")
  let router = useRouter()
  let claimTree = () => {
    router.push(`/generate?handle=${text}`)
  }

  return (
    <>
      {/* Hero Section */}
      <div className="bgreen min-h-screen grid grid-cols-1 md:grid-cols-2 items-center px-8 md:px-28">
        
        {/* Left Content */}
        <div className="text-center md:text-left mt-24">
          <h1 className="text-4xl md:text-7xl yelow popins leading-tight textsm">
            Everything you are. <br /> In one, simple link in <br /> bio.
          </h1>
          <p className="yelow mt-6 text-lg textl">
            Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate, and sell from your Instagram, TikTok, Twitter, YouTube, and other social media profiles.
          </p>

          {/* Input + Button */}
          <div className="mt-8 flex flex-col md:flex-row items-center gap-4">
            <input
            onChange={(e)=>{settext(e.target.value)}}
              className="pl-4 text-black rounded-lg h-14 w-full md:w-60"
              type="text"
              placeholder="Your Name"
            />
              <button onClick={()=>{claimTree()}} className="rounded-full h-14 w-full pl-4 pr-4 md:w-56 font-medium bg-pink-300 text-black">
                Claim Your Linktree
              </button>
        
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src={"https://cdn.pixabay.com/photo/2015/07/14/18/14/school-845196_1280.png"}
            alt="Illustration"
            width={450}
            height={450}
            className="w-[80%] md:w-auto"
          />
        </div>
      </div>

      {/* Next Page Section */}
      {/* <div className="bg-red-300 text-blue-950 min-h-screen flex justify-center items-center text-2xl">
        Next page
      </div> */}
    </>
  );
}
