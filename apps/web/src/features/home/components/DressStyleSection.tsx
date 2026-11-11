import casualImage from "../../../assets/imgs/casual.png";
import formalImage from "../../../assets/imgs/formal.png";
import partyImage from "../../../assets/imgs/party.png";
import gymImage from "../../../assets/imgs/gym.png";

const DressStyleSection = () => {
  return (
      <div className="flex justify-center">
        <div className="lg:h-[866px] lg:w-[1410px] h-[975px] w-[340px] bg-[#F0F0F0] rounded-2xl lg:mt-[1800px] mt-[1670px] mb-[100px]">
          <div className="flex justify-center font-[neue-montreal-bold] mt-12 lg:mt-20 text-2xl lg:text-6xl px-16 lg:px-0 text-center">
            BROWSE BY DRESS STYLE
          </div>
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-5 lg:grid-rows-5 lg:gap-4 mt-5 lg:mt-26 mx-6">
            <div className="lg:col-span-2 lg:row-span-2">
              <div className="lg:h-[289px] h-[190px] w-full rounded-2xl relative">
                <div className="absolute top-4 left-4 text-black text-xl lg:text-2xl font-[satoshi-bold] z-10">
                  Casual
                </div>
                <img 
                  src={casualImage} 
                  alt="Casual" 
                  className="lg:h-full w-full h-[190px] rounded-2xl object-cover" 
                />
              </div>
            </div>
            
            <div className="lg:col-span-3 lg:row-span-2 lg:col-start-3">
              <div className="lg:h-[289px] h-[190px] w-full rounded-2xl relative">
                <div className="absolute top-4 left-4 text-black text-xl lg:text-2xl font-[satoshi-bold] z-10">
                  Formal
                </div>
                <img 
                  src={formalImage} 
                  alt="Formal" 
                  className="h-full w-full rounded-2xl object-cover" 
                />
              </div>
            </div>
            
            <div className="lg:col-span-3 lg:row-span-2 lg:row-start-3">
              <div className="lg:h-[289px] h-[190px] w-full rounded-2xl relative">
                <div className="absolute top-4 left-4 text-black text-xl lg:text-2xl font-[satoshi-bold] z-10">
                  Party
                </div>
                <img 
                  src={partyImage} 
                  alt="Party" 
                  className="h-full w-full rounded-2xl object-cover" 
                />
              </div>
            </div>
            
            <div className="lg:col-span-2 lg:row-span-2 lg:col-start-4 lg:row-start-3">
              <div className="lg:h-[289px] h-[190px] w-full rounded-2xl relative">
                <div className="absolute top-4 left-4 text-black text-xl lg:text-2xl font-[satoshi-bold] z-10">
                  Gym
                </div>
                <img 
                  src={gymImage} 
                  alt="Gym" 
                  className="h-full w-full rounded-2xl object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default DressStyleSection;
