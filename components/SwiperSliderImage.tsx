"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { useRef } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const SwiperSliderImage = ({ images }: { images: string[] }) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="relative w-full">
      {/* Custom Navigation Buttons */}
      <button
        ref={prevRef}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 dark:bg-gray-800 bg-gray-300 p-2 rounded-full dark:hover:bg-gray-600 hover:bg-gray-400 transition"
      >
        <MdKeyboardArrowLeft size={28} />
      </button>
      <button
        ref={nextRef}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 dark:bg-gray-800 bg-gray-300 p-2 rounded-full dark:hover:bg-gray-600 hover:bg-gray-400 transition"
      >
        <MdKeyboardArrowRight size={28} />
      </button>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full"
        
        pagination={{ clickable: true, el: ".custom-pagination" }} // Custom pagination
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
      >
        {images.length > 0 ? (
          images.map((image) => (
            <SwiperSlide key={image}>
              <Image
                src={image || "/images/placeholder.jpg"} // ✅ Handle missing images
                alt="Slide Image"
                width={500}
                height={480}
                className="w-full h-full rounded-lg object-cover"
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p className="text-center">Loading products...</p>
          </SwiperSlide>
        )}
      </Swiper>

      {/* Custom Pagination Dots */}
      <div className="custom-pagination flex justify-center mt-4"></div>
    </div>
  );
};

export default SwiperSliderImage;
