import { Link } from "react-router-dom";
import { paths } from "../../../app/paths";
import casualImage from "../../../assets/imgs/casual.png";
import formalImage from "../../../assets/imgs/formal.png";
import gymImage from "../../../assets/imgs/gym.png";
import partyImage from "../../../assets/imgs/party.png";
import Container from "../../../components/layout/Container";

const tiles = [
  { style: "casual", label: "Casual", src: casualImage, span: "lg:col-span-2" },
  { style: "formal", label: "Formal", src: formalImage, span: "lg:col-span-3" },
  { style: "party", label: "Party", src: partyImage, span: "lg:col-span-3" },
  { style: "gym", label: "Gym", src: gymImage, span: "lg:col-span-2" },
];

const DressStyleSection = () => (
  <section className="py-6 lg:py-10">
    <Container>
      <div className="rounded-[20px] bg-surface px-6 py-10 lg:rounded-[40px] lg:px-16 lg:py-[70px]">
        <h2 className="text-center font-display text-3xl lg:text-5xl">BROWSE BY DRESS STYLE</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:mt-16 lg:grid-cols-5 lg:gap-5">
          {tiles.map((t) => (
            <Link
              key={t.style}
              to={`${paths.shop}?style=${t.style}`}
              className={`relative block h-[190px] overflow-hidden rounded-[20px] bg-white lg:h-[289px] ${t.span}`}
            >
              <span className="absolute left-6 top-4 z-10 font-body-bold text-2xl lg:left-9 lg:top-6 lg:text-4xl">
                {t.label}
              </span>
              <img src={t.src} alt="" className="h-full w-full object-cover object-right" />
            </Link>
          ))}
        </div>
      </div>
    </Container>
  </section>
);

export default DressStyleSection;
