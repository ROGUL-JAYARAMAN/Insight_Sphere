import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import SignIn from "../src/Login_Page/Components/Sign_In";
import SignUp from "../src/Login_Page/Components/Sign_Up";
import Home from "./Kanban_Board/Component/Home";
import KanbanBoard from "./Kanban_Board/Component/KanbanBoard";
import Contact from "./Kanban_Board/Component/Contact";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/KanbanBoard" element={<KanbanBoard />}></Route>
          <Route path="/Contact" element={<Contact />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
