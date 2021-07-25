import Box from '@material-ui/core/Box';
import React from 'react';
import { styled } from '@material-ui/system';
import * as Users from '../../scripts/users.js';
import { AuthContext } from '../../providers/auth';
import Alert from '@material-ui/core/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PeopleIcon from '@material-ui/icons/People';
import Typography from '@material-ui/core/Typography';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import { useHistory } from 'react-router-dom';

const BoxWrapper = styled(Box)(({ theme }) => ({
    width: '250px',
    height: 'auto',
    borderRadius: '0 0 0 15px',
    backgroundColor: '#f7d0d0'
}));

export default function AccountWrapper(props) {
    const { closeBox } = props;

    const [openErrorAlert, setOpenErrorAlert] = React.useState(false);
    const [messageError, setMessageError] = React.useState('');
    const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
    const [messageSuccess, setMessageSuccess] = React.useState('');

    let history = useHistory();

    const { contextApplication, setContextApplication } =
        React.useContext(AuthContext);

    const handleCloseAlert = (event, reason) => {
        console.log(event);
        if (reason === 'clickaway') {
            return;
        }

        setOpenErrorAlert(false);
        setOpenSuccessAlert(false);
    };

    const handleLogoutClick = () => {
        setContextApplication({ isLogged: false, user: '' });
        history.push('/');
    };

    const roleVerify = () => {
        if (contextApplication.user === null) {
            return false;
        } else if (
            contextApplication.isLogged &&
            contextApplication.user._role
        ) {
            return true;
        } else {
            return false;
        }
    };

    const handleAccountManagerClick = () => {
        history.push('/user');
    };

    return (
        <>
            <BoxWrapper>
                <MenuList>
                    {roleVerify() ? <AdminOptions /> : <NameOrEmail />}
                    <MenuItem onClick={handleAccountManagerClick}>
                        <ListItemIcon>
                            <AccountBoxIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText color="secondary">
                            Account Manager
                        </ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogoutClick}>
                        <ListItemIcon>
                            <ExitToAppIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText color="secondary">Logout</ListItemText>
                    </MenuItem>
                </MenuList>
            </BoxWrapper>
            <Snackbar
                open={openErrorAlert}
                autoHideDuration={5000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                resumeHideDuration={2000}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity="error"
                    //sx={{ width: '100%' }}
                >
                    {messageError}
                </Alert>
            </Snackbar>
            <Snackbar
                open={openSuccessAlert}
                autoHideDuration={10000}
                resumeHideDuration={7000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity="success"
                    //sx={{ width: '100%' }}
                >
                    {messageSuccess}
                </Alert>
            </Snackbar>
        </>
    );
}

function NameOrEmail() {
    const { contextApplication, setContextApplication } =
        React.useContext(AuthContext);

    const [nameOrEmail, setNameOrEmail] = React.useState('');

    React.useEffect(() => {
        setNameOrEmail(() => {
            if (
                contextApplication.user === null ||
                contextApplication.user === ''
            ) {
                return 'This is a error';
            } else if (contextApplication.user._name !== '') {
                return contextApplication.user._name;
            } else {
                return contextApplication.user._email;
            }
        });
    }, [contextApplication]);

    return (
        <Typography variant="body1" sx={{ marginBottom: '20px' }}>
            {nameOrEmail}
        </Typography>
    );
}

function AdminOptions() {
    let history = useHistory();
    const handleUsersManagerClick = () => {
        history.push('/admin/users');
    };
    const handleProductsManagerClick = () => {
        history.push('/admin/products');
    };
    return (
        <MenuList>
            <Typography
                variant="body1"
                sx={{
                    display: { sm: 'none', md: 'none', lg: 'none', xl: 'none' },
                    marginBottom: '20px'
                }}
            >
                <strong>Administrator Painel</strong>
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    display: {
                        xs: 'none',
                        sm: 'flex',
                        md: 'flex',
                        lg: 'flex',
                        xl: 'flex'
                    },
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                }}
            >
                <strong>Administrator Painel</strong>
            </Typography>

            <MenuItem onClick={handleUsersManagerClick}>
                <ListItemIcon>
                    <PeopleIcon color="secondary" />
                </ListItemIcon>
                <ListItemText color="secondary">Users Manager</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleProductsManagerClick}>
                <ListItemIcon>
                    <FeaturedPlayListIcon color="secondary" />
                </ListItemIcon>
                <ListItemText color="secondary">Products Manager</ListItemText>
            </MenuItem>
            <Divider />
        </MenuList>
    );
}
