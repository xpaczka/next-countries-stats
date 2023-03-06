import { FC, useContext } from 'react';
import ListElement from './ListElement';
import { CountriesContext } from '@/context';

const List = () => {
  const { countries } = useContext(CountriesContext);

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
