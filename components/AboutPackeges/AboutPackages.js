import React from 'react';
import { CardContent, Grid, Typography, Chip } from '@material-ui/core';
import PackageItem from './PackageItem'
const AboutPackages = () => {
    return (
        <CardContent >
            <Typography component="h5" variant="h5">
                Packages
        </Typography>

           


            <PackageItem content="1 HOUR - $45"/>
            <PackageItem content="1 HOUR - $40"/>


        </CardContent>

    )
}


export default AboutPackages