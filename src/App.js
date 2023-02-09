import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Newpost from "./components/Newpost";
import EditPost from "./components/Editpost";
import Postpage from "./components/Postpage";
import About from "./components/About";
import Notfound from "./components/Notfound";

function App() {
  return (
    <div>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Newpost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/post/:id" element={<Postpage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
