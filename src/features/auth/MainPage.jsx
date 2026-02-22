import React, { useEffect, useState } from 'react';
import instance from '../../lib/axios'; 

const MainPage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
    instance.get('/api/auth/me')
        .then(res => {
            console.log("서버 응답 확인:", res); 
            
            if (res.email) {
                setUser(res); 
            } else if (res.data && res.data.email) {
                setUser(res.data);
            }
        })
        .catch(err => {
            console.error("유저 정보를 불러오지 못했습니다.", err);
        });
}, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1>로그인 성공! 🎉</h1>
            {user ? (
                <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
                    <p>반갑습니다, <strong>{user.nickname || '회원'}</strong>님!</p>
                    <p>이메일: {user.email}</p>
                    {user.profileImageUrl && (
                        <img 
                            src={user.profileImageUrl} 
                            alt="프로필" 
                            style={{ width: '100px', borderRadius: '50%', marginTop: '10px' }} 
                        />
                    )}
                    <br />
                    <button onClick={handleLogout} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
                        로그아웃
                    </button>
                </div>
            ) : (
                <p>사용자 정보를 불러오는 중...</p>
            )}
        </div>
    );
};

export default MainPage;