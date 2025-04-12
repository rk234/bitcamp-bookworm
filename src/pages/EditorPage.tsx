import { EditorSidebar } from "@/components/EditorSidebar";
import Canvas from "@/components/Canvas";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function EditorPage() {
    return <>
        <SidebarProvider>
        <EditorSidebar/>
        <SidebarInset>
            <header className="flex h-14 shrink-0 items-center gap-2">
                <div className="flex flex-1 items-center gap-2 px-3">
                    <SidebarTrigger />
                    <Separator className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage className="line-clamp-1">
                                    Workspace Name Goes Here
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <Canvas className="">
            </Canvas>
        </SidebarInset>
    </SidebarProvider>
    </>
    
}
