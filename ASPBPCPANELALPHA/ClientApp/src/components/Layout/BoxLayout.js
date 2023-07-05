import React from 'react';
import { Box, Paper } from '@mui/material';

const BoxLayout = ({ children }) => {
    // Define color variables
    const primaryColor = '#F44336';
    const secondaryColor = '#3F51B5';
    const backgroundColor = '#f1f2f6';

    return (
        <Box
            sx={{
                
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                height: '100%',
                backgroundColor: backgroundColor,
            }}
        >
            <Paper
                sx={{
                    padding: '1rem',
                    backgroundColor: 'white',
                    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
                    width: '90%',
                    height: '84vh',
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gridTemplateRows: '1fr 1fr'
                }}
            >
                {children}
            </Paper>
        </Box>
    );
};

export default BoxLayout;
