import '../../common/d2l-hm-course-image.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from 'foundation-engine/src/framework/hypermedia-components.js';
import { HypermediaLitMixin, observableTypes } from 'foundation-engine/src/framework/hypermedia-lit-mixin.js';
import { ifDefined } from 'lit-html/directives/if-defined';

const rels = Object.freeze({
	organization: 'https://api.brightspace.com/rels/organization'
});

class ActivityImageCollection extends HypermediaLitMixin(LitElement) {
	static get properties() {
		return {
			_organizationHref: { type: String, observable: observableTypes.link, rel: rels.organization }
		};
	}

	static get styles() {
		return [ css`` ];
	}

	render() {
		return html`
			<d2l-hm-course-image class="d2l-activitiy-collection-list-item-illustration" href="${ifDefined(this._organizationHref)}" .token="${this.token}"></d2l-hm-course-image>
		`;
	}

}

customHypermediaElement('d2l-activity-image-collection', ActivityImageCollection, 'd2l-activity-image', [['activity-usage', 'learning-path']]);
