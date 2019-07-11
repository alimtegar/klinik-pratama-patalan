import React from 'react';
import { BrowserRouter} from 'react-router-dom';

// Components
import ContextsProvider from './contexts-provider/ContextsProvider';
import Layout from './components/layout/Layout';

function App() {
  return (
    <ContextsProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ContextsProvider>
  );
}

export default App;