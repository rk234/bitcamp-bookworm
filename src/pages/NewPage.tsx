import { createBoard } from "@/services/boardsService";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

export default function NewPage() {
  const { workspaceID, boardName } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (workspaceID && boardName) {
      createBoard(workspaceID, boardName).then((id) => {
        navigate("/edit/" + workspaceID + "/" + id)
      }).catch(err => {
        console.log("somethign went wrong")
        console.log(err)
      })
    }
  }, [boardName, navigate, workspaceID])

  return <p>Please wait...</p>
}
