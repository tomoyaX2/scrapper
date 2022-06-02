import { createView } from '@shared/lib/view';
import styles from './home.module.scss';

const props = {};

const Home = createView()
  .props(props)
  .view(() => (
    <div className={styles.container}>
      <div>KEK</div>
    </div>
  ));

export { Home };
