import { CountryType } from "@/types";
import Image from "next/image";
import { FC } from "react";

const CountryBorders: FC<{borders: CountryType[]}> = ({borders}) => {
    return (
        <div className='p-3 sm:px-5'>
        <p className='font-bold'>Bordering countries</p>
        <div className='flex flex-wrap'>
          {borders.map((border: CountryType) => {
            return (
              <div key={border.cca2} className='w-full sm:w-1/2 md:w-1/3 sm:px-5 flex flex-col items-center mt-5'>
                <div className='h-28 flex items-center'>
                    <Image 
                    src={border.flags.svg} 
                    alt={border.flags.alt || border.name.common} 
                    width={120} 
                    height={90} 
                    className='rounded-lg object-contain border border-solid border-black'
                    />
                </div>
                <p className='text-center'>{border.name.common}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
};

export default CountryBorders;