import { FC } from 'react';

interface ListCategoryProps {
  name: string;
  className?: string;
}

const ListCategory: FC<ListCategoryProps> = ({ name, className }) => {
  return (
    <div className={`text-center ${className}`}>
      <p className='cursor-pointer'>{name}</p>
    </div>
  );
};

export default ListCategory;
