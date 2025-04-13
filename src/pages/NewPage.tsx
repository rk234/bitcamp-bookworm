import { createBoard } from "@/services/boardsService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function NewPage() {
  const { workspaceID, boardName } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!run && workspaceID && boardName) {
      createBoard(workspaceID, boardName).then((id) => {
        navigate("/edit/" + workspaceID + "/" + id)
      }).catch(err => {
        console.log("somethign went wrong")
        console.log(err)
      })
    }
  }, [boardName, navigate, run, workspaceID])

  return <p>Please wait...</p>
}
