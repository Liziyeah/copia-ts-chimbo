import { getMovies } from './data/dataFilms';
import './components/indexPadre';

class AppContainer extends HTMLElement {
    movies?: any[];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        this.movies = await getMovies();

        console.log(this.movies);

        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = /*html*/ `
            ${this.movies
                ?.map((movie) => {
                    return /*html*/ `
                        <custom-film filmId = "${movie.id}"
                         utitle = "${movie.title}"
                         original_title = "${movie.original_title_romanised}"
                         release_date = "${movie.release_date}"
                         description = "${movie.description}"
                         director = "${movie.director}">
                        </custom-film>
                         `;
                })
                .join('')}
            `;
        }
    }
}

customElements.define('app-container', AppContainer);
