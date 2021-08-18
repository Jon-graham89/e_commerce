import React from 'react'
import Grid from '@material-ui/core/Grid'
import Product from './Product/Product'
import useStyles from './Styles'


const products = [
    {id:1, name:"Shoes", description:"Running Shoes", price:"79.99", image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cushion-shoes-7659-1584132587.jpg?crop=1.00xw:0.701xh;0,0.229xh&resize=1200:*"},
    {id:2, name:"Macbook", description:"Apple MacBook", price:"1099.99", image: "https://helios-i.mashable.com/imagery/reviews/03y8gbj1mqCuexgXxFJ5vyX/hero-image.fill.size_1248x702.v1623391330.jpg"}
]

const Products = () =>{
    const classes = useStyles()
    return(
        <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Grid container justifyContent="center" spacing={4}>
            {products.map(product=>(
                <Grid item key={product.id} xs={12} md={4} lg={3}>
                    <Product product={product}/>
                </Grid>
            ))}
        </Grid>
    </main>
    )
}

export default Products