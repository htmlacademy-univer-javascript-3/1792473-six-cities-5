import ReactDOM from 'react-dom/client';
import {App} from './App.tsx';
import {curUser, data} from './Mocks/offers.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App data={data} currentUser={curUser} />
);
