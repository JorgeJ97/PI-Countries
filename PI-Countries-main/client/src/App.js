import {Route, useLocation} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import { Landing, Home, Detail, Form } from "./views";
import { useState } from 'react';
import './App.css'





function App() {
  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 10;
  const lastIndex = currentPage * countriesPerPage
  const firstIndex = lastIndex - countriesPerPage

  const handlePageChange = (number) =>{
    setCurrentPage(number)
}

  return (
    <div className="home">
      
      {location.pathname !== '/' && <NavBar handlePageChange={handlePageChange}  
      lastIndex={lastIndex} firstIndex={firstIndex}/>}
      <Route  exact path = '/' render = {() => <Landing /> } />
      <Route path = '/home' render = {() => <Home handlePageChange={handlePageChange} currentPage={currentPage} countriesPerPage={countriesPerPage}
      lastIndex={lastIndex} firstIndex={firstIndex}/> } 
      />
      <Route path = '/detail/:id' render = {() => <Detail /> } />
      <Route path = '/create' render = {() => <Form /> } />
      
    </div>
  );
}

export default App;
