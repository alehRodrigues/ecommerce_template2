import Box from '@material-ui/core/Box';
import React from 'react';
import { styled } from '@material-ui/system';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import '../fonts.css';
import SearchBox from './SearchBox';
import SearchBoxMobile from './SearchBoxMobile';
import LoginBoxMobile from './LoginBoxMobile';
import LoginBox from './LoginBox';
import { AuthContext } from '../../providers/auth';
import AccountMobile from './AccountMobile';
import Account from './Account';

const ToolBarCustom = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const GroupBoxMobile = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
        justifyContent: 'flex-start'
    }
}));

const ToolBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center'
}));

const ToolBoxCenterMobile = styled(Box)(({ theme }) => ({
    marginInline: '15%',
    [theme.breakpoints.up('sm')]: {
        marginline: '10%'
    }
}));

const LinkMenu = styled(Link)(({ theme }) => ({
    fontSize: '2rem',
    fontFamily: 'kaileen',
    paddingBottom: '0.5rem'
}));

function MenuBar() {
    const { contextApplication, setContextApplication } =
        React.useContext(AuthContext);

    return (
        <>
            <Box justifyContent="center" display="flex">
                <AppBar
                    sx={{
                        flexGrow: '1',
                        backgroundColor: 'primary',
                        boxShadow: 'none'
                    }}
                    position="static"
                >
                    <ToolBarCustom>
                        <GroupBoxMobile>
                            <ToolBox>
                                <LinkMenu
                                    underline="none"
                                    color="secondary"
                                    href="#"
                                >
                                    Home
                                </LinkMenu>
                            </ToolBox>
                            <ToolBoxCenterMobile>
                                <LinkMenu
                                    underline="none"
                                    color="secondary"
                                    href="#"
                                >
                                    About
                                </LinkMenu>
                            </ToolBoxCenterMobile>
                            <ToolBox>
                                <LinkMenu
                                    underline="none"
                                    color="secondary"
                                    href="#"
                                >
                                    Blog
                                </LinkMenu>
                            </ToolBox>
                        </GroupBoxMobile>
                        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                            <ToolBox>
                                <ToolBox>
                                    <SearchBox />
                                </ToolBox>
                                <ToolBox>
                                    {contextApplication.isLogged ? (
                                        <Account />
                                    ) : (
                                        <LoginBox />
                                    )}
                                </ToolBox>
                                <ToolBox>
                                    <IconButton>
                                        <ShoppingCartIcon color="secondary" />
                                    </IconButton>
                                </ToolBox>
                            </ToolBox>
                        </Box>
                    </ToolBarCustom>
                </AppBar>
            </Box>
            <Box
                sx={{
                    display: {
                        xs: 'flex',
                        sm: 'none',
                        md: 'none',
                        lg: 'none',
                        xl: 'none'
                    }
                }}
            >
                <SearchBoxMobile />
            </Box>
            <Box
                sx={{
                    display: {
                        xs: 'flex',
                        sm: 'none',
                        md: 'none',
                        lg: 'none',
                        xl: 'none'
                    }
                }}
            >
                {contextApplication.isLogged ? (
                    <AccountMobile />
                ) : (
                    <LoginBoxMobile />
                )}
            </Box>
        </>
    );
}

export default MenuBar;
