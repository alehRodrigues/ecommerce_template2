import './App.css';
import React from 'react';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Logo from '../components/Logo/Logo';
import NavBar from '../components/NavBar/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Admin from '../pages/Admin';
import Products from '../pages/Products';
import User from '../pages/User';
import AdminProducts from '../pages/AdminProducts';
import AdminUsers from '../pages/AdminUsers';

const mainTheme = createTheme({
    palette: {
        primary: {
            main: '#FFF8FD'
        },
        secondary: {
            main: '#23190E'
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={mainTheme}>
            <Box bgcolor="primary.main">
                <Logo />
                <Router>
                    <NavBar />
                    <Switch>
                        <Route path="/" exact component={Products} />
                        <Route path="/admin/" exact component={Admin} />
                        <Route path="/admin/users" component={AdminUsers} />
                        <Route
                            path="/admin/products"
                            component={AdminProducts}
                        />
                        <Route path="/user" component={User} />
                    </Switch>
                </Router>
            </Box>
        </ThemeProvider>
    );
}

export default App;
