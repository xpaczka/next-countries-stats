import { FC } from 'react';
import ListElement from './ListElement';
import { CountryType } from '@/types';

const List: FC<{ countries: CountryType[] }> = ({ countries }) => {
  return (
    <ul>
      {countries.map(country => (
        <ListElement
          key={country.cca2}
          name={country.name}
          flags={country.flags}
          population={country.population}
          area={country.area}
          capital={country.capital}
        />
      ))}
    </ul>
  );
};

export default List;
