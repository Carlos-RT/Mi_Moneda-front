import { Routes, Route } from "react-router-dom";
import Inicio from "./components/Inicio";
import Meta from "./components/Meta";
import Bancos from "./components/Bancos";

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/meta" element={<Meta />} />
      <Route path="/bancos" element={<Bancos />} />
    </Routes>
  );
}
