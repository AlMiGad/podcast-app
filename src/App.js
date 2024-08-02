import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//VIEWS
import Dashboard from "./views/Dashboard";

//PAGES
import Home from "./pages/Home"
import Podcast from "./pages/Podcast"
import { useState } from 'react';

const routes = [
  {
    path: "*",
    name: "Dashboard",
    component: Home
  },
  {
    path: "/podcast/:podcastId",
    name: "Podcast",
    component: Podcast
}
]

function App() {

  const [loading, setLoading] = useState(false);

  return (
    <BrowserRouter>
      <Dashboard loading={loading}>
        <Routes>
          {
            routes.map((route, index) => {
              return(<Route key={`routeKey-${index}`} path={route.path} element={<route.component handleLoading={ (status) => {setLoading(status)}}/>} />);
            })
          }
        </Routes>
      </Dashboard>
    </BrowserRouter>
  );
}

export default App;
