import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Users from './user/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import MainNavigation from './shared/components/Navigation/MainNavigation'; 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      userId: userId,
      login: login, 
      logout: logout}}>
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Users /> : <Navigate to="/auth" />} />
            <Route path="/:userId/places" element={isLoggedIn ? <UserPlaces /> : <Navigate to="/auth" />} />
            <Route path="/places/new" element={isLoggedIn ? <NewPlace /> : <Navigate to="/auth" />} />
            <Route path="/places/:placeId" element={isLoggedIn ? <UpdatePlace /> : <Navigate to="/auth" />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
