import { useState, useEffect } from 'react';

const useAdminAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        setAuthLoading(true);
        fetch('/api/session', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                setIsLoggedIn(!!data.loggedIn);
            })
            .finally(() => setAuthLoading(false));
    }, []);

    const handleLogin = async () => {
        if (!username || !password) {
            setLoginError('Username and password are required');
            return;
        }
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, password })
            });
            if (!res.ok) throw new Error('Invalid credentials');
            setIsLoggedIn(true);
            setLoginError('');
        } catch (err) {
            setLoginError('Invalid credentials');
        }
    };

    const handleLogout = async () => {
        await fetch('/api/logout', { method: 'POST', credentials: 'include' });
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
    };

    return {
        isLoggedIn,
        authLoading,
        username,
        setUsername,
        password,
        setPassword,
        loginError,
        setLoginError,
        handleLogin,
        handleLogout
    };
};

export default useAdminAuth; 