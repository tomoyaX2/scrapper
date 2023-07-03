import Link from 'next/link';

const Footer = (): JSX.Element => (
  <footer className='flex flex-row lg:px-16 lg:py-8 xsm:px-8 xsm:py-4 bg-primary bottom-0 left-0 w-full justify-between items-center '>
    <div className='flex flex-col items-start justify-start xsm:mr-4 '>
      <span className='lg:text-sm xsm:text-xs xsm:mb-3'>
        Support E-mail: xHentaisupp@gmail.com{' '}
      </span>

      <span className='lg:text-xs xsm:text-xs'>
        Feel free to write for questions, bug reports or proposals
      </span>
    </div>
    <span className='lg:text-md xsm:text-sm'>
      <u>
        <Link href='/policy'>Our Policy</Link>
      </u>
    </span>
  </footer>
);

export { Footer };
