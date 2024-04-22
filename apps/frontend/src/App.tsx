import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Landing } from './screens/Landing';
import { Game } from './screens/Game';
import Login from './screens/Login';
import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { useUser } from '@repo/store/useUser';
import { Loader } from './components/Loader';
import { Spectate } from './screens/Spectate';

function App() {
  return (
    <div className="min-h-screen bg-brown-600">
      <RecoilRoot>
        <Suspense fallback={<Loader />}>
          <AuthApp />
        </Suspense>
      </RecoilRoot>
    </div>
  );
}

function AuthApp() {
  const user = useUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={user ? <Game /> : <Login />} />
        <Route path="/game/:gameId" element={user ? <Game /> : <Login />} />
        <Route path="/spectate/:gameId" element={<Spectate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
