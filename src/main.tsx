import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {Router} from 'waku/router/client';

import {getErrorMessage} from './packages/utilities/index.js';
import {ErrorBoundarySingleton} from './classes/index.js';

const rootElement = (
  <StrictMode>
    <ErrorBoundarySingleton
      fallback={(error) => (
        <h1 className="main-heading">{getErrorMessage(error)}</h1>
      )}
    >
      <Router />
    </ErrorBoundarySingleton>
  </StrictMode>
);

if (import.meta.env.WAKU_HYDRATE) {
  hydrateRoot(document.body, rootElement);
} else {
  createRoot(document.body).render(rootElement);
}
