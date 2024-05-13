import { MyBreadcrumb } from "@/components/Breadcrumb";
import { MySidebar } from "@/components/Sidebar";
import { DefaultSidebar } from "@/components/Sidebar2";
import AuthRequired from "@/utils/AuthRequired";

export const metadata = {
  title: "Dashboard | SmartGro",
  description: "IOT",
};

export default function RootLayout({ children }) {
  return (
    <AuthRequired>
      <div className="w-full flex flex-row">
        <DefaultSidebar />
        <div className="p-5 w-full flex flex-col bg-gray-50 h-screen">
            <MyBreadcrumb />
            <div className="mt-5 max-h-screen overflow-y-scroll">
                {children}
            </div>    
        </div>
    </div>
    </AuthRequired>
    
  );
}
