export enum CuisineType {
    AMERICAN = 'American',
    ASIAN = 'Asian',
    BRITISH = 'British',
    CARIBBEAN = 'Caribbean',
    CENTRAL_EUROPE = 'Central Europe',
    CHINESE = 'Chinese',
    EASTERN_EUROPE = 'Eastern Europe',
    FRENCH = 'French',
    INDIAN = 'Indian',
    JAPANESE = 'Japanese',
    MEDITERRANEAN = 'Mediterranean',
    MEXICAN = 'Mexican',
    MIDDLE_EASTERN = 'Middle Eastern',
    NORDIC = 'Nordic',
    KOREAN = 'Korean',
    THAI = 'Thai',
    VIETNAMESE = 'Vietnamese',
    SOUTH_AMERICAN = 'South American',
    SOUTH_EAST_ASIAN = 'South East Asian',
}

export enum CuisineImage {
    AMERICAN = 'https://cdn.pixabay.com/photo/2018/01/04/17/14/eating-3061164_960_720.jpg',
    ASIAN = 'https://cdn.pixabay.com/photo/2014/11/05/16/00/thai-food-518035_960_720.jpg',
    BRITISH = 'https://cdn.pixabay.com/photo/2016/08/12/06/10/breakfast-1587780_960_720.jpg',
    CARIBBEAN = 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    CENTRAL_EUROPE = 'https://images.unsplash.com/photo-1565494490966-4b5088bcd0ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    CHINESE = 'https://cdn.pixabay.com/photo/2017/02/25/15/18/spring-rolls-2097978_960_720.jpg',
    EASTERN_EUROPE = 'https://live.staticflickr.com/6012/5963492308_b5f96aa637_c_d.jpg',
    FRENCH = 'https://cdn.pixabay.com/photo/2017/02/15/05/15/quiche-2067686_960_720.jpg',
    INDIAN = 'https://cdn.pixabay.com/photo/2021/07/29/12/43/curry-6507120_960_720.jpg',
    JAPANESE = 'https://cdn.pixabay.com/photo/2021/08/07/13/38/sushi-6528645_960_720.jpg',
    MEDITERRANEAN = 'https://cdn.pixabay.com/photo/2016/06/30/18/49/sardines-1489626_960_720.jpg',
    MEXICAN = 'https://cdn.pixabay.com/photo/2021/08/12/19/10/quesadilla-6541567_960_720.jpg',
    MIDDLE_EASTERN = 'https://images.unsplash.com/photo-1541754202-9eb0e8c13b6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1042&q=80',
    NORDIC = 'https://cdn.pixabay.com/photo/2016/08/17/13/13/herring-1600392_960_720.jpg',
    KOREAN = 'https://cdn.pixabay.com/photo/2019/07/25/01/35/kimchi-4361465_960_720.jpg',
    THAI = 'https://cdn.pixabay.com/photo/2021/07/04/13/23/green-curry-6386360_960_720.jpg',
    VIETNAMESE = 'https://cdn.pixabay.com/photo/2021/10/29/08/09/beef-noodles-6751324_960_720.jpg',
    SOUTH_AMERICAN = 'https://images.unsplash.com/photo-1535400459727-5d1544cb0939?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    SOUTH_EAST_ASIAN = 'https://images.unsplash.com/photo-1583579366799-7106fb626a54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
}

export type Cuisine = {
    name: string;
    type: keyof CuisineType;
    imgUrl: string;
};

export type LastCuisine = {
    name: string;
    date: Date;
};

export type User = {
    name: string;
    address?: string;
    location?: {
        lat?: number;
        lng?: number;
        street?: string;
        zipCode?: string;
        city?: string;
    };
    cuisines: Cuisine[];
};
