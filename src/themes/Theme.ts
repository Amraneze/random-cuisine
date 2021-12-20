import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { primaryColor, secondaryColor, spacing } from '@styles';

export const theme: Theme = createMuiTheme({
    palette: {
        primary: primaryColor,
        secondary: secondaryColor,
    },
    spacing,
});
