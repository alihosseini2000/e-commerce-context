import SwiperGrid from "@/components/SwiperGrid";

export default function Home() {
  return (
    <div className="container padding-container mt-6">
      <h1 className="bold-32">ECommerce fake store</h1>
      <div className="mt-8">
        <h2 className="bold-24 mb-4">Newest Products</h2>
        <SwiperGrid />
      </div>
    </div>
  );
}
