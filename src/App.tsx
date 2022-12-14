import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './layouts/Header';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ProfilePage from './pages/Profile';
import Sign from './pages/Sign';
import CreateProfilePage from './pages/CreateProfile';
import EmailVerificationPage from './pages/EmailVerification';
import MyTemplatesPage from './pages/MyTemplates';
import CreateTemplatePage from './pages/CreateTemplate';

function App() {

  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="about">
            <Route index element={<AboutPage/>}/>
            <Route path=":number" element={<AboutPage/>}/>
          </Route>
          <Route path="templates">
            <Route index element={<MyTemplatesPage/>}/>
            <Route path="create" element={<CreateTemplatePage/>}/>
          </Route>
          <Route path="/sign" element={<Sign/>}/>
          <Route path="profile">
            <Route index element={<ProfilePage/>}/>
            <Route path="create" element={<CreateProfilePage/>}/>
            <Route path="verify" element={<EmailVerificationPage/>}/>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
