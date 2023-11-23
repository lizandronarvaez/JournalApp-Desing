import { CircularProgress, Grid } from "@mui/material"

const CheckAuth = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
        >
            <Grid item>
                <CircularProgress color="warning" />
            </Grid>
        </Grid>
    )
}

export default CheckAuth