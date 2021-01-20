import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './Home'
import Wizard from './Wizard'

function App() {
  return (
    <Router>
      <header>
        <div className="layoutContainer">
          <h1>Brand new insurance experience</h1>
          <p>Let's get you a recommendation in seconds!</p>
        </div>
      </header>
      <section>
        <div className="layoutContainer">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="wizard">
              <Route path=":step" element={<Wizard />} />
            </Route>
          </Routes>
        </div>
      </section>
    </Router>
  );
}

export default App;
