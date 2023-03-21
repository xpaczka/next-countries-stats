import Link from 'next/link';
import Image from 'next/image';

const ErrorPage = () => {
  return (
    <div className='h-screen w-screen text-center flex flex-col items-center justify-center'>
      <div className='mb-3'>Something went wrong.</div>
      <Link className='text-lg flex items-center' href='/'>
        <Image src='back-button.svg' alt='Back Button' width={24} height={24} />
        <p className='text-lg ml-3'>Return to homepage</p>
      </Link>
    </div>
  );
};

export default ErrorPage;
