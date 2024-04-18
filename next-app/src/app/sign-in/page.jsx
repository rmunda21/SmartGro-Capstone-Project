import SignInForm from "@/components/SignInForm";

const SignInPage = () => {
    return ( 
        <div className="w-full h-screen">
            {/* <h1>Sign In Page</h1> */}
            <div className="flex flex-row h-full">
                <div className="flex flex-col relative bg-white items-center justify-center p-5 w-full lg:w-3/4">
                    {/* <img className="absolute right-0 top-0 p-5" src="/icons/logo.svg" alt="SmartGro Logo" width={100}/> */}
                    <div className="flex flex-col items-center mb-5">
                        <h1 className="text-3xl font-bold mb-1">Sign In</h1>
                        <p>Welcome back!</p>
                    </div>

                    <div className="w-5/6">
                        <SignInForm />
                    </div>
                    <p className="mt-3">Don't have an account? <span className="opacity-75"><a className="underline" href="/sign-up">sign up</a></span></p>
                    
                </div>
                <div className="flex flex-col relative justify-center items-center w-0 md:w-full bg-slate-100">
                    <img className="w-full h-screen object-cover opacity-85 brightness-50" src="/images/agriculture_bg_2.jpg" alt="Agricultural Landscape Image"/>
                    <div className="absolute flex flex-col justify-center items-center text-white p-10">
                        <h1 className="text-5xl text-center font-bold mb-5">SmartGro IOT Greenhouse</h1>
                        <p className="text-2xl text-center p-5">Unlock Jamaica's Green Potential with SmartGro: Precision Farming for Every Crop!</p>
                    </div>
                    {/* <p>Unlock Jamaica's Green Potential with SmartGro: Precision Farming for Every Crop!</p> */}
                </div>
            </div>
            
            
        </div>
     );
}
 
export default SignInPage;