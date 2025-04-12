import { AppSidebar } from "@/components/app-sidebar";
import Canvas from "@/components/Canvas";
import { NavActions } from "@/components/nav-actions";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CanvasContext } from "@/contexts/canvasContext";
import CanvasContextProvider from "@/providers/CanvasContextProvider";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function EditorPage() {
    return <SidebarProvider>
        <AppSidebar>
        </AppSidebar>
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
            <CanvasContextProvider>
                <Canvas className="" blocks={[{ type: "markdown", id: "1", transform: { x: 0, y: 0, width: 500, height: 500, rotation: 0 }, markdown: "Some text" }]}>
                </Canvas>
            </CanvasContextProvider>
        </SidebarInset>
    </SidebarProvider>
}
