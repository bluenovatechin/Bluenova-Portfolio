// Used at build time only: renders the page to static HTML so search engines and
// AI tools that don't run JavaScript still see the full content.
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export function render() {
  return renderToString(<App />);
}
