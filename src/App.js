import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import './App.css';
import CreateUser from './components/CreateUser';
import ReadUsers from './components/UserList';
import RetrieveUser from './components/RetrieveUser';

const BackgroundColor =  createGlobalStyle`
body{
  background-color: ${(props) => (props?.light ? '#f2f2f3': 'black')}; 
}
`;
const App = () => {
  return (
    <>
    <BackgroundColor light />
      <Container fluid>
       <BrowserRouter>
       <Routes>
        <Route path="/" element={<ReadUsers />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/:id" element={<RetrieveUser />} />
        {/* <Route path="/:id" element={<UpdateUser />} /> */}
        {/* <Route path="/:id" element={<DeleteUser />} /> */}
       </Routes>
       </BrowserRouter>
    </Container>
    </>
  );
};
export default App;
