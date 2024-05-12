import { MyBreadcrumb } from "@/components/Breadcrumb";
import { MySidebar } from "@/components/Sidebar";
import { DefaultSidebar } from "@/components/Sidebar2";

export const metadata = {
  title: "Dashboard | SmartGro",
  description: "IOT",
};

export default function RootLayout({ children }) {
  return (
    <div className="w-full min-h-screen h-screen flex flex-row">
        <DefaultSidebar />
        <div className="p-5 w-full flex flex-col bg-gray-50 h-fit">
            <MyBreadcrumb />
            <div className="mt-5 h-fit">
                {children}
            </div>    
        </div>
    </div>
  );
}
