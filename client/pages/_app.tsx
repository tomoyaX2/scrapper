import '../src/app/app.scss';
import '../styles/global.css';
import 'rsuite/dist/rsuite.min.css';
import { appWithTranslation } from 'next-i18next';
import { withScope } from '@shared/lib/next';
import { App } from '../src/app/index';

export default appWithTranslation(withScope(App));
