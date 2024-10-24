import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext.jsx";
import HomePage from './pages/HomePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import ProductsFormPage from './pages/ProductsFormPage.jsx'
import NotesPage from "./pages/NotesPage.jsx";
import NotesFormPage from "./pages/NotesFormPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { ProductsProvider } from "./context/ProductsContext.jsx";
import { NotesProvider } from "./context/NotesContext.jsx";
import Navbar from "./components/Navbar.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
      <NotesProvider>
        <BrowserRouter>
          <main className="container mx-auto px-8">
            <Navbar />
            <Routes>
              <Route path='/' element={<HomePage/>} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              
              {/*Seccion de Rutas protegidas*/}
              <Route element={<ProtectedRoute />}>
                <Route path='/profile' element={<ProfilePage/>} />
                <Route path='/products' element={<ProductsPage/>} />
                <Route path='/add-product' element={<ProductsFormPage/>} />
                <Route path='/products/:id' element={<ProductsFormPage/>} />
                <Route path='/notes' element={<NotesPage/>} />
                <Route path='/add-note' element={<NotesFormPage/>} />
                <Route path='/notes/:id' element={<NotesFormPage/>} />
              </Route>
              
              {/* Ruta para 404 not found y redireccion */}
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </main>  
        </BrowserRouter>
        </NotesProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;