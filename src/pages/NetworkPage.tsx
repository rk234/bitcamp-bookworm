import NetworkGraph from "@/components/NetworkGraph";

export default function NetworkPage() {
  return (
    <>
      <div className="bg-[var(--primary-foreground)] w-full h-full">
        <div className="absolute w-full text-center mt-20 z-10">
          <span className="font-extrabold text-4xl">Your Tethermap</span>
        </div>
        
        <NetworkGraph />
      </div>
    </>
  );
}
