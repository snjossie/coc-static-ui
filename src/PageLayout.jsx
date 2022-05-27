import AppBar from '@mui/material/AppBar';
import { ReactComponent as AppIcon } from './img/eldersign.svg'
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import SvgIcon from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { homeRoute } from './Routes';
import { logoutRoute } from './Routes';
import { useNavigate } from 'react-router-dom';

export const PageLayout = props => {

  const navigate = useNavigate();

    return <>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters variant="dense">
              <SvgIcon component={AppIcon} inheritViewBox sx={{ marginRight: "0.5em" }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href={homeRoute}
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  color: 'inherit',
                  textDecoration: 'none'
                }}
              >
                Call of Cthulhu
              </Typography>
              <Box sx={{ flexGrow: 1 }}></Box>
              <Button onClick={() => navigate(logoutRoute)}> 
                Logout
              </Button>
            </Toolbar>
          </Container>
        </AppBar>

        {props.children}
    </>
}
