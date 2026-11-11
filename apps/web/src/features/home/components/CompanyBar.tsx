import calvinKlein from "../../../assets/imgs/calvin-klein.png";
import gucci from "../../../assets/imgs/gucci.png";
import prada from "../../../assets/imgs/prada.png";
import versace from "../../../assets/imgs/versace.png";
import zara from "../../../assets/imgs/zara.png";
import Container from "../../../components/layout/Container";

const brands = [
  { name: "Versace", src: versace },
  { name: "Zara", src: zara },
  { name: "Gucci", src: gucci },
  { name: "Prada", src: prada },
  { name: "Calvin Klein", src: calvinKlein },
];

const CompanyBar = () => (
  <section className="bg-black py-9 lg:py-10">
    <Container className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:justify-between">
      {brands.map((b) => (
        <img key={b.name} src={b.src} alt={b.name} className="h-5 w-auto lg:h-8" />
      ))}
    </Container>
  </section>
);

export default CompanyBar;
