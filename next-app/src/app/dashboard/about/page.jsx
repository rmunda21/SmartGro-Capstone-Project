import { AboutCarousel } from "@/components/AboutCarousel";
import { AboutFooter } from "@/components/Footer";

const AboutPage = () => {
    return ( 
        <div className="w-full flex flex-col">
            <AboutCarousel />
            <AboutFooter />
        </div>
     );
}
 
export default AboutPage;