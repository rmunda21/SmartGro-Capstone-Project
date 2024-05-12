import Script from 'next/script'
import ReadingList from "@/components/ReadingList";

const LiveReadingPage = () => {
    return ( 
        <div>
            <Script src="/js/mqttws31.js" type="text/javascript" />
            {/* <Script sr type="text/javascript"></Script> */}
            <ReadingList />
        </div>
     );
}
 
export default LiveReadingPage;