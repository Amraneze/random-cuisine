import clsx from 'clsx';
import { ReactElement, useState, useMemo, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ReactSnackBar from 'react-js-snackbar';

import {
    defaultUser,
    ACCOUNT_KEY,
    LAST_CUISINE_KEY,
    ACCOUNT_ALREADY_CREATED_KEY,
    getDataFromLocalStorage,
    setDataFromLocalStorage,
    deleteDataFromLocalStorage,
    findPoint,
    annularSector,
    getRandomColors,
    isMarkerInSliceView,
    slidingWindowByDates,
    randomNumberByRange,
} from '@utils';
import { LastCuisine, User } from '@types';
import { RoutersConstant } from '@routes';
import { changeHeaderTitle as changeHeaderTitleAction } from '@redux';
import './Home.scss';

const homeTranslationKey = 'views.home.';

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            changePageTitle: changeHeaderTitleAction,
        },
        dispatch
    );

const connector = connect(null, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

function Home({ changePageTitle }: Props): ReactElement {
    const { t } = useTranslation();
    const history = useHistory();
    const intervalIdRef = useRef<number>();
    const isStoppedRef = useRef<boolean>(false);
    const [isStopped, setStopped] = useState(false);
    const [isSpinning, setSpinning] = useState(false);
    const [savedCuisine, setSavedCuisine] = useState<LastCuisine | null>(null);
    const user = useMemo(() => getDataFromLocalStorage<User>(ACCOUNT_KEY, defaultUser), []);
    const lastCuisines = useMemo(() => {
        const previousLastCuisines = getDataFromLocalStorage<LastCuisine[]>(LAST_CUISINE_KEY, []);
        const newLastCuisines = slidingWindowByDates(user.cuisines.length, previousLastCuisines);
        setDataFromLocalStorage<LastCuisine[]>(LAST_CUISINE_KEY, newLastCuisines);
        return newLastCuisines;
    }, [user]);

    if (JSON.stringify(user) === JSON.stringify(defaultUser) || user.cuisines.length === 0) {
        // I don't think that we will get into this, but you never know ¯\_(ツ)_/¯
        deleteDataFromLocalStorage(ACCOUNT_ALREADY_CREATED_KEY);
        deleteDataFromLocalStorage(ACCOUNT_KEY);
        history.push(RoutersConstant.CREATION);
    }
    // Already did fast fail in case of user.cuisines.length === 0
    const slices = Math.round(360 / user.cuisines.length);

    useEffect(() => {
        changePageTitle(t(`${homeTranslationKey}title`));
    }, [t, changePageTitle]);

    useEffect(() => {
        if (savedCuisine !== null) {
            window.setTimeout(() => {
                history.push(RoutersConstant.SUGGESTIONS, savedCuisine);
            }, 2500);
        }
    }, [history, savedCuisine]);

    const spinTheWheel = () => {
        setStopped(false);
        setSpinning(true);
        isStoppedRef.current = false;
        intervalIdRef.current = window.setInterval(() => {
            // I can't use IntersectionObserver, the moving is fast that it returns intersectionRatio = 0 & isIntersecting false
            const slicesDOM = Array.from(document.querySelectorAll('.sw-slicesGroup > path'));
            const [markerDOM] = document.getElementsByClassName('sWheel-marker');
            slicesDOM.forEach((sliceDOM) => {
                const { value } = (sliceDOM as HTMLElement).dataset;
                const isInView = isMarkerInSliceView(sliceDOM, markerDOM);
                if (
                    value &&
                    isInView &&
                    !isStoppedRef.current &&
                    !lastCuisines.some((cuisine) => cuisine.name === value)
                ) {
                    window.clearInterval(intervalIdRef.current);
                    isStoppedRef.current = true;
                    setStopped(true);
                    setSavedCuisine({
                        name: value,
                        date: new Date(),
                    });
                }
            });
        }, randomNumberByRange(100, 500));
    };

    const calculateRotationOfEachCuisine = (index: number) => index * slices;

    const createLine = (index: number) => {
        const point1 = findPoint(100, 100, 100, slices * index);
        const point2 = findPoint(100, 100, 0, slices * index);
        return { point1, point2 };
    };

    const createArc = (index: number) =>
        annularSector({
            startDegrees: index * slices,
            endDegrees: (index + 1) * slices,
            innerRadius: 30,
            outerRadius: 100,
        });

    const colors = useMemo(() => getRandomColors(user.cuisines.length), [user]);

    return (
        <Grid container direction="column" alignItems="center">
            <ReactSnackBar Icon={<span>🦄</span>} Show={!!savedCuisine}>
                {`${t(`${homeTranslationKey}winningCuisine`)} ${savedCuisine?.name}`}
            </ReactSnackBar>
            <div className="wheel">
                <div className="sWheel-wrapper">
                    <div className="sWheel-inner">
                        <div className={clsx('sWheel', isSpinning && 'rotate', isStopped && 'paused')}>
                            <div className="sWheel-bg-layer">
                                <svg
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 200 200"
                                    xmlSpace="preserve"
                                >
                                    <defs>
                                        <clipPath id="cut-off-line">
                                            <path
                                                strokeWidth="0"
                                                fill="#ccc"
                                                d="M199,100 A99,99,0,1,1,198.9999984921438,99.98272124049305 L129.99999954307387,99.99476401227062 A30,30,0,1,0,130,100 z"
                                            />
                                        </clipPath>
                                    </defs>
                                    <g className="sw-slicesGroup">
                                        {user.cuisines.map((cuisine, index) => {
                                            const d = createArc(index);
                                            return (
                                                <path
                                                    key={cuisine.name}
                                                    strokeWidth="0"
                                                    fill={colors[index]}
                                                    data-fill={colors[index]}
                                                    d={d}
                                                    data-value={cuisine.name}
                                                />
                                            );
                                        })}
                                    </g>
                                    <g>
                                        {user.cuisines.map((cuisine, index) => {
                                            const { point1, point2 } = createLine(index);
                                            return (
                                                <line
                                                    x1={point1.x}
                                                    y1={point1.y}
                                                    x2={point2.x}
                                                    y2={point2.y}
                                                    fill="none"
                                                    strokeWidth="3"
                                                    stroke="#e4e4e4"
                                                    key={cuisine.name}
                                                    clipPath="url(#cut-off-line)"
                                                />
                                            );
                                        })}
                                    </g>
                                    <circle
                                        className="outerLine"
                                        cx="100"
                                        cy="100"
                                        r="97.5"
                                        stroke="#e4e4e4"
                                        strokeWidth="5"
                                        fillOpacity="0"
                                        fill="none"
                                    />
                                    <circle
                                        className="innerLine"
                                        cx="100"
                                        cy="100"
                                        r="31"
                                        stroke="#e4e4e4"
                                        strokeWidth="4"
                                        fillOpacity="1"
                                        fill="#FFFFFF00"
                                    />
                                </svg>
                            </div>
                            <div className="sWheel-txt-wrap">
                                <div className="sWheel-txt" style={{ transform: 'rotate(30deg)' }}>
                                    {user.cuisines.map((cuisine, index) => (
                                        <div
                                            key={cuisine.name}
                                            data-color="#fff"
                                            className="sWheel-title"
                                            style={{
                                                paddingRight: '8%',
                                                transform: `rotate(${calculateRotationOfEachCuisine(
                                                    index
                                                )}deg) translate(0px, -50%)`,
                                                color: 'rgb(255, 255, 255)',
                                            }}
                                        >
                                            {cuisine.name}
                                            <div />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="sWheel-center" />
                        </div>
                    </div>
                    <div className={clsx('sWheel-marker', isSpinning && !isStopped && 'rotate')}>
                        <svg
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            viewBox="0 0 80 115"
                            xmlSpace="preserve"
                        >
                            <g>
                                <path
                                    fill="#e74c3c"
                                    d="M40,0C17.9,0,0,17.7,0,39.4S40,115,40,115s40-53.9,40-75.6S62.1,0,40,0z M40,52.5c-7,0-12.6-5.6-12.6-12.4 S33,27.7,40,27.7s12.6,5.6,12.6,12.4C52.6,46.9,47,52.5,40,52.5z"
                                />
                                <path
                                    fill="rgba(0, 0, 0, 0.3)"
                                    d="M40,19.2c-11.7,0-21.2,9.3-21.2,20.8S28.3,60.8,40,60.8S61.2,51.5,61.2,40S51.7,19.2,40,19.2z M40,52.5 c-7,0-12.6-5.6-12.6-12.4S33,27.7,40,27.7s12.6,5.6,12.6,12.4C52.6,46.9,47,52.5,40,52.5z"
                                />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
            <Button variant="contained" color="primary" onClick={spinTheWheel}>
                {t(`${homeTranslationKey}spinMe`)}
            </Button>
        </Grid>
    );
}

export default connector(Home);
