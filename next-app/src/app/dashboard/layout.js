import { MyBreadcrumb } from "@/components/Breadcrumb";
import { MySidebar } from "@/components/Sidebar";

export const metadata = {
  title: "Dashboard | SmartGro",
  description: "IOT",
};

export default function RootLayout({ children }) {
  return (
    <div className="w-full min-h-screen h-screen flex flex-row">
        <MySidebar />
        <div className="p-5 flex flex-col bg-slate-200 h-fit">
            <MyBreadcrumb />
            <div className="mt-5">
                {children}
            </div>    
        </div>
    </div>
  );
}
