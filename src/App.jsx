import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import HomePage from './pages/Home/Home';
import CatalogPage from './pages/Catalog/Catalog';
import DetailPage from './pages/Detail/Detail';
import './styles/global.css';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/catalog"    element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<DetailPage />} />
        {/* 404 fallback */}
        <Route path="*" element={
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            minHeight:'60vh', gap:'16px', color:'var(--color-text-muted)', fontFamily:'Inter,sans-serif' }}>
            <span style={{ fontSize:'64px' }}>🚐</span>
            <h2 style={{ fontSize:'24px', color:'var(--color-text)' }}>Page not found</h2>
            <a href="/" style={{ color:'var(--color-primary)', fontWeight:600 }}>Go home</a>
          </div>
        } />
      </Routes>
    </>
  );
}
