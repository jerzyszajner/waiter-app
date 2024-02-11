import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home.js';
import Table from './components/pages/Table/Table.js';
import PageNotFound from './components/pages/PageNotFound/PageNotFound.js';
import Container from 'react-bootstrap/Container';
import Header from './components/views/Header/Header.js';
import Footer from './components/views/Footer/Footer.js';
import { fetchTables } from './redux/tablesRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch]);

  return (
    <div className="app-background">
      <Container>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/table/:id' element={<Table />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Container>
    </div>
  );
}

export default App;