import { getNetworkStuff } from "@/services/boardsService";
import { useEffect, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { useNavigate } from "react-router";

export default function NetworkGraph() {
  let [size, setSize] = useState<[number, number]>([
    window.innerWidth,
    window.innerHeight,
  ]);
  let [graph, setGraph] = useState<{
    nodes: { id: string; x: number; y: number; url: string }[];
    links: { source: string; target: string }[];
  }>({ nodes: [], links: [] });

  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.onresize = handleResize;

    // Optional cleanup if other code might use window.onresize
    return () => {
      window.onresize = null;
    };
  }, []);

  useEffect(() => {
    getNetworkStuff("e5818093-fb28-46d2-a86c-1080b629848b").then((res) => setGraph(res));
  }, []);

  let nav = useNavigate();

  return (
    <>
      <ForceGraph2D
        graphData={graph}
        width={size[0]}
        height={size[1]}
        backgroundColor={"rgba(0,0,0,0)"}
        linkColor={() => "white"}
        onNodeClick={(node) => nav(node.url)}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 15 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions: [number, number] = [
            textWidth + fontSize * 1.2,
            2 * fontSize,
          ]; // some padding

          ctx.fillStyle = "oklch(0.551 0.027 264.364)";

          ctx.beginPath();
          ctx.roundRect(
            node.x - bckgDimensions[0] / 2,
            node.y - bckgDimensions[1] / 2,
            ...bckgDimensions,
            5
          );
          ctx.stroke();
          ctx.fill();

          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "white";
          ctx.fillText(label, node.x, node.y);

          node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          ctx.fillStyle = color;
          const bckgDimensions: [number, number] = node.__bckgDimensions;
          bckgDimensions &&
            ctx.fillRect(
              node.x - bckgDimensions[0] / 2,
              node.y - bckgDimensions[1] / 2,
              ...bckgDimensions
            );
        }}
      />
    </>
  );
}
