import React from 'react';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/system';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Collapse from '@material-ui/core/Collapse';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AccountWrapper from './AccountWrapper';
import { AuthContext } from '../../providers/auth';
import Typography from '@material-ui/core/Typography';

const CollapseBox = styled(Collapse)(({ theme }) => ({
    position: 'absolute',
    top: '64px',
    right: '0'
}));

export default function Account() {
    const [checked, setChecked] = React.useState(false);
    const { contextApplication, setContextApplication } =
        React.useContext(AuthContext);

    const handleClickAway = () => {
        setChecked(false);
    };

    const handleBoxChange = () => {
        setChecked((isChecked) => !isChecked);
    };
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box>
                <IconButton onClick={handleBoxChange}>
                    <AccountCircleIcon color="secondary" />
                    <Typography color="secondary">
                        {contextApplication.isLogged
                            ? contextApplication.user._email
                            : null}
                    </Typography>
                </IconButton>

                <CollapseBox in={checked} orientation="vertical" timeout={800}>
                    <AccountWrapper />
                </CollapseBox>
            </Box>
        </ClickAwayListener>
    );
}
