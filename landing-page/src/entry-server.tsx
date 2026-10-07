import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
export { templateData } from './data/templateData';

export function render() {
  return renderToString(<React.StrictMode><App /></React.StrictMode>);
}
