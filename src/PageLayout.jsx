import AppBar from '@mui/material/AppBar';
import { ReactComponent as AppIcon } from './img/eldersign.svg'
import Container from '@mui/material/Container';
import SvgIcon from '@mui/material/SvgIcon';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { homeRoute } from './Routes';

export const PageLayout = props => {
    return <>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters variant="dense">
              <SvgIcon component={AppIcon} inheritViewBox />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href={homeRoute}
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', sm: 'block' },
                  color: 'inherit',
                  textDecoration: 'none'
                }}
              >
                Call of Cthulhu
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>

        {props.children}
    </>
}
