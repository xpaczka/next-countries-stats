import { FC } from 'react';
import { CountryType } from '@/types';
import ListElement from './ListElement';

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
          url={country.url}
        />
      ))}
    </ul>
  );
};

export default List;
