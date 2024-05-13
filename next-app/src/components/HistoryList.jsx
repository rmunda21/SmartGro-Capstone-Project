import LineChart from "./LineChart";

const HistoryList = () => {
    return ( 
        <div className="w-full flex flex-col">
            <LineChart title={'Temperature'} />
        </div>
     );
}
 
export default HistoryList;