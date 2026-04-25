import { Outlet, useLocation } from 'react-router-dom';
import Layout from './presentation/pages/Layout';
import { useEffect } from 'react';


function App() {
  const location = useLocation();

  useEffect(() => {
    const page = location.pathname.split('/').pop();

    document.title = `CRM Center${' - '+page || ''}`;
  }, [location]);

  return (
    <>
      <Layout>
          <Outlet />
      </Layout>
    </>
  )
}

export default App
