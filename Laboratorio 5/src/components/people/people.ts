import { getPeople } from '../../data/dataFilms';

enum Attribute {
    'name' = 'name',
    'gender' = 'gender',
}

class People extends HTMLElement {
    peopleArray?: [];
    name?: string;
    gender?: string;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        const attrs: Record<Attribute, null> = {
            name: null,
            gender: null,
        };

        return Object.keys(attrs);
    }
    connectedCallback() {
        this.render();
    }

    attributedChangedCallback(
        propName: Attribute,
        oldValue: People[Attribute],
        newValue: People[Attribute]
    ) {
        this[propName] = newValue;

        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = /*html*/ `
                <div>
                    <ul>
                        <li>${this.name}</li>
                        <li>${this.gender}</li>
                    </ul>
                </div>
            `;
        }
    }
}

customElements.define('custom-people', People);

export default People;

declare global {
    interface HTMLElementTagNameMap {
        'custom-people': People;
    }
}
