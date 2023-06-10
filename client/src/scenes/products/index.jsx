import React, { useState } from 'react'
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Rating,
    useTheme,
    useMediaQuery,
    Typography,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";

const Product = ({
    _id,
    name,
    description,
    price,
    rating,
    category,
    supply,
    stat
}) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);    // Used like with sidebar state variables

    return(
        <Card sx={{ 
            backgroundImage: "none",
            backgroundColor: theme.palette.background.alt,
            borderRadius: "0.55rem"}}>
            <CardContent>
                <Typography sx={{ fontSize: 14}} color={theme.palette.secondary[700]} gutterBottom>
                    {category}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
                    ${Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly />
                <Typography variant="body2">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="primary"
                    size="small"
                    onClick={() => setIsExpanded(!isExpanded)}>
                    See More
                </Button>
            </CardActions>
            <Collapse
                in={isExpanded}
                timeout="auto"
                unmountOnExit
                sx={{ color: theme.palette.neutral[300]}}>
                    <CardContent>
                        <Typography>id: {_id}</Typography>
                        <Typography>Supply Left: {supply}</Typography>
                        <Typography>Yearly Sales This Year: {stat.yearlySalesTotal}</Typography>
                        <Typography>Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}</Typography>
                    </CardContent>
            </Collapse>
        </Card>
    )
}

function Products() {
    const { data, isLoading } = useGetProductsQuery(); // isLoading is RTQ feature to check if data has been obtained or not
    const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem"> {/* rem (Root em) is used instead of pixels for consistency across devices [based on default pixel size] */}
        <Header title="PRODUCTS" subtitle="See your list of products" />
        {data || !isLoading ? (
            
            <Box 
            /* This box will be the formatting for the products on the page */
                mt="20px" 
                display="grid" 
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                justifyContent="space-between"
                rowGap="20px"
                columnGap="1.33%"
                sx={{ //"& > div targets the immediate div so we can set a setting for an immediate response"
                   "& > div": { gridColumn: isNonMobile ? undefined : "span 4"}, // If Mobile, we set each div to 4 (takes up entire width)
                }}> {/* Takes data structure and passes it to product compenent with ID as the key*/}
                    {data.map(({
                        _id,
                        name,
                        description,
                        price,
                        rating,
                        category,
                        supply,
                        stat
                    }) => (
                        <Product 
                            key={_id}
                            _id={_id}
                            name={name}
                            description={description}
                            price={price}
                            rating={rating}
                            category={category}
                            supply={supply}
                            stat={stat}/>
                    ))}
            </Box>
        ) : (<> Loading... </>)}
    </Box>
  )
}

export default Products