import { Routes, Route } from "react-router-dom";
//Components
import Footer from "./components/Footer";
import Heading from "./components/Heading";
import Nav from "./components/Nav";
//Routes
import Main from "./pages/Main";
import NewsDetail from './pages/NewsDetail'
import NewsCategory from "./pages/NewsCategory";
//Style
import './assets/scss/main.scss';
import Currency from "./pages/Currency";

function App() {
  return (
    <div className="app">
      <Heading />
      <Nav />
      <Routes>
        <Route path="/currency" element={ <Currency />} />
        <Route path='/' element={ <Main />} />
        <Route path='/:category' element={ <NewsCategory  /> } />
        <Route path='/:category/:id' element={ <NewsDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
