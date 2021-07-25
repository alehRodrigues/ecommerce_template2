import Box from '@material-ui/core/Box';
import React from 'react';
import { styled } from '@material-ui/system';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Collapse from '@material-ui/core/Collapse';
import '../fonts.css';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const Search = styled(Box)(({ theme }) => ({
    borderRadius: '10px 0 0 30px',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 0,
    width: 'auto',
    position: 'fixed',
    top: '200px',
    right: '0',
    backgroundColor: '#f7d0d0'
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
    root: {},
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: '#7C7C7C'
    },
    '& .MuiInput-underline:before': {
        borderBottomColor: theme.palette.secondary.main
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: theme.palette.secondary.main
    },
    paddingTop: '10px',
    marginRight: '12vw',
    paddingLeft: '8vw',
    width: '30ch'
}));

export default function SearchBox() {
    const [checked, setChecked] = React.useState(false);

    const handleClickAway = () => {
        setChecked(false);
    };

    const handleEnterDownOnInput = (event) => {
        if (event.key === 'Enter') {
            console.log('busca');
            document.getElementById('searchInputMobile').value = '';
        }
    };

    const handleInputChange = () => {
        setChecked((isChecked) => !isChecked);
        document.getElementById('searchInputMobile').value = '';
        setTimeout(() => {
            document.getElementById('searchInputMobile').focus();
        }, 1000);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Search>
                <Box display="flex" justifyContent="center">
                    <IconButton onClick={handleInputChange}>
                        <SearchIcon
                            sx={{ fontSize: '2.5rem' }}
                            color="secondary"
                        />
                    </IconButton>
                </Box>
                <Collapse in={checked} orientation="horizontal" timeout={800}>
                    <CustomTextField
                        variant="standard"
                        placeholder="Search…"
                        id="searchInputMobile"
                        type="search"
                        onKeyDown={handleEnterDownOnInput}
                    />
                </Collapse>
            </Search>
        </ClickAwayListener>
    );
}
