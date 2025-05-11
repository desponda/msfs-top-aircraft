import { useState } from 'react';

const useErrorSnackbar = () => {
    const [snackbarMsg, setSnackbarMsg] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const showMessage = (msg: string) => {
        setSnackbarMsg(msg);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSnackbarMsg(null);
    };

    return {
        snackbarMsg,
        open,
        showMessage,
        handleClose
    };
};

export default useErrorSnackbar; 