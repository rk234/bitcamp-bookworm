import { EditorSidebar } from "@/components/EditorSidebar";
import Canvas from "@/components/Canvas";
import CanvasContextProvider from "@/providers/CanvasContextProvider";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import EditorContextProvider from "@/providers/EditorContextProvider";

export default function EditorPage() {
  return (
    <>
      <EditorContextProvider>
        <SidebarProvider>
          <EditorSidebar />
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
              <Canvas>
              </Canvas>
            </CanvasContextProvider>
          </SidebarInset>
        </SidebarProvider>
      </EditorContextProvider>
    </>
  );
}
