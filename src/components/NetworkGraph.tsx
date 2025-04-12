import { useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";

let graph = {
  nodes: [{ id: "hi", x:0,y:0 }, { id: "bye", x:0,y:0 }],
  links: [{ source: "hi", target: "bye" }],
};

export default function NetworkGraph() {  

  return (
    <>
      <ForceGraph2D
        graphData={graph}
        width={500}
        height={300}
        backgroundColor={"rgba(0,0,0,0)"}
        linkColor={() => "white"}
        onNodeClick={node => console.log(node.id)}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 20/globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions: [number, number] = [textWidth+fontSize*.2, 1.2*fontSize]; // some padding

          ctx.fillStyle = 'rgba(120, 120, 120, 1)';
          ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = "white";
          ctx.fillText(label, node.x, node.y);

          node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          ctx.fillStyle = color;
          const bckgDimensions: [number, number] = node.__bckgDimensions;
          bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
        }}
      />
    </>
  );
}
