import { BrowserRouter, Route, Routes } from "react-router-dom";
import BalanceSheet from "./components/BalanceSheet";
import BusinessDetails from "./components/BusinessDetails";
import Result from "./components/Result";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BusinessDetails />} />
        <Route path="/balance-sheet" element={<BalanceSheet />} />
        {/* <Route path="/result" element={<Result isApproved={true} percentage={60} amount={12000}/>}/> */}
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
