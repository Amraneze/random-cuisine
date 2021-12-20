import { CSSProperties } from 'react';

export enum Color {
    Primary = 'primary',
    Secondary = 'secondary',
    Transparent = 'transparent',
}

export enum Size {
    Meduim = 'sm',
    Large = 'lg',
}

export type ReduxActionType = {
    type: string;
};

export interface StylesDictionary {
    [Key: string]: CSSProperties;
}

export type GenericType = {
    id: string;
};
