"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { routesUrl } from "@/utils/pagesurl";
import { usePathname } from "next/navigation";
import LogoutButton from "../shared/form/LogoutButton";
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { data: session } = useSession();
  const pathname = usePathname();

  if (pathname === routesUrl.signIn) {
    return;
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{backgroundColor:"#ffffff"}} className="bg-transparent shadow-none">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <IconButton
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "black" }}
            >
              <Link href={routesUrl.home}>
                <Typography>Home</Typography>
              </Link>
            </IconButton>
            <IconButton
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "black" }}
            >
            </IconButton>
            {session ? (
              <>
                <IconButton
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "black" }}
                >
                  <Link href={routesUrl.products}>
                    <Typography>Products</Typography>
                  </Link>
                </IconButton>
                <IconButton
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "black" }}
                >
                  <Link href={routesUrl.user}>
                    <Typography>User</Typography>
                  </Link>
                </IconButton>
              </>
            ) : (
              <></>
            )}
          </Box>
          <Typography className="mr-2" color="black">
            {session?.user.email || session?.user?.id}
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={session ? "Sign out" : "Sign in"}>
              {session ? (
                <>
                  <LogoutButton />
                </>
              ) : (
                <Link href={routesUrl.signIn}>
                  <Typography color="black">Sign In</Typography>
                </Link>
              )}
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {session ? (
                <MenuItem onClick={handleCloseUserMenu}></MenuItem>
              ) : null}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;

