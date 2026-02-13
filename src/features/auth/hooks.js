import { useState } from 'react';
import { login as loginApi } from './api';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const data = await loginApi(email, password);
      alert('로그인 성공!');
    } catch (err) {
      alert('로그인 실패: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
};