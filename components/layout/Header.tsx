import Search from '../Search';

const Header = () => {
  return (
    <div className='container fixed left-1/2 transform -translate-x-1/2 pb-5 py-10 bg-green-400'>
      <div className='pl-5 mb-10 flex justify-between'>
        <div className='text-2xl font-bold uppercase '>Countries Stats</div>
        <Search />
      </div>
      <div className='flex items-center justify-between px-5'>
        <div className='flex-1'>Country Name</div>
        <div className='w-48 text-center'>Capital</div>
        <div className='w-36 text-center'>Population</div>
        <div className='w-36 text-center'>Area</div>
      </div>
    </div>
  );
};

export default Header;
