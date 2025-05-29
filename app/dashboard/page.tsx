"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useWeb3 } from "@/context/Web3Context";
import { getWalletBalance, getNFTTokenByIndex } from "@/lib/ether";
import { useQuery } from "@tanstack/react-query";
import { Loader, Wallet } from "lucide-react";

export default function Dashboard() {
    const { address, connect, isLoading } = useWeb3();

    const {data, isLoading:isLoadingNfts} = useQuery({
        queryKey: ['shadowNFTs'],
        queryFn: async () => {
            const data = await getWalletBalance(address);
            return data;
        },
        enabled: !!address,
    });

    const NFTCount = data;
    const {data:nftdata } = useQuery({
        queryKey: ['isValidNFT', NFTCount],
        queryFn: async () => {
            if (typeof data === "number" && address) {
                const lastNFT = await getNFTTokenByIndex(address, data-1);
                return lastNFT;
            }
            return null;
        },
        enabled: !!NFTCount,
    });

    
    return (
        <div className="">
            {
                !address && !isLoading &&
                renderConnectWalletPrompt(connect)
            }
            {
                isLoading &&
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Card className="m-4">
                        <CardContent className="flex gap-4 items-center justify-center">
                            <Loader className="animate-spin" />
                            Loading...
                        </CardContent>
                    </Card>
                </div>
            }
            {
                isLoadingNfts &&
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Card className="m-4">
                        <CardContent className="flex gap-4 items-center justify-center">
                            <Loader className="animate-spin" />
                            Fetching NFTs...
                        </CardContent>
                    </Card>
                </div>
            }
            {
                (data && data > 0 && !isLoadingNfts) &&
                <div className="flex flex-col items-center justify-center h-full">
                    <Card className="m-4">
                        <CardContent>
                            <h2 className="text-center text-zinc-900">
                                Welcome to the Dashboard, {address.slice(0, 6)}...{address.slice(-4)}!
                            </h2>
                            <p className="text-center text-zinc-700 mt-2">
                                You have {data} Shadow NFTs in your wallet.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            }
            {
                nftdata &&
                <div className="flex flex-col items-center justify-center h-full">
                    <Card className="m-4">
                        <CardContent>
                            <p className="text-center text-zinc-700 mt-2">
                                Your NFT Token ID: {nftdata}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            }
        </div>
    )
}

function renderConnectWalletPrompt(connect: any) {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Card className="m-4">
                <CardContent>
                    <p className="text-center text-zinc-900">
                        Please connect your wallet to access the Dashboard.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => connect()} className="w-full">
                        <Wallet className="inline w-4 h-4 mr-2" />
                        Connect Wallet
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
