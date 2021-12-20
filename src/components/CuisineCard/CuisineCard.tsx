import { useTranslation } from 'react-i18next';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { ReactElement } from 'react';

interface Props {
    title: string;
    imgUrl: string;
    isAdded: boolean;
    onUpdateUserCuisine: (cuisine: string, imgUrl: string, isAdded: boolean) => void;
}

const commonTranslationKey = 'common.';

export default function CuisineCard({ title, imgUrl, isAdded, onUpdateUserCuisine }: Props): ReactElement {
    const { t } = useTranslation();
    const buttonAriaLabel = t(`${commonTranslationKey}${isAdded ? 'delete' : 'add'}`);

    return (
        <Card>
            <CardActionArea>
                <CardMedia component="img" alt={title} height="140" image={imgUrl} title={title} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Fab
                    color={isAdded ? 'secondary' : 'primary'}
                    aria-label={buttonAriaLabel}
                    onClick={() => onUpdateUserCuisine(title, imgUrl, isAdded)}
                >
                    {isAdded ? <DeleteIcon /> : <AddIcon />}
                </Fab>
            </CardActions>
        </Card>
    );
}
