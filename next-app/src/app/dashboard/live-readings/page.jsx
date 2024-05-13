import Script from 'next/script'
import ReadingList from "@/components/ReadingList";

export const metadata = {
    title: 'Live Readings | SmartGro'
}

const LiveReadingPage = () => {
    return ( 
        <div>
            <ReadingList />
        </div>
     );
}
 
export default LiveReadingPage;