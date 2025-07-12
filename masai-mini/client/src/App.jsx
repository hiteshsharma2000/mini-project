import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBooks from './pages/MyBooks';
import Navbar from './components/Navbar';
import NotFound from './components/Notfound';

const App = () => {
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <div className="p-4 max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-books" element={<MyBooks />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
