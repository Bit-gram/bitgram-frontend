import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log("리다이렉트 핸들러 진입!"); 
        const params = new URLSearchParams(location.search);

        const token = params.get('token');
        const refreshToken = params.get('refreshToken');
        const email = params.get('email');

       console.log("받은 데이터 - Token:", token ? "있음" : "없음", "Email:", email);

        if (token) {
            localStorage.setItem('accessToken', token);
            if(refreshToken) localStorage.setItem('refreshToken', refreshToken);
            if (email) localStorage.setItem('userEmail', email);
            
            console.log("저장 완료, 메인으로 이동");
            navigate('/main');
        } else {
            console.error("토큰이 없습니다!");
            navigate('/login');
        }
    }, [location, navigate]);

    return <div>로그인 처리 중입니다... 잠시만 기다려주세요.</div>;
};

export default OAuth2RedirectHandler;