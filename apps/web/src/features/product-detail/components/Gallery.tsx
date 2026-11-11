import { useState } from "react";

interface GalleryProps {
  images: string[];
  alt: string;
}

const Gallery = ({ images, alt }: GalleryProps) => {
  const [index, setIndex] = useState(0);
  const thumbs = images.slice(0, 3);
  const main = images[index] ?? images[0];

  return (
    <div className="flex flex-col gap-3 lg:h-[530px] lg:flex-row-reverse lg:gap-3.5">
      <div className="aspect-[358/290] overflow-hidden rounded-[20px] bg-card lg:aspect-auto lg:flex-1">
        {main && <img src={main} alt={alt} className="h-full w-full object-cover" />}
      </div>
      <ul className="flex gap-3 lg:w-[152px] lg:shrink-0 lg:flex-col lg:gap-3.5">
        {thumbs.map((src, i) => (
          <li key={src} className="flex-1 lg:min-h-0">
            <button
              type="button"
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`block aspect-[111/106] w-full overflow-hidden rounded-[20px] bg-card lg:aspect-auto lg:h-full ${
                i === index ? "ring-1 ring-black" : "hover:ring-1 hover:ring-black/30"
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
