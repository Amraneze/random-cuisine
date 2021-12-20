import { ReactElement } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import { urlRegex } from '@utils';

interface Props {
    name?: string;
    address?: string;
    photos?: google.maps.places.PlacePhoto[];
}

const placeInfoTranslationKey = 'views.placeInfo.';

export function PlaceInfo({ name, address, photos }: Props): ReactElement {
    const { t } = useTranslation();
    const url = photos?.[0]?.html_attributions?.[0]?.match(urlRegex)?.[1];

    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {address}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {url && (
                <CardActions>
                    <a href={url}>
                        <Button size="small" color="primary">
                            {t(`${placeInfoTranslationKey}link`)}
                        </Button>
                    </a>
                </CardActions>
            )}
        </Card>
    );
}
