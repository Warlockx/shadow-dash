"use client";
import AddressMenu from "@/components/ui/addressmenu";
import { SquareChartGantt } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-screen overflow-clip bg-zinc-200 max-w-screen">
            <QueryClientProvider client={queryClient}>
                <div className="flex items-center justify-between p-4 ">
                    <div className="flex items-center gap-4 justify-center">
                        <SquareChartGantt className="w-8 h-8 text-purple-500" />
                        <h1 className="text-lg text-zinc-900 font-semibold">Shadow Dash</h1>
                    </div>
                    <AddressMenu />
                </div>
                <div className="h-full w-full">
                    {children}
                </div>
            </QueryClientProvider>
        </div>
    );
}