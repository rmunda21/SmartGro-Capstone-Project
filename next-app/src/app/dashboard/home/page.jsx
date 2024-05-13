import HomeList from "@/components/HomeList";

export const metadata = {
    title: 'Home | SmartGro'
}

const Homepage = () => {
    return ( 
        <div className="w-full flex flex-col">
            <HomeList />
            {/* <h1 className="text-2xl font-bold">Welcome back, lets see how your crops are doing!</h1> */}
        </div>
     );
}
 
export default Homepage;