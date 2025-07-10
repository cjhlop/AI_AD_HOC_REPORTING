import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AIChat from './pages/AIChat';
import Dashboards from './pages/Dashboards';
import Reports from './pages/Reports';
import Audiences from './pages/Audiences';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AIChat />} />
        <Route path="/dashboards" element={<Dashboards />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/audiences" element={<Audiences />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;