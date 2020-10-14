import '../../common/d2l-hm-description.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from 'foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaLitMixin, observableTypes } from 'foundation-engine/framework/lit/hypermedia-lit-mixin.js';
import { ifDefined } from 'lit-html/directives/if-defined';

const rels = Object.freeze({
	specialization: 'https://api.brightspace.com/rels/specialization'
});

class ActivityDescriptionLearningPath extends HypermediaLitMixin(LitElement) {
	static get properties() {
		return {
			_specalizationHref: { type: String, observable: observableTypes.link, rel: rels.specialization }
		};
	}

	static get styles() {
		return [ css`` ];
	}

	render() {
		return html`
			<d2l-hm-description href="${ifDefined(this._specalizationHref)}" .token="${this.token}"></d2l-hm-description>
		`;
	}

}

customHypermediaElement('d2l-activity-description-learning-path', ActivityDescriptionLearningPath, 'd2l-activity-description', [['activity-usage', 'learning-path']]);
