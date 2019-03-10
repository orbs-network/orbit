import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Root } from './Root';

chrome.tabs.query({ active: true, currentWindow: true }, tab => {
  ReactDOM.render(<Root />, document.getElementById('root'));
});
