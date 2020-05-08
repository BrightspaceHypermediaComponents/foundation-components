import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaLitMixin, observableTypes } from '../../../framework/hypermedia-lit-mixin.js';
import { customHypermediaElement } from '../../../framework/hypermedia-components.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import '../../common/d2l-hm-description.js'

const rels = Object.freeze({
	organization: 'https://api.brightspace.com/rels/organization'
});

class ActivityDescriptionCourse extends HypermediaLitMixin(LitElement) {
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
			<d2l-hm-description href="${ifDefined(this._organizationHref)}" .token="${this.token}"></d2l-hm-description>
		`;
	}

}
customHypermediaElement('d2l-activity-description-course', ActivityDescriptionCourse, 'd2l-activity-description', [['activity-usage', 'course-offering']]);
