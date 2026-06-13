import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import { getCurrentUser } from './redux/authRedux/authActions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPrompts } from './redux/promptRedux/promptAction.js';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch thunks directly; let Redux Toolkit handle the fetch states
    dispatch(getPrompts());
    
    // Check if token exists before trying to fetch current user to save unnecessary requests
    if (localStorage.getItem("token")) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen relative overflow-hidden font-sans">
      {/* Background Glowing Blobs */}
      <div className="glow-blob glow-purple top-10 left-10"></div>
      <div className="glow-blob glow-blue top-1/2 right-10"></div>
      <div className="glow-blob glow-cyan bottom-10 left-1/3"></div>

      <div className="relative z-10">
        <Toaster />
      </div>
      <Header />
      <main className="pt-16 min-h-screen relative z-10">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
