import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

//VIEWS
import Dashboard from "./views/Dashboard";

//PAGES
import Home from "./pages/Home"
import Podcast from "./pages/Podcast"
import Episode from "./pages/Episode"

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
  },
  {
    path: "/podcast/:podcastId/episode/:episodeId",
    name: "Episode",
    component: Episode
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
