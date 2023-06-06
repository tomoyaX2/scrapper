import Link from 'next/link';

const Footer = (): JSX.Element => (
  <footer className='flex flex-row px-4 py-8 bg-primary bottom-0 left-0 w-full justify-between items-center px-16'>
    <div className='flex flex-col items-start justify-start'>
      <span className='text-sm'>Support E-mail: xHentaisupp@gmail.com </span>

      <span className='text-xs'>
        Feel free to write for questions, bug reports or proposals
      </span>
    </div>
    <span className='text-md'>
      <u>
        <Link href='/policy'>Our Policy</Link>
      </u>
    </span>
  </footer>
);

export { Footer };
