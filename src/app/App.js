import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary'

import Home from "./Home";
import Wizard from "./Wizard";
import WizardStep from './WizardStep'
import Recommendation from './Recommendation'
import ErrorFallback from './ErrorFallback'

function App() {
  return (
    <>
      <header>
        <div className="layoutContainer">
          <h1>Brand new insurance experience</h1>
          <p>Let's get you a recommendation in seconds!</p>
        </div>
      </header>
      <section>
        <div className="layoutContainer">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Routes basename={process.env.PUBLIC_URL}>
              <Route path="/" element={<Home />} />
              <Route path="wizard" element={<Wizard />}>
                <Route path=":step" element={<WizardStep />} />
              </Route>
              <Route path="recommendation" element={<Recommendation />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </section>
    </>
  );
}

export default App;
