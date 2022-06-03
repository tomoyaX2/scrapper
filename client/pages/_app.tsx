import { appWithTranslation } from 'next-i18next';
import { withScope } from '@shared/lib/next';
import { App } from '../src/app/index';
import 'rsuite/dist/rsuite.min.css';
import '../src/app/app.scss';

export default appWithTranslation(withScope(App));
