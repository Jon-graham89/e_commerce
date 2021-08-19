import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import useStyles from './Styles'
import { Link, useLocation } from 'react-router-dom'


const Navbar = ({totalItems}) => {
    const classes = useStyles();
    const location = useLocation();
    
    return (
        <>
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                    <img src={'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5d95d03767dd830006a295b6%2FGETTY%2F960x0.jpg%3Ffit%3Dscale'} alt="Commerce.js" height="25px" className={classes.image} />
                    Commerce.js
                </Typography>
                <div className={classes.grow} />
                {location.pathname === "/" && ( <div className={classes.button}>
                    <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                        <Badge badgeContent={totalItems} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </div>) }
                
            </Toolbar>
        </AppBar>
        </>
    )
}

export default Navbar
