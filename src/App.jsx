import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route
            path="/"
                  element={
         <ProtectedRoute>
               <Products />
          </ProtectedRoute>
           }
       />

         <Route
             path="/products/:id"
                element={
                  <ProtectedRoute>
                          <ProductDetails />
                  </ProtectedRoute>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;