import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="page-grud">
        <Routes>
          <Route path="/*" element={<Navigate replace to="/" />} />
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
