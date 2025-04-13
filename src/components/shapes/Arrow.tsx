import { useCallback, useEffect, useRef } from "react";

export default function Arrow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const parentRef = useRef<HTMLDivElement>(null)
  const drawCall = useCallback(draw, [])

  useEffect(() => {
    const r = parentRef.current
    const observer = new ResizeObserver(handleResize)

    if (r) observer.observe(r)

    handleResize()

    return () => {
      if (r) observer.unobserve(r)
    }
  }, [])

  function handleResize() {
    if (canvasRef.current) {
      const parent = canvasRef.current.parentElement;

      if (parent) {
        const rect = parent.getBoundingClientRect()
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
      }
    }
    drawCall()
  }

  function draw() {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      context?.clearRect(0, 0, canvas.width, canvas.height)
      context!.strokeStyle = "#FFFFFF"

      context!.beginPath()
      context!.lineWidth = 5
      context!.lineJoin = "bevel"
      context!.moveTo(canvas.width / 2, 0);
      context!.lineTo(canvas.width / 2, canvas.height);
      context!.lineTo(canvas.width / 2 - 15, canvas.height - 30);
      context!.moveTo(canvas.width / 2, canvas.height);
      context!.lineTo(canvas.width / 2 + 15, canvas.height - 30);
      context!.stroke()
    }
  }

  return <div
    ref={parentRef}
    className="w-full h-full"
  >
    <canvas className="absolute" ref={canvasRef}></canvas>
  </div>
}
