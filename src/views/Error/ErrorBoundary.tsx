import { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RoutersConstant } from '@routes';
import { ErrorBoundaryStyles } from '@styles';
import icError from '@assets/img/pages/error/error.svg';

const errorBoundaryTranslationKey = 'views.errorBounday.';
const useStyles = makeStyles(ErrorBoundaryStyles);

export default function ErrorBoundary(): ReactElement {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.root}>
            <Card>
                <CardContent>
                    <img src={icError} className={classes.img} alt="" />
                    <Typography variant="h3" className={classes.title}>
                        {t(`${errorBoundaryTranslationKey}title`)}
                    </Typography>
                    <Typography variant="body1" className={classes.subtitle}>
                        {t(`${errorBoundaryTranslationKey}description`)}
                    </Typography>
                    <Link to={RoutersConstant.HOME}>
                        <Button>{t(`${errorBoundaryTranslationKey}redirectToHome`)}</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
