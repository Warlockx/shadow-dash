import { SquareChartGantt } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "./sidebar";
import Wallet from "./wallet";

function MainSidebar() {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader className="pt-8">
                    <div className="flex items-center justify-center">
                        <SquareChartGantt className="w-8 h-8 text-purple-500" />
                        <h1 className="text-lg ml-2 font-semibold">Shadow Dash</h1>
                    </div>
                </SidebarHeader>
                <SidebarContent className="flex flex-col items-center h-full justify-between">
                    {/* <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <a href="/dashboard">
                                            <SquareChartGantt className="w-6 h-6 text-gray-500" />
                                            <p className="text-sm ml-8 font-semibold">Home</p>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem >
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup> */}
                </SidebarContent>

                <SidebarFooter>

                </SidebarFooter>
            </Sidebar>
        </SidebarProvider>
    );
}
export default MainSidebar;