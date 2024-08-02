import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button sx={{ py: 1, px: 2, bgcolor: "#FFF", "&:hover": { bgcolor: "#C8C8C8" } }}>
                        <Link href="/login">
                            Login
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/signup">
                            Signup
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
