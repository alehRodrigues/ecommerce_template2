import React from 'react';
import * as API from '../scripts/products';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/system';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button, CardActionArea, CardActions } from '@material-ui/core';
import { AuthContext } from '../providers/auth';

export default function Products() {
    React.useEffect(() => {
        const getApiData = async () => {
            const pf = await API.getProducts();
            console.log('data', pf);
            setFrontProducts(pf);
        };
        getApiData();
    }, []);
    const [frontProducts, setFrontProducts] = React.useState([]);

    const { contextApplication, setContextApplication } =
        React.useContext(AuthContext);

    const [expanded, setExpanded] = React.useState(false);

    const ProductContent = styled(Box)(({ theme }) => ({
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignContent: 'space-around',
        marginTop: '30px',
        flexWrap: 'wrap'
    }));

    if (frontProducts.length === 0) {
        return null;
    }

    const cards = frontProducts.map((prod, index) => {
        return (
            <Card
                key={index}
                raised
                sx={{
                    maxWidth: '300px',
                    minWidth: '250px',
                    width: '100%',
                    maxHeight: '500px',
                    minHeight: '500px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    padding: '20px 0 20px 0',
                    margin: '30px'
                }}
            >
                <Typography
                    gutterBottom
                    variant="h5"
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    {prod.brand}
                </Typography>
                <CardMedia
                    component="img"
                    alt="Product Image"
                    image={prod.image_link}
                    sx={{
                        width: '60%',
                        height: 'auto',
                        padding: '10px'
                    }}
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h6"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}
                    >
                        {prod.name}
                    </Typography>
                    <Typography
                        variant="h4"
                        color="secondary"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        ${prod.price}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="large" color="secondary" variant="contained">
                        BUY NOW
                    </Button>
                </CardActions>
            </Card>
        );
    });

    return (
        <Container fixed>
            <ProductContent>{cards}</ProductContent>
        </Container>
    );
}
