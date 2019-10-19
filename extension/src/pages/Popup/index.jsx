import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './Popup.css';

const App = () => <Popup />;
render(<App />, window.document.querySelector('#app-container'));
