import Box from '@material-ui/core/Box';
import React from 'react';
import { styled } from '@material-ui/system';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Collapse from '@material-ui/core/Collapse';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import '../fonts.css';

const Search = styled(Box)(({ theme }) => ({
    borderRadius: 'none',
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: 0,
    width: 'auto'
}));

const SearchIconButton = styled(IconButton)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    justifyContent: 'center'
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
    width: '200px'
}));

export default function SearchBox() {
    const [checked, setChecked] = React.useState(false);

    const handleClickAway = () => {
        setChecked(false);
    };

    const handleEnterDownOnInput = (event) => {
        if (event.key === 'Enter') {
            console.log('busca');
            document.getElementById('searchInput').value = '';
        }
    };

    const handleInputChange = () => {
        setChecked((isChecked) => !isChecked);
        document.getElementById('searchInput').value = '';
        setTimeout(() => {
            document.getElementById('searchInput').focus();
        }, 1000);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Search>
                <Box display="flex" justifyContent="center">
                    <SearchIconButton onClick={handleInputChange}>
                        <SearchIcon color="secondary" />
                    </SearchIconButton>
                </Box>
                <Collapse in={checked} orientation="horizontal" timeout={800}>
                    <CustomTextField
                        variant="standard"
                        placeholder="Search…"
                        id="searchInput"
                        type="search"
                        onKeyDown={handleEnterDownOnInput}
                    />
                </Collapse>
            </Search>
        </ClickAwayListener>
    );
}
