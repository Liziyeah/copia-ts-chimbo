interface Datashape {
    utitle: string;
    original_title: string;
    release_date: string;
    description: string;
    director: string;
}

export const getMovies = async () => {
    try {
        const getMovies = await fetch(
            'https://ghibliapi.vercel.app/films'
        ).then((result) => result.json());

        return getMovies;
    } catch (error) {
        console.log(error);
    }
};

export const getPeople = async (id: string) => {
    try {
        const getPeople = await fetch(
            `https://ghibliapi.vercel.app/people/${id}`
        ).then((result) => result.json());
        const { name, gender } = getPeople;

        return { name, gender };
    } catch (error) {
        console.log(error);
    }
};
