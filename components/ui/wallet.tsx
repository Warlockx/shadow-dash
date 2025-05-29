'use client'
import { Button } from "./button";
import { WalletIcon } from "lucide-react";
import { useWeb3 } from "@/context/Web3Context";
function Wallet() {
    const { address, connect, disconnect } = useWeb3();
    return (
        <div className="flex flex-col items-center justify-center w-full ">
            {
                address == null ?
                    <Button onClick={() => connect()}>Connect your walllet</Button>
                    :
                    <div className="grid place-items-center w-full">
                        <div className="flex items-center justify-center gap-4">
                            <WalletIcon className="w-6 h-6 text-gray-500" />
                            <p className="text-sm w-fit">{address.substring(0, 5)}...{address.substring(address.length - 5, address.length)}</p>
                        </div>
                        <Button onClick={() => disconnect()} className="mt-4">Disconnect</Button>
                    </div>
            }
        </div>
    )
}

export default Wallet;