import React from 'react'
import { CardContent, Grid, Typography, Chip } from '@material-ui/core';
const PackageItem = ({content}) => {
    return (
        <Grid container style={{
            height: 40,
            marginTop: 15,
            width: "50%",
            backgroundColor: '#fff',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10
        }}>
            <Grid item bg={8} md={10}>
                <Typography>{content}</Typography>
            </Grid>
            <Grid item bg={4} md={2}>
                <Chip label="Book" style={{ height: 20, backgroundColor: '#000', color: '#fff' }} />

            </Grid>


        </Grid>
    )
}

export default PackageItem