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
        ${this.movies?.map((peli) => {
            return /*html*/ `
            <custom-film filmId = "${peli.id}" >
            </custom-film>`;
        })}`;
        }
    }
}

customElements.define('app-container', AppContainer);
