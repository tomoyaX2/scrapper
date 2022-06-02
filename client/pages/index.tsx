import { Home } from '@routes/home';
import { homePage } from '@routes/home/home.model';
import { createGSSP } from '@shared/lib/next/gssp';

const Page = () => <Home />;

const getServerSideProps = createGSSP(homePage.enter);

export default Page;
export { getServerSideProps };
