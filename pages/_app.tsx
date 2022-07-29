import 'rsuite/dist/rsuite.min.css';
import '../src/app/app.scss';
import { appWithTranslation } from 'next-i18next';
import { App } from '../src/app/index';

export default appWithTranslation(App);
