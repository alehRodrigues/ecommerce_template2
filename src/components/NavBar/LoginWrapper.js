import Box from '@material-ui/core/Box';
import React from 'react';
import { styled } from '@material-ui/system';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import * as Users from '../../scripts/users.js';
import { AuthContext } from '../../providers/auth';
import Alert from '@material-ui/core/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles({
    input: {
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottomColor: '#7C7C7C'
        },
        width: '30ch',
        margin: '10px 0'
    },
    formControlPassword: {
        marginTop: '10px'
    },
    inputLabel: {
        marginLeft: '-14px'
    }
});

const ButtonLogin = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    marginTop: '20px',
    '&:hover': {
        backgroundColor: '#73AB84'
    }
}));

const BoxLoginWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    width: '300px',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#f7d0d0',
    padding: '15px 40px 30px 40px',
    borderRadius: '0 0 0 15px'
}));

function LoginWrapper(props, ref) {
    const { closeBox } = props;
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        error: false
    });
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [openErrorAlert, setOpenErrorAlert] = React.useState(false);
    const [messageError, setMessageError] = React.useState('');
    const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
    const [messageSuccess, setMessageSuccess] = React.useState('');

    const { contextApplication, setContextApplication } =
        React.useContext(AuthContext);

    const emailInput = React.useRef(null);
    const passwordInput = React.useRef(null);

    const handlePasswordVisibility = () => {
        setPasswordVisible((isVisible) => !isVisible);
    };

    React.useEffect(() => {
        const emlIpt = emailInput.current.children[1].firstChild;
        if (
            emailInput.current.children[1].firstChild.value === '' &&
            passwordInput.current.children[0].value === ''
        ) {
            return () => {
                setTimeout(() => {
                    emlIpt.focus();
                }, 800);
            };
        }
    });

    React.useImperativeHandle(ref, () => ({
        reset: () => {
            setValues({ ...values, email: '', password: '' });
        }
    }));

    const handleInputChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleLogin = () => {
        if (values.email === '' || values.password === '') {
            setValues({ ...values, error: true });
        } else {
            setValues({ ...values, error: false });

            console.log(Users.AdminUser());
            const signIn = Users.signIn(values.email, values.password);
            if (signIn) {
                setContextApplication({ isLogged: true, user: signIn });
                setMessageSuccess('Bem vinde ' + contextApplication.user._name);
                setOpenSuccessAlert(true);
                closeBox();
            } else {
                //Erro de Login
                setMessageError('Invalid Email or Password');
                setOpenErrorAlert(true);
                closeBox();
            }
        }
    };

    const handleEnterDownOnInput = (event) => {
        if (event.key === 'Enter') {
            if (
                event.target === emailInput.current.children[1].firstChild &&
                passwordInput.current.children[0].value === ''
            ) {
                passwordInput.current.children[0].focus();
                return;
            }
            if (
                event.target === passwordInput.current.children[0] &&
                emailInput.current.children[1].firstChild.value === ''
            ) {
                emailInput.current.children[1].firstChild.focus();
                return;
            }
            if (
                !(emailInput.current.children[1].firstChild.value === '') &&
                !(passwordInput.current.children[0].value === '')
            ) {
                handleLogin();
                return;
            }
        }
    };
    const handleCloseAlert = (event, reason) => {
        console.log(event);
        if (reason === 'clickaway') {
            return;
        }

        setOpenErrorAlert(false);
        setOpenSuccessAlert(false);
    };

    const classes = useStyles();

    return (
        <>
            <BoxLoginWrapper>
                <TextField
                    className={classes.input}
                    variant="standard"
                    label="Your best email"
                    color="secondary"
                    required
                    type="email"
                    value={values.email}
                    onChange={handleInputChange('email')}
                    onKeyDown={handleEnterDownOnInput}
                    error={values.error}
                    helperText={values.errorMessage}
                    ref={emailInput}
                />
                <FormControl className={classes.formControlPassword}>
                    <InputLabel
                        className={classes.inputLabel}
                        htmlFor="loginInputPasswordMobile"
                        color="secondary"
                        required
                        error={values.error}
                    >
                        Your most wanted secret
                    </InputLabel>
                    <Input
                        className={classes.input}
                        variant="standard"
                        required
                        color="secondary"
                        value={values.password}
                        type={passwordVisible ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={handlePasswordVisibility}>
                                    {passwordVisible ? (
                                        <Visibility />
                                    ) : (
                                        <VisibilityOff />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange={handleInputChange('password')}
                        onKeyDown={handleEnterDownOnInput}
                        error={values.error}
                        ref={passwordInput}
                    />
                </FormControl>
                <ButtonLogin onClick={handleLogin}>Login</ButtonLogin>
                <Link
                    sx={{ marginTop: '20px' }}
                    href="#"
                    variant="body2"
                    underline="always"
                    color="secondary"
                    target="_blank"
                    rel="nooppener"
                >
                    or create a account here
                </Link>
            </BoxLoginWrapper>
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
export default React.forwardRef(LoginWrapper);
