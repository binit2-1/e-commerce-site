import React from "react";
import versace from "../assets/imgs/versace.png";
import gucci from "../assets/imgs/gucci.png";
import prada from "../assets/imgs/prada.png";
import zara from "../assets/imgs/zara.png";
import calvinKlein from "../assets/imgs/calvin-klein.png";

const CompanyBar = () => {
  return (
    <div className="absolute">
      <div className="w-screen mt-250 lg:mt-240 h-[146px] lg:h-[122px] bg-black flex items-center justify-center">
        <div className="flex flex-row flex-wrap justify-center gap-10 lg:gap-32">
            <img src={versace} alt="Versace" className="w-auto h-[20px] lg:w-auto lg:h-[40px]" />
            <img src={zara} alt="Zara" className="w-auto h-[20px] lg:w-auto lg:h-[40px]" />
            <img src={gucci} alt="Gucci" className="w-auto h-[20px] lg:w-auto lg:h-[40px]" />
            <img src={prada} alt="Prada" className="w-auto h-[20px] lg:w-auto lg:h-[40px]" />
            <img src={calvinKlein} alt="Calvin Klein" className="w-auto h-[20px] lg:w-auto lg:h-[40px]" />
        </div>
      </div>
    </div>
  );
};

export default CompanyBar;
