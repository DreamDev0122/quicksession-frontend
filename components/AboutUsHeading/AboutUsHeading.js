import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { CardContent,  Typography, Chip } from '@material-ui/core';
const AboutUsHeading = ({title,subTitle,rating}) => {
    return (
        <CardContent>
            <Typography component="h3" variant="h3" style={{ color: '#fff', letterSpacing: 4, fontWeight: 400, textAlign: 'left' }} >{title}</Typography>
            <Typography style={{ color: '#161616', fontFamily: 'Avenir,Book Oblique', letterSpacing: 2 }}>{subTitle}</Typography>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '100%',
                alignItems: 'center'
            }}>
                <Typography style={{ color: '#161616', fontFamily: 'Avenir,Book Oblique', letterSpacing: 5, fontWeight: 700, fontSize: 20 }}>$$$$</Typography>
                <Rating
                    color="#000"
                    name="simple-controlled"
                    value={rating}
                    style={{ color: '#000' }}
                    size="medium"
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
                <Chip label="reviews" style={{ height: 20, backgroundColor: '#000', color: '#fff', marginLeft: 10 }} />
            </div>
        </CardContent>
    )
}

export default AboutUsHeading