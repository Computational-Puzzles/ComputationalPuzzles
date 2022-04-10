import * as ReactDOMServer from 'react-dom/server';

export const renderReactToHTML = (dom: JSX.Element, full: boolean = false) => {
  let html = ReactDOMServer.renderToString(dom);
  if (full) {
    html = '<!DOCTYPE html>' + html;
  }
  return html;
};
