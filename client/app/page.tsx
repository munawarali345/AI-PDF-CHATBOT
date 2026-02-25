import FileUpload from "@/components/FileUploads";
import ChatComponent from "@/components/ChatComponent";

export default function Home() {
  return (
    <div className="flex h-screen w-screen overflow-hidden m-0 p-0">
      <div className="w-[30%] h-full border-r-0 m-0 p-0"> 
        <FileUpload />
      </div>
      <div className="w-[70%] h-full m-0 p-0"> 
        <ChatComponent />
      </div>
    </div>
  );
}
