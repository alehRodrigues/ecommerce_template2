import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { DataGrid } from '@material-ui/data-grid';
import * as API from '../scripts/products';
import Button from '@material-ui/core/Button';

export default function AdminProducts() {
    const [image, setImage] = React.useState('');
    const [frontProducts, setFrontProducts] = React.useState([]);
    const [brand, setBrand] = React.useState('');
    const [prodName, setProdName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [allDisabled, setAllDisabled] = React.useState(true);

    const [addDisabled, setAddDisabled] = React.useState(false);
    const [editDisabled, setEditDisabled] = React.useState(false);
    const [deleteDisabled, setDeleteDisabled] = React.useState(false);
    const [saveDisabled, setSaveDisabled] = React.useState(true);

    React.useEffect(() => {
        const getApiData = async () => {
            const pf = await API.getData;
            console.log(pf);
            setFrontProducts(pf);
        };
        getApiData();
    }, []);

    const handleChangeImage = (event) => {
        setImage(event.target.value);
    };

    const getProd = (id) => {
        const prod = frontProducts.find((product) => product.id === Number(id));
        if (allDisabled) {
            setBrand(prod.brand);
            setProdName(prod.name);
            setPrice(prod.price);
            setImage(prod.image_link);
        }
    };

    const columns = [
        {
            field: 'brand',
            headerName: 'Brand',
            width: 150,
            editable: false
        },
        {
            field: 'image_link',
            headerName: 'Image Link',
            width: 300,
            editable: false
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 300,
            editable: false
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 150,
            editable: false
        }
    ];

    if (frontProducts.length === 0) {
        return null;
    }

    const handleAdd = () => {
        setAllDisabled(false);
        setBrand('');
        setProdName('');
        setPrice('');
        setImage('');
        setSaveDisabled(false);
        setEditDisabled(true);
        setDeleteDisabled(true);
        setAddDisabled(true);
    };

    const handleSave = () => {
        console.log('brand:', brand);
        console.log('name:', prodName);
        console.log('price:', price);
        console.log('link:', image);
        const prod = {
            brand,
            name: prodName,
            price,
            image_link: image,
            id: frontProducts.length + 1
        };
        const result = Object.values(frontProducts);

        result.push(prod);

        window.localStorage.setItem('data', JSON.stringify(result));
        setBrand('');
        setProdName('');
        setPrice('');
        setImage('');
        setAllDisabled(true);
        setSaveDisabled(true);
        setEditDisabled(false);
        setDeleteDisabled(false);
        setAddDisabled(false);
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}
            >
                <Box sx={{ marginBottom: '50px' }}>
                    <Typography variant="h4">Products Manager</Typography>
                </Box>
                <Box>
                    {image === '' ? null : <img src={image} alt="Product" />}
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        alignContent: 'space-around',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                        flexDirection: 'row'
                    }}
                >
                    <TextField
                        label="Product Brand"
                        variant="outlined"
                        color="secondary"
                        sx={{ width: '30ch', margin: '20px' }}
                        value={brand}
                        onChange={(event) => setBrand(event.target.value)}
                        disabled={allDisabled}
                    />
                    <TextField
                        label="Product Name"
                        variant="outlined"
                        color="secondary"
                        disabled={allDisabled}
                        value={prodName}
                        onChange={(event) => setProdName(event.target.value)}
                        sx={{ width: '80%', margin: '20px' }}
                    />
                    <TextField
                        label="Product Price"
                        variant="outlined"
                        color="secondary"
                        disabled={allDisabled}
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            )
                        }}
                        sx={{ width: '15ch', margin: '20px' }}
                    />
                    <TextField
                        label="Image Link"
                        placeholder="https://picsum.photos/200/300"
                        variant="outlined"
                        color="secondary"
                        sx={{ width: '50ch', margin: '20px' }}
                        value={image}
                        disabled={allDisabled}
                        onChange={(event) => setImage(event.target.value)}
                        onBlur={handleChangeImage}
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        color: 'white',
                        backgroundColor: 'green',
                        marginX: '10px'
                    }}
                    onClick={handleAdd}
                    disabled={addDisabled}
                >
                    Add
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        color: 'white',
                        backgroundColor: 'blue',
                        marginX: '10px'
                    }}
                    disabled={editDisabled}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        color: 'white',
                        backgroundColor: 'red',
                        marginX: '10px'
                    }}
                    disabled={deleteDisabled}
                >
                    Delete
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        color: 'black',
                        backgroundColor: 'yellow',
                        marginX: '10px'
                    }}
                    onClick={handleSave}
                    disabled={saveDisabled}
                >
                    Save
                </Button>
            </Box>
            <Box>
                <div
                    style={{
                        height: '800px',
                        width: '80%',
                        margin: '20px auto'
                    }}
                >
                    <DataGrid
                        rows={frontProducts}
                        columns={columns}
                        pageSize={15}
                        onSelectionModelChange={(newSelection) => {
                            getProd(newSelection);
                        }}
                    />
                </div>
            </Box>
        </>
    );
}
