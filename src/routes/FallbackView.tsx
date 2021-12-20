import { ReactElement } from 'react';
import Logo from '@assets/img/logo.png';

export function FallbackView(): ReactElement {
    return (
        <div>
            <img src={Logo} alt="Start logo" />
            <span>Loading ...</span>
        </div>
    );
}
