import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/Footer";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import Gig from "./pages/gig/Gig";
import Gigs from "./pages/gigs/Gigs";
import Login from "./pages/login/Login";
import Message from "./pages/message/Message";
import Messages from "./pages/messages/Messages";
import MyGigs from "./pages/myGigs/MyGigs";
import Orders from "./pages/orders/Orders";

import "./App.scss";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
const queryClient = new QueryClient();
function App() {
  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <Navbar />
          <Outlet />
          {/* outlet is used for childeren passing in the layout  */}
          <Footer />
        </div>

        </QueryClientProvider>
    
    );
  };
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/mygigs",
          element: <MyGigs />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
