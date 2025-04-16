"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Grid, Navigation, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";
import ProductItem, { IProductItemProps } from "./ProductItem";
import Loading from "@/app/loading";

const SwiperGrid = () => {

  const [products, setProducts] = useState<IProductItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  const sortByNewest = [...products].sort((a, b) => {
    if (a.creationAt && b.creationAt) return new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime();
    return 0; // Default (no sorting)
});

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Swiper
          modules={[Grid, Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={4}
          grid={{ rows: 1, fill: "row" }}
          navigation
          autoplay={{ delay: 3000 }}
          loop={true}
          breakpoints={{
            400: { slidesPerView: 1, grid: { rows: 1 } },
            600: { slidesPerView: 2, grid: { rows: 1 } },
            1024: { slidesPerView: 3, grid: { rows: 1 } },
            1250: { slidesPerView: 4, grid: { rows: 1 } },
          }}
          className="w-full"
        >
          {sortByNewest.length > 0 ? (
            sortByNewest.map((product) => (
              <SwiperSlide key={product.id} className="flex items-center justify-center">
                <ProductItem {...product} />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <p className="text-center text-gray-500">No products available</p>
            </SwiperSlide>
          )}
        </Swiper>
      )}
    </>
  );
};

export default SwiperGrid;
