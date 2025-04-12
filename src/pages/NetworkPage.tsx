import NetworkGraph from "@/components/NetworkGraph"

export default function NetworkPage() {
    return (
      <>
        <div>
          <div className="text-center p-8 w-full">
            <span className="font-extrabold text-2xl">Welcome back Person!</span>
            <div className="bg-secondary my-10 mx-60 rounded-md">
              <NetworkGraph/>
              <span>Workspace 1</span>
            </div>
          </div>
        </div>
      </>
    );
  }
  
