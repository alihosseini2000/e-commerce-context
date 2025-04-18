'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  title: string;
  slug: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, title, slug }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-5 w-full">
      <Image
        src={mainImage}
        alt={title}
        width={1000}
        height={1000}
        className="w-full h-auto object-cover rounded-md transition-all duration-300"
        priority
      />
      <div className="flex gap-5 flex-wrap">
        {images.map((imgUrl, i) => (
          <Image
            key={`${slug}-thumb-${i}`}
            src={imgUrl}
            alt={`${slug}-thumb-${i}`}
            width={100}
            height={100}
            className={`rounded-lg cursor-pointer border-2 ${
              mainImage === imgUrl ? 'border-orange-600' : 'border-transparent'
            }`}
            onClick={() => setMainImage(imgUrl)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
