
import LandingPage from './pages/LandingPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    element: <div>404</div>,
    path: "*",
  }
]);

function App() {
 
  return (
    <RouterProvider router={router} />
  );
}

export default App;
