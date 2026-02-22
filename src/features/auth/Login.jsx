import React, { useState } from 'react';
import { useAuth } from './hooks';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, loading } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  const GOOGLE_AUTH_URL = "http://localhost:8080/oauth2/authorization/google";
  const KAKAO_AUTH_URL = "http://localhost:8080/oauth2/authorization/kakao";

  return (
    <div style={{ padding: '20px' }}>
      <h2>비트그램 로그인</h2>

      <form onSubmit={onSubmit}>
        <div>
          <input 
            type="email" 
            placeholder="이메일" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <input 
            type="password" 
            placeholder="비밀번호" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" disabled={loading} style={{ marginTop: '10px' }}>
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>

      <hr style={{ margin: '20px 0' }} />

      {/* 소셜 로그인 버튼 영역 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        <a href={GOOGLE_AUTH_URL} style={buttonStyle('#ffffff', '#000000', '#ddd')}>
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" style={{width: '20px', marginRight: '10px'}} />
          구글로 로그인
        </a>
        
        <a href={KAKAO_AUTH_URL} style={buttonStyle('#fee500', '#000000')}>
          <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/W6w4du0WzVxK0D0pU1DOK1/o.jpg" alt="Kakao" style={{width: '20px', marginRight: '10px'}} />
          카카오로 로그인
        </a>
      </div>
    </div>
  );
};

const buttonStyle = (bgColor, textColor, border = 'none') => ({
  backgroundColor: bgColor,
  color: textColor,
  border: border === 'none' ? 'none' : `1px solid ${border}`,
  padding: '10px 20px',
  borderRadius: '5px',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '200px',
  fontSize: '14px',
  fontWeight: 'bold'
});

export default Login;