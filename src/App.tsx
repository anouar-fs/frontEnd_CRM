import { Outlet, useLocation } from 'react-router-dom';
import Layout from './presentation/pages/Layout';
import { Suspense } from 'react';
import Loading from './presentation/pages/Loading';


function App() {

  const location = useLocation(); 
  return (
    <>
      <Layout>
        <Suspense key={location.key} fallback={<Loading/>}>
          <Outlet />
        </Suspense>
      </Layout>
    </>
  )
}

export default App
