import React, { useContext } from "react";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';

import { UserContext } from "./context/userContext";
import Home from "./pages";
import Register from "./pages/register";
import Navigation from "./components/Nav";
import AddLocation from "./pages/add-location";
import Dashboard from "./pages/Dashboard";

const App = () => {

  const [token] = useContext(UserContext);

  return (
    <Router>
      <Navigation token={token} />
      <Routes>
        <Route path='/' element={(
          !token ? (
            <Home />
          ) : (
            <Dashboard />
          )
        )
        }
        />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/add-location' element={<AddLocation />} />
      </Routes>
    </Router>
  );
}

export default App;
