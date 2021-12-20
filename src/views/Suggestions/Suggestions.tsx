import { ReactElement, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { SavedCuisine } from '@types';
import { GoogleMapsWrapper } from '@components';
import { changeHeaderTitle as changeHeaderTitleAction } from '@redux';

const suggestionsTranslationKey = 'views.suggestions.';

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            changePageTitle: changeHeaderTitleAction,
        },
        dispatch
    );

const connector = connect(null, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

export function Suggestions({ changePageTitle }: Props): ReactElement {
    const { t } = useTranslation();
    const {
        state: { name },
    } = useLocation<SavedCuisine>();

    useEffect(() => {
        changePageTitle(t(`${suggestionsTranslationKey}title`));
    }, [t, changePageTitle]);

    return (
        <>
            <GoogleMapsWrapper cuisine={name} />
            <Button variant="contained" color="primary">
                {t(`${suggestionsTranslationKey}spinMe`)}
            </Button>
        </>
    );
}

export default connector(Suggestions);
