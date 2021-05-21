import React from 'react';
import { CardContent,  Typography } from '@material-ui/core';
const AboutUsContent = ({content}) => {
    return (
        <CardContent >
            <Typography component="h5" variant="h5">
                About
                  </Typography>
            <Typography style={{ color: '#308AB4', width: '80%', textAlign: 'justify' }}>
               {content}</Typography>
        </CardContent>

    )
}

export default AboutUsContent