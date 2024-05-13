import LineChart from "@/components/LineChart";

export const metadata = {
    title: 'History | SmartGro'
}

const HistoryPage = () => {
    return ( 
        <div className="w-full flex flex-col">
            <LineChart />
        </div>
     );
}
 
export default HistoryPage;