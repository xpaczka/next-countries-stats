import { CountriesContext } from '@/context';
import { FC, useContext, useState } from 'react';

interface ListCategoryProps {
  name: string;
  className?: string;
}

const ListCategory: FC<ListCategoryProps> = ({ name, className }) => {
  const { sortCountriesByCategory } = useContext(CountriesContext);
  const [sortingDirection, setSortingDirection] = useState<boolean | null>(null);

  const sortingHandler = () => {
    if (name === 'capital') return;
    console.log(sortingDirection);

    setSortingDirection(prevDirection => {
      switch (prevDirection) {
        case true:
          return false;
        case false:
          return null;
        case null:
          return true;
      }
    });

    sortCountriesByCategory(name.toLowerCase(), sortingDirection);
  };

  return (
    <div className={`text-center cursor-pointer ${className}`}>
      <p onClick={sortingHandler}>{name}</p>
    </div>
  );
};

export default ListCategory;
