import { FC, useState } from 'react';

type SortingType = boolean | null;

interface ListCategoryProps {
  name: string;
  className?: string;
}

const ListCategory: FC<ListCategoryProps> = ({ name, className }) => {
  const [sortingDirection, setSortingDirection] = useState<SortingType>(null);

  return (
    <div className={`text-center cursor-pointer ${className}`}>
      <p>{name}</p>
    </div>
  );
};

export default ListCategory;
