import { Route, Routes } from 'react-router-dom';
import Authentication from './routes/Authentication/authentication.component';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
// import SignIn from './routes/Sign-in/sign-in.component';

const App = () => {
  const Shop = () => {
    return <h1>I am the shop page</h1>;
  };
return (
  <Routes>
    <Route path='/' element={<Navigation/>}>
    <Route index element={<Home/>}/>
    <Route path="shop" element={<Shop/>}/>
    <Route path="auth" element={<Authentication/>}/>
    </Route>
    
  
  </Routes>
)
};

export default App;
