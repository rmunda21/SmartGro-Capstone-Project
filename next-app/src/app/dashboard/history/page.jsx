import HistoryList from "@/components/HistoryList";

export const metadata = {
    title: 'History | SmartGro'
}

const HistoryPage = () => {
    return ( 
        <div className="w-full flex flex-col">
            <HistoryList />
        </div>
     );
}
 
export default HistoryPage;