import { createTheme } from '@material-ui/core/styles';

export const darkTheme = createTheme({
   palette: {
      type: "dark",
      text: {
         primary: "#ffffff"
      },
      primary: {
         main: "#262636"
      },
      secondary: {
         main: "#fafafa"
      }
   }
})
export const lightTheme = createTheme({
   palette: {
      type: "light",
      primary: {
         main: "#fafafa"
      },
      secondary: {
         main: "#26a27b"
      },
      background: {
         default: "#e4f0e2"
      }
   }
})
