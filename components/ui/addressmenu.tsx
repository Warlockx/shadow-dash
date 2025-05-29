"use client";
import { Wallet } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";
import { useWeb3 } from "@/context/Web3Context";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export default function AddressMenu() {
    const { address, disconnect } = useWeb3();
    if (!address) {
        return null;
    }

    const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

    return (
        <div className="flex shadow text-zinc-900 select-none items-center justify-center bg-zinc-100 p-2 rounded-sm gap-2">
            <Popover>
                <PopoverTrigger asChild>
                    <div className="w-32 flex justify-between items-center cursor-pointer">
                        <Wallet className="inline w-4 h-4 mr-1" />
                        {shortAddress}
                    </div>
                </PopoverTrigger>
                <PopoverContent sideOffset={3} align="center" className="w-36 flex items-center border-0 rounded-t-none shadow justify-center bg-zinc-100 rounded-b-sm p-1 ">
                    <Button variant={'secondary'} onClick={() => disconnect()} >
                        Disconnect
                    </Button>
                </PopoverContent>
            </Popover>
        </div>
    );
}   