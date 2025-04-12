import { CanvasContext } from "@/contexts/canvasContext";
import { useContext } from "react";

export default function useCanvasContext() {
  return useContext(CanvasContext)
}
