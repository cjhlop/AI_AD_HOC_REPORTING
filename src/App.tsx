import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AIChat from './pages/AIChat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AIChat />} />
      </Routes>
    </Router>
  );
}

export default App;