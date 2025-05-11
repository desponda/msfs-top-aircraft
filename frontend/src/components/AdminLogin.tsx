import React from 'react';
import { Paper, Typography, Alert, Box, TextField, Button, CircularProgress } from '@mui/material';

interface AdminLoginProps {
    username: string;
    setUsername: (v: string) => void;
    password: string;
    setPassword: (v: string) => void;
    loginError: string;
    handleLogin: () => void;
    authLoading: boolean;
}

const AdminLogin: React.FC<AdminLoginProps> = ({
    username,
    setUsername,
    password,
    setPassword,
    loginError,
    handleLogin,
    authLoading
}) => (
    authLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <CircularProgress />
        </Box>
    ) : (
        <Paper sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" gutterBottom>Admin Login</Typography>
            {loginError && (
                <Alert severity="error" sx={{ mb: 2 }}>{loginError}</Alert>
            )}
            <Box component="form" sx={{ mt: 2 }}>
                <TextField
                    label="Username"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </Box>
        </Paper>
    )
);

export default AdminLogin; 