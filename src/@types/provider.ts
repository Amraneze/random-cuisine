import { GenericType } from './common';

export type Provider = GenericType & {
    name: string;
    amount?: number;
    services: GenericType[];
};
