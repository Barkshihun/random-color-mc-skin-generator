import Output from "./pages/Output";
import Home from "./pages/Home";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import "./App.css";

function App() {
  const getIsGenerated = (state: RootState) => state.isGenerated.value;
  const isGeneratedSelector = createSelector(getIsGenerated, (isGenerated) => isGenerated);
  return <main className="flex justify-center h-screen bg-gradient-to-br from-slate-100  to-gray-400">{!useSelector(isGeneratedSelector) ? <Home /> : <Output />}</main>;
}

export default App;
