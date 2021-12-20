import { ReactElement } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

interface Props {
    places: google.maps.places.PlaceResult[];
    onHover: (name?: string) => void;
}

export const Places = ({ places, onHover }: Props): ReactElement => (
    <List>
        {places &&
            places.map(({ vicinity, name, icon, place_id }) => (
                <ListItem button key={place_id} onMouseOver={() => onHover(name)}>
                    <ListItemAvatar>
                        <Avatar>
                            <img src={icon} alt={name} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={name} secondary={vicinity} />
                </ListItem>
            ))}
    </List>
);
