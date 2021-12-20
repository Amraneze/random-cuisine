export const ErrorBoundaryStyles = {
    root: {
        textAlign: 'center',
        padding: '3rem',
    },
    img: {
        width: 450,
        height: 450,
        margin: '2rem 0',
        '@media (max-width: 600px)': {
            width: 300,
            height: 300,
        },
        '@media (max-width: 450px)': {
            width: 150,
            height: 150,
        },
    },
    title: {
        marginBottom: '1rem',
    },
    subtitle: {
        marginBottom: '5rem',
    },
} as const;
