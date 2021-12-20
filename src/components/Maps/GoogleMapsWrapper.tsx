import { useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Map, Marker, InfoWindow, GoogleApiWrapper, IProvidedProps, IMapProps, IMarkerProps } from 'google-maps-react';

import { User } from '@types';
import { Config } from '@config';
import { Places, PlaceInfo, Loader } from '@components';
import { defaultUser, ACCOUNT_KEY, getDataFromLocalStorage } from '@utils';

interface RefObject {
    marker: google.maps.Marker;
}

interface Props {
    cuisine: string;
}

const Container = ({ google, cuisine }: IProvidedProps & Props) => {
    const markersRef = useRef<((Marker & RefObject) | null)[]>([]);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);
    const [activeMarker, setActiveMarker] = useState<google.maps.Marker | null>(null);
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

    const { location } = getDataFromLocalStorage<User>(ACCOUNT_KEY, defaultUser);

    // To reduce the amout of request of Google API
    // useEffect(() => {
    //     if (map && selectedPlace) {
    //         const placeService = new google.maps.places.PlacesService(map);
    //         const request: google.maps.places.PlaceDetailsRequest = {
    //             placeId: selectedPlace.place_id as string,
    //         };
    //         // https://developers.google.com/maps/documentation/places/web-service/photos?hl=en
    //         placeService.getDetails(
    //             request,
    //             (results: google.maps.places.PlaceResult | null, status: google.maps.places.PlacesServiceStatus) => {
    //                 // eslint-disable-next-line no-debugger
    //                 debugger;
    //                 if (status === google.maps.places.PlacesServiceStatus.OK)
    //                     setSelectedPlace((prevState) => ({ ...prevState, ...results }));
    //             }
    //         );
    //     }
    // }, [
    //     google.maps.places.PlacesService,
    //     google.maps.places.PlacesServiceStatus.OK,
    //     map,
    //     selectedPlace,
    //     setSelectedPlace,
    // ]);

    const onMapReady = (_: IMapProps, gMap: google.maps.Map) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { center } = gMap;
        setMap(gMap);

        const placeService = new google.maps.places.PlacesService(gMap);
        const request = {
            keyword: cuisine,
            location:
                location?.lat == null
                    ? center
                    : {
                          lat: location.lat,
                          lng: location.lng,
                      },
            radius: 500,
            type: 'food|restaurant',
        };
        // https://developers.google.com/maps/documentation/places/web-service/search-nearby
        placeService.nearbySearch(
            request,
            (results: google.maps.places.PlaceResult[] | null, status: google.maps.places.PlacesServiceStatus) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) setPlaces(results ?? []);
            }
        );
    };

    const onMarkerClick = (place: IMarkerProps, marker: google.maps.Marker) => {
        const currentSelectedPlace = places.find((_place) => _place.name === place.title) ?? null;
        setActiveMarker(marker);
        setShowingInfoWindow(true);
        setSelectedPlace(currentSelectedPlace);
    };

    const onPlaceHover = (name?: string) => {
        const hoveredMarker = markersRef.current?.find((marker) => marker?.props.title === name);
        if (hoveredMarker) {
            onMarkerClick(hoveredMarker.props, hoveredMarker.marker as google.maps.Marker);
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Paper elevation={3}>
                    <Places places={places} onHover={onPlaceHover} />
                </Paper>
            </Grid>
            <Grid item xs={8}>
                <Map
                    google={google}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    onReady={onMapReady}
                    centerAroundCurrentLocation={false}
                    center={{
                        lat: location?.lat as number,
                        lng: location?.lng as number,
                    }}
                    containerStyle={{
                        height: '100vh',
                        position: 'relative',
                        width: '100%',
                    }}
                >
                    <Marker
                        position={{
                            lat: location?.lat as number,
                            lng: location?.lng as number,
                        }}
                        title="Votre position"
                    />
                    {places.map(({ name, place_id, geometry }, index) => (
                        <Marker
                            key={place_id}
                            position={geometry?.location}
                            title={name}
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            onClick={onMarkerClick}
                            ref={(element) => {
                                if (markersRef?.current) markersRef.current[index] = element as Marker & RefObject;
                            }}
                        />
                    ))}

                    {activeMarker !== null && map !== null && (
                        <InfoWindow map={map} marker={activeMarker} google={google} visible={showingInfoWindow}>
                            <PlaceInfo
                                name={selectedPlace?.name}
                                address={selectedPlace?.vicinity}
                                photos={selectedPlace?.photos}
                            />
                        </InfoWindow>
                    )}
                </Map>
            </Grid>
        </Grid>
    );
};

export default GoogleApiWrapper({
    apiKey: Config.googlePlacesApiKey as string,
    libraries: ['places', 'visualization'],
    LoadingContainer: Loader,
})(Container);
