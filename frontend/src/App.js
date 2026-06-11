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
    <div>
      <div><Toaster /></div>
      <Header />
      <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
