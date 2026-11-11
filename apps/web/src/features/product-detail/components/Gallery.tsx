import { useState } from "react";

interface GalleryProps {
  images: string[];
  alt: string;
}

const Gallery = ({ images, alt }: GalleryProps) => {
  const [index, setIndex] = useState(0);
  const main = images[index] ?? images[0];

  return (
    <div className="flex flex-col gap-3 lg:flex-row-reverse lg:gap-3.5">
      <div className="aspect-square flex-1 overflow-hidden rounded-[20px] bg-card lg:aspect-auto lg:min-h-[530px]">
        {main && <img src={main} alt={alt} className="h-full w-full object-cover" />}
      </div>
      <ul className="flex gap-3 lg:w-[152px] lg:shrink-0 lg:flex-col lg:gap-3.5">
        {images.slice(0, 4).map((src, i) => (
          <li key={src} className="flex-1 lg:flex-none">
            <button
              type="button"
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`block aspect-square w-full overflow-hidden rounded-[20px] bg-card lg:h-[152px] ${
                i === index ? "ring-1 ring-black" : "ring-0 hover:ring-1 hover:ring-black/30"
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gallery;
