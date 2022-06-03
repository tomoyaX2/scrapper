import { createView } from '@shared/lib/view';

const props = {};

const Home = createView()
  .props(props)
  .view(() => <h1 className='text-3xl font-bold underline'>Hello world!</h1>);

export { Home };
