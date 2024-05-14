'use client'

import { Carousel, Typography } from "@material-tailwind/react";
 
export function AboutCarousel() {
  return (
    <Carousel
      autoplay={true}

      className="rounded-xl"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <div className="relative h-full w-full">
      <img
        src="/images/smartgro_1.jpeg"
        alt="image 1"
        className="h-full w-full object-cover"
      />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/35">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              SmartGro IOT
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              SmartGro endeavors to reduce dependency on imports and address the limited diversity in locally cultivated crops by developing a system that can sustain optimal environmental conditions for various crops, regardless of Jamaica's local climate.
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
      <img
        src="/images/smartgro_2.jpeg"
        alt="image 2"
        className="h-full w-full object-cover"
      />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            {/* <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              SmartGro IOT
            </Typography> */}
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
            We promote seamless, efficient crop cultivation and aspire to bring newfound convenience and simplicity to the fundamental practice of farming.
            </Typography>
          </div>
        </div>
      </div>
     
      <img
        src="/images/smartgro_3.jpeg"
        alt="image 3"
        className="h-full w-full object-cover"
      />
    </Carousel>
  );
}