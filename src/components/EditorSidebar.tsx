import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ArrowLeft } from "lucide-react";
import {
  getAllBoardsInWorkspace,
  getAllWorkspaceBoardDocs,
} from "@/services/boardsService";
import { useEffect, useState } from "react";
import { Board } from "@/types/workspace";
import { useNavigate, useParams } from "react-router";

export function EditorSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  let { workspaceID } = useParams();
  let navigate = useNavigate();
  let [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    getAllBoardsInWorkspace(workspaceID ?? "").then((boards) =>
      setBoards(boards)
    );
  }, []);

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuButton asChild>
            <a href="/network">
              <ArrowLeft />
              <span>View Network</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>All Boards</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {boards.map((board) => (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="cursor-pointer"
                    onClick={() => navigate(`/edit/${workspaceID}/${board.id}`)}
                  >
                    <span>{board.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
