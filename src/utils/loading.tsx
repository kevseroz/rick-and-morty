import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

export default function CircularUnderLoad() {
    return <Box
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100vh - 160px)',
        }}
    >
        <CircularProgress
            size={150}
            thickness={4}
        />
    </Box>;
}