import { useState } from 'react';
import { login as loginApi } from './api';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const data = await loginApi(email, password);
      if (data) {
      alert('로그인 성공!');
      navigate('/main');
      } 
    } catch (err) {
      console.error("Login Error Details:", err);
      alert('로그인 실패: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear(); 
    alert('로그아웃 되었습니다.');
    navigate('/login');
  };

  return { handleLogin, handleLogout, loading };
};