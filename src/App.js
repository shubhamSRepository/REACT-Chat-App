import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom/dist";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {

  const { currentUser } = useContext(AuthContext);


  /**This function is used to prevent anyone to see home page without login.
   * We could have used condition in <Home/> but this is more professional way.
   */
  function ProtectedRoute({ children }) {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children;
  }


  const router = createBrowserRouter(
    [
      {
        path: "/",
        children: [
          {
            index: true,
            element:
              <ProtectedRoute >
                <Home />
              </ProtectedRoute >
          },
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> }
        ]
      }
    ]
  );



  return (
    <RouterProvider router={router} />
  );
}

export default App;
