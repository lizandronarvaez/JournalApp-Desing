import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const purpleTheme = createTheme({
    palette: {
        primary: {
            main: "#000e35"
        },
        secondary: {
            main: "#543884"
        },
        error: {
            main: red.A400
        }
    }
})

export default purpleTheme