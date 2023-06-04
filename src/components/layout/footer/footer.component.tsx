import Link from 'next/link';

const Footer = (): JSX.Element => (
  <footer className='flex flex-col px-4 py-8 bg-primary bottom-0 left-0 w-full'>
    <span className='text-sm'>Support E-mail: xHentaisupp@gmail.com </span>

    <div className='flex w-4/5 justify-between'>
      <span className='text-xs'>
        Feel free to write for questions, bug reports or proposals
      </span>
      <span className='text-md'>
        <Link href='/policy'>Our Policy</Link>
      </span>
    </div>
  </footer>
);

export { Footer };
