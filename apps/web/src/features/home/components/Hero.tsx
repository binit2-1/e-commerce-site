import { Link } from "react-router-dom";
import { paths } from "../../../app/paths";
import landingImage from "../../../assets/imgs/landingImage.png";
import Container from "../../../components/layout/Container";

const stats = [
  { value: "200+", label: "International Brands" },
  { value: "2,000+", label: "High-Quality Products" },
  { value: "30,000+", label: "Happy Customers" },
];

const Hero = () => (
  <section className="relative overflow-hidden bg-hero">
    <img
      src={landingImage}
      alt=""
      className="mt-6 h-[400px] w-full object-cover object-[78%_center] lg:absolute lg:inset-0 lg:z-0 lg:mt-0 lg:h-full lg:object-right"
    />
    <Container className="relative z-10 order-first pt-10 lg:flex lg:min-h-[663px] lg:items-center lg:py-16 lg:pt-16">
      <div className="lg:max-w-[600px]">
        <h1 className="font-display text-4xl leading-[1.05] lg:text-[64px]">
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h1>
        <p className="mt-5 max-w-[545px] text-sm text-black/60 lg:mt-8 lg:text-base">
          Browse through our diverse range of meticulously crafted garments, designed to bring out your
          individuality and cater to your sense of style.
        </p>
        <Link
          to={paths.shop}
          className="mt-6 block rounded-full bg-black px-14 py-3.5 text-center font-body-medium text-white hover:bg-black/85 sm:inline-block lg:mt-8"
        >
          Shop Now
        </Link>

        <dl className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:mt-12 lg:justify-start lg:gap-x-8">
          {stats.map((s, i) => (
            <div key={s.label} className={`${i > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""} ${i === 2 ? "w-full text-center lg:w-auto lg:text-left" : ""}`}>
              <dt className="font-body-bold text-2xl lg:text-[40px]">{s.value}</dt>
              <dd className="text-xs text-black/60 lg:text-base">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Container>
  </section>
);

export default Hero;
