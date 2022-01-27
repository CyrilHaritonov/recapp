import './App.css';
import {MainComponent} from "./components/mainComponent";
import {BrowserRouter} from "react-router-dom";
import React from "react";

function App() {
  return (
    <>
        <BrowserRouter>
           <MainComponent/>
        </BrowserRouter>
    </>
  );
}

export default App;
