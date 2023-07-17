import Link from 'next/link';

const Footer = (): JSX.Element => (
  <footer className='flex flex-row lg:px-16 lg:py-8 xsm:px-8 xsm:py-4 bg-primary bottom-0 left-0 w-full h-12 justify-between items-center '>
    <span className='flex flex-col items-start justify-start xsm:mr-4 lg:text-sm xsm:text-xs'>
      Support E-mail: xHentaisupp@gmail.com{' '}
    </span>

    <span className='lg:text-md xsm:text-sm'>
      <u>
        <Link href='/policy'>Our Policy</Link>
      </u>
    </span>
  </footer>
);

export { Footer };
