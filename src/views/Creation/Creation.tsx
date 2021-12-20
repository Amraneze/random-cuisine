import { ReactElement, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';
import Autocomplete from 'react-google-autocomplete';

import { Config } from '@config';
import { CuisineType, CuisineImage, User } from '@types';
import { CuisineCard } from '@components';
import {
    defaultUser,
    ACCOUNT_KEY,
    ACCOUNT_ALREADY_CREATED_KEY,
    setDataFromLocalStorage,
    getDataFromLocalStorage,
} from '@utils';
import { changeHeaderTitle as changeHeaderTitleAction } from '@redux';
import { RoutersConstant } from '@routes';
import './Creation.scss';

const creationTranslationKey = 'views.creation.';
const commonTranslationKey = 'common.';

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            changePageTitle: changeHeaderTitleAction,
        },
        dispatch
    );

const connector = connect(null, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

function Creation({ changePageTitle }: Props): ReactElement {
    const { t } = useTranslation();
    const history = useHistory();

    const [user, setUser] = useState<User>(getDataFromLocalStorage<User>(ACCOUNT_KEY, defaultUser));

    useEffect(() => {
        changePageTitle(t(`${creationTranslationKey}title`));
    }, [t, changePageTitle]);

    const updateUser = (field: string) => ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
        setUser((previousUser: User) => ({ ...previousUser, [field]: value }));

    const updateLocation = (place: google.maps.places.PlaceResult): void => {
        const getLocationDataByField = (
            field: string,
            addresses?: google.maps.GeocoderAddressComponent[]
        ): string | undefined =>
            (addresses ?? []).find((address) => address.types.find((type: string) => type === field))?.long_name;
        const { formatted_address, address_components, geometry } = place;
        const lat = geometry?.location?.lat();
        const lng = geometry?.location?.lng();

        const location = {
            lat,
            lng,
            street: `${getLocationDataByField('street_number', address_components)} ${getLocationDataByField(
                'route',
                address_components
            )}`,
            zipCode: getLocationDataByField('postal_code', address_components),
            city: getLocationDataByField('locality', address_components),
        };

        setUser((previousUser: User) => ({ ...previousUser, location, address: formatted_address }));
    };

    const isCuisineBookmarked = (cuisineType: string) => user.cuisines.some((cuisine) => cuisine.type === cuisineType);

    const updateUserCuisine = (name: string, imgUrl: string, isAdded: boolean) =>
        setUser((previousUser: User) => ({
            ...previousUser,
            cuisines: isAdded
                ? previousUser.cuisines.filter((cuisine) => cuisine.name !== name)
                : [
                      ...previousUser.cuisines,
                      {
                          name,
                          imgUrl,
                          type: Object.entries(CuisineType).find(([, val]) => val === name)?.[0] as keyof CuisineType,
                      },
                  ],
        }));

    const saveUser = () => {
        setDataFromLocalStorage<boolean>(ACCOUNT_ALREADY_CREATED_KEY, true);
        setDataFromLocalStorage<User>(ACCOUNT_KEY, user);
        history.push(RoutersConstant.HOME);
    };

    return (
        <Container component="main" maxWidth="lg">
            <Paper variant="outlined">
                <Box py={5}>
                    <Typography component="h1" variant="h4" align="center">
                        {t(`${creationTranslationKey}subtitle`)}
                    </Typography>
                    <Grid container spacing={3} className="container">
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="name"
                                name="name"
                                label={t(`${creationTranslationKey}name`)}
                                fullWidth
                                autoComplete="name"
                                variant="standard"
                                onChange={updateUser('name')}
                                value={user.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} className="location-container">
                            <Input
                                fullWidth
                                required
                                id="address"
                                name="address"
                                value={user.address}
                                autoComplete="address"
                                inputComponent={({ inputRef, onFocus, onBlur, ...props }) => (
                                    <Autocomplete
                                        apiKey={Config.googlePlacesApiKey}
                                        onPlaceSelected={(place: google.maps.places.PlaceResult) =>
                                            updateLocation(place)
                                        }
                                        options={{
                                            types: ['address'],
                                        }}
                                        language="fr"
                                        {...props}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} />
                    </Grid>

                    <Box px={10}>
                        <Typography component="h2" variant="h6">
                            {t(`${creationTranslationKey}cuisines`)}
                        </Typography>
                        <Grid container spacing={3} direction="row" alignItems="center" justify="center">
                            {(Object.keys(CuisineType) as (keyof typeof CuisineType | keyof typeof CuisineImage)[]).map(
                                (cuisine: keyof typeof CuisineType | keyof typeof CuisineImage) => (
                                    <Grid key={cuisine} item xs={4}>
                                        <CuisineCard
                                            title={CuisineType[cuisine]}
                                            imgUrl={CuisineImage[cuisine]}
                                            onUpdateUserCuisine={updateUserCuisine}
                                            isAdded={isCuisineBookmarked(cuisine)}
                                        />
                                    </Grid>
                                )
                            )}
                        </Grid>
                        <Button variant="contained" color="primary" onClick={saveUser}>
                            {t(`${commonTranslationKey}save`)}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default connector(Creation);
