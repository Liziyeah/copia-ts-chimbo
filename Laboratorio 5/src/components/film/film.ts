import { getPeople } from '../../data/dataFilms';
import People from '../people/people';

enum Attribute {
    'filmId' = 'filmId',
    'utitle' = 'utitle',
    'original_title' = 'original_title',
    'release_date' = 'release_date',
    'description' = 'description',
    'director' = 'director',
}

class Film extends HTMLElement {
    people?: String[];
    filmId?: string;
    utitle?: string;
    original_title?: string;
    release_date?: string;
    description?: string;
    director?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        // this.onButtonClicked = this.onButtonClicked.bind(this);
    }

    static get observedAttributes() {
        const attrs: Record<Attribute, null> = {
            filmId: null,
            utitle: null,
            original_title: null,
            release_date: null,
            description: null,
            director: null,
        };

        return Object.keys(attrs);
    }

    attributeChangedCallback(
        propName: Attribute,
        oldValue: Film[Attribute],
        newValue: Film[Attribute]
    ) {
        this[propName] = newValue;

        this.render();
    }
    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = /*html*/ `
            <div>
                <ul>
                    <li>${this.utitle}</li>
                    <li>${this.original_title}</li>
                    <li>${this.release_date}</li>
                    <li>${this.description}</li>
                    <li>${this.director}</li>
                </ul>
            </div>
            <custom-people id="people"></custom-people>
            <button id="show-details">Show</button>
            `;
            const button = this.shadowRoot.querySelector(
                '#show-details'
            )! as HTMLButtonElement;
            const people = this.shadowRoot.querySelector(
                '#people'
            )! as HTMLDivElement;

            button.addEventListener('click', async (event) => {
                const people = await getPeople(this.filmId!);
                people.setAttribute(Attribute.name, people.name);
            });
        }
    }

    // mount() {
    //     this.render();
    //     this.addListener()
    // }

    // addListener() {
    //     this.shadowRoot?.querySelector('#people')?.addEventListener('click', this.onButtonClicked);
    // }

    // async onButtonClicked() {
    //     try{
    //         if(this.people !== undefined){
    //             const showPeople = JSON.parse(this.people)
    //             showPeople?.forEach(async (url: string) => {
    //                 const person = await getPeople(url)
    //                 const card = document.createElement('custom-people') as People,
    //                 card.setAttribute(Attribute)

    //             });
    //         }
    //     }
    // }
}

customElements.define('custom-film', Film);

export default Film;
