"use client";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/context/Web3Context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { address, connect, disconnect } = useWeb3();

  useEffect(() => {
    if (address == null) return
    if (address) {
      router.push('/dashboard');
    }
  }, [address, router]);
  return (
    <div className="h-screen items-center justify-center ">
      <BackgroundBeamsWithCollision className="relative">
        <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          Tired of a slow Dashboard?{" "}
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span className="">Shadow Dash.</span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <span className="">Shadow Dash.</span>
            </div>
          </div>
        </h2>

      </BackgroundBeamsWithCollision>
      <Button onClick={() => (address ? router.push('/dashboard') : connect())} className="mt-4 absolute z-20 top-1/2 left-1/2 translate-y-24 -translate-x-1/2">
        {address ? "Get Started" : "Connect Wallet"}
      </Button>

    </div>
  );
}
