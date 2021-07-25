import React from 'react';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/system';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Collapse from '@material-ui/core/Collapse';
import LoginWrapper from './LoginWrapper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const CollapseBox = styled(Collapse)(({ theme }) => ({
    position: 'absolute',
    top: '64px',
    right: '0'
}));

export default function LoginBox() {
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
            <Box>
                <IconButton onClick={handleBoxChange}>
                    <AccountCircleIcon color="secondary" />
                </IconButton>

                <CollapseBox
                    in={checked}
                    sx={{ zIndex: 1 }}
                    orientation="vertical"
                    timeout={800}
                >
                    <LoginWrapper
                        ref={loginWrapper}
                        stateBox={checked}
                        closeBox={handleClickAway}
                    />
                </CollapseBox>
            </Box>
        </ClickAwayListener>
    );
}
