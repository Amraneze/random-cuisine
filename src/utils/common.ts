/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { LastCuisine } from '@types';

/* eslint-disable @typescript-eslint/no-explicit-any */
const isEmpty = (obj: any): boolean =>
    obj === undefined || obj === null
        ? true
        : Array.isArray(obj) || typeof obj === 'string'
        ? obj.length === 0
        : Object.entries(obj).length === 0 && obj.constructor === Object;

const isNotEmpty = (obj: any): boolean => !isEmpty(obj);

/**
 * A function to capitalize the first letter of a word
 * @param {string} the word to be capitalized
 * @returns the capitalized word or empty string if the argument is not a string
 */
const capitalize = (text: string) => `${text.charAt(0).toUpperCase()}${text.slice(1)}`;

/**
 * Get a list of random HEX colors
 * @param number number of colors to be generated
 * @returns A HEX representation of a random color
 */
export const getRandomColors = (number: number): string[] =>
    [
        '#001219',
        '#005F73',
        '#0A9396',
        '#94D2BD',
        '#E9D8A6',
        '#EE9B00',
        '#CA6702',
        '#BB3E03',
        '#81B29A',
        '#3D405B',
        '#E07A5F',
        '#34A0A4',
        '#99D98C',
        '#1A759F',
        '#83C5BE',
        '#184E77',
        '#168AAD',
        '#006D77',
        '#FFDDD2',
    ].slice(0, number);
// Array.from(Array(number), () => `#${((Math.random() * 0xffffff) << 0).toString(16)}`);

/**
 * Calculate the difference between two dates in days
 * @param date1 the first date
 * @param date2 the second date
 * @returns number of days between the two dates
 */
const getDaysBetweenDates = (date1: Date, date2: Date) =>
    Math.abs(Math.round((date2.getTime() - date1.getTime()) / (24 * 3600 * 1000)));

/**
 * Create a sliding window which will remove old elements if it exceeds the size of the cuisines
 * saved by the user. Example: (we can say that today is 12/12/2021)
 * LastCuisine = [{name: 'test1', date: '08/12/2021'},{name: 'test2', date: '09/12/2021'},{name: 'test3', date: '10/12/2021'}]
 * Cuisines = [{ name: 'test1', ... },{ name: 'test2', ... },{ name: 'test3', ... }]
 * This function should return an empty array
 * @param size size of the cuisine saved by the user
 * @param array the previous cuisine that was shown to the user
 * @returns a new array of cuisine that are shown before
 */
export const slidingWindowByDates = (size: number, array: LastCuisine[]) =>
    array.filter((lastCuisine) => size > getDaysBetweenDates(new Date(), lastCuisine.date));

export const randomNumberByRange = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export { isEmpty, isNotEmpty, capitalize };
