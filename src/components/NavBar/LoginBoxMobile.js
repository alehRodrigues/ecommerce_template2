import Box from '@material-ui/core/Box';
import React from 'react';
import { styled } from '@material-ui/system';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Collapse from '@material-ui/core/Collapse';
import '../fonts.css';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import LoginWrapper from './LoginWrapper';

const Login = styled(Box)(({ theme }) => ({
    borderRadius: '10px 0 0 30px',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 0,
    width: 'auto',
    position: 'fixed',
    top: '270px',
    right: '0'
}));

const IconButtonWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '10px 0 0 30px',
    width: 'auto',
    height: '3.5rem',
    backgroundColor: '#f7d0d0',
    position: 'relative',
    '&::before': {
        content: '" "',
        position: 'absolute',
        right: '0',
        top: '56px',
        backgroundColor: 'transparent',
        width: '30px',
        height: '20px',
        borderRadius: '0 15px 0 0',
        boxShadow: '15px 0 0 0 #f7d0d0'
    }
}));

export default function LoginBoxMobile() {
    const [checked, setChecked] = React.useState(false);

    const loginWrapper = React.useRef();

    const handleClickAway = () => {
        setChecked(false);
    };

    const handleBoxChange = () => {
        setChecked((isChecked) => !isChecked);
        loginWrapper.current.reset();
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Login>
                <IconButtonWrapper>
                    <IconButton onClick={handleBoxChange}>
                        <AccountCircleIcon
                            sx={{ fontSize: '2.5rem' }}
                            color="secondary"
                        />
                    </IconButton>
                </IconButtonWrapper>
                <Collapse in={checked} orientation="horizontal" timeout={800}>
                    <LoginWrapper
                        ref={loginWrapper}
                        closeBox={handleClickAway}
                        stateBox={checked}
                    />
                </Collapse>
            </Login>
        </ClickAwayListener>
    );
}
