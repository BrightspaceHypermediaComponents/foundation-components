import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaLitMixin, observableTypes} from '../../framework/hypermedia-lit-mixin.js';

class HmDescription extends HypermediaLitMixin(LitElement) {
	static get properties() {
		return {
			description: { type: String, observable: observableTypes.property }
		};
	}

	static get styles() {
		return [ css`` ];
	}

	render() {
		return html`
			${this.description}
		`;
	}

}
customElements.define('d2l-hm-description', HmDescription);
