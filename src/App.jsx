import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Chirper from './pages/Chirper';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chirper />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
