import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const user = useSelector((state) => state.auth.user);
  return (
    <BrowserRouter>
    {user && <Navbar />}
      <Routes>
       <Route
            path="/"
                  element={
        
               <Products />
          
           }
       />

         <Route
             path="/products/:id"
                element={
                  
                          <ProductDetails />
                  
                }
                        />
            <Route
                    path="/cart"
              element={
                <ProtectedRoute>
                    <Cart />
                </ProtectedRoute>
              }
            />

            <Route
                   path="/checkout"
               element={
                    <ProtectedRoute>
                       <Checkout />
              </ProtectedRoute>
             }
            />

            <Route
                    path="/wishlist"
                    element={
                   <ProtectedRoute>
                      <Wishlist />
                    </ProtectedRoute>
                   }
            />

            <Route
                    path="/orders"
                    element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                 }
            />

                    <Route
                        path="/login"
                        element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />

                <Route
                     path="/register"
                       element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

             <Route
                  path="/profile"
                     element={
             <ProtectedRoute>
                  <Profile />
             </ProtectedRoute>
  }
/>
      </Routes>
      <ToastContainer /> 
    </BrowserRouter>
  );
}

export default App;