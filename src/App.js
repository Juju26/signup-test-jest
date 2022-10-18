import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Page1 } from './component/Page1.jsx'
import { Header } from './component/Header.jsx';
import { Footer } from './component/Footer.jsx';
import { Form } from './component/Form.jsx';
import { UserDetails } from './component/UserDetails.jsx';
import { Welcome } from './component/Welcome.jsx';
import {Error} from "./component/Error.jsx";
export default function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route index element={<Form />} />
          <Route path="/more" element={<UserDetails />} />
          <Route path="/home" element={<Welcome />} />
          <Route path="*" element={<Error/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

// https://codesandbox.io/embed/txzui
