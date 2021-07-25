import Box from '@material-ui/core/Box';
import imageMobile from '../../assets/mobile-logo.png';
import imageDevice from '../../assets/logo-ecommerce-device.png';
import image from '../../assets/logo-ecommerce.png';
import { useTheme } from '@material-ui/core/styles';

function Logo() {
    const theme = useTheme();

    return (
        <Box
            display="flex"
            justifyContent="center"
            bgcolor={theme.palette.primary.main}
        >
            <Box
                sx={{
                    display: {
                        xs: 'flex',
                        sm: 'none',
                        md: 'none',
                        lg: 'none',
                        xl: 'none'
                    },
                    justifyContent: 'center',
                    marginTop: '10px'
                }}
            >
                <img src={imageMobile} alt="Logo" width="50%" />
            </Box>
            <Box
                sx={{
                    display: {
                        xs: 'none',
                        sm: 'flex',
                        md: 'flex',
                        lg: 'none',
                        xl: 'none'
                    },
                    justifyContent: 'center',
                    marginTop: '10px'
                }}
            >
                <img src={imageDevice} alt="Logo" width="60%" />
            </Box>
            <Box
                sx={{
                    display: {
                        xs: 'none',
                        sm: 'none',
                        md: 'none',
                        lg: 'flex',
                        xl: 'flex'
                    },
                    justifyContent: 'center',
                    marginTop: '10px'
                }}
            >
                <img src={image} alt="Logo" width="60%" />
            </Box>
        </Box>
    );
}

export default Logo;
