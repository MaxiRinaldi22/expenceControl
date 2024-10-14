import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Balance from "./components/Balance/Balance";
import Income from "./components/Income/Inconme";
import Expenses from "./components/Expenses/Expenses";
import NavBar from "./components/NavBar";
import { InconmeContextProvider } from "./context/InconmeContextProvider";
import { ExpensesContextProvider } from "./context/ExpensesContextProvider";
import { BalanceContextProvider } from "./context/BalanceContextProvider";

function App() {
  return (
    <InconmeContextProvider>
      <ExpensesContextProvider>
        <BalanceContextProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Balance />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/about" element={<Balance />} />
              <Route path="/contact" element={<Income />} />
            </Routes>
            <NavBar />
          </Router>
        </BalanceContextProvider>
      </ExpensesContextProvider>
    </InconmeContextProvider>
  );
}

export default App;
