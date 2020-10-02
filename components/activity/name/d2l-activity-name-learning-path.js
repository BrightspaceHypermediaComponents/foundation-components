import '../../common/d2l-hm-name.js';
import '@brightspace-ui/core/components/inputs/input-text.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '../../../framework/hypermedia-components.js';
import { HypermediaLitMixin, observableTypes } from '../../../framework/hypermedia-lit-mixin.js';
import { ifDefined } from 'lit-html/directives/if-defined';

const rels = Object.freeze({
	specialization: 'https://api.brightspace.com/rels/specialization'
});

class ActivityNameLearningPath extends HypermediaLitMixin(LitElement) {
	static get properties() {
		return {
			name: { type: String, observable: observableTypes.property, route: [{observable: observableTypes.link, rel: rels.specialization}]},
			updateName: { type: Object, observable: observableTypes.action, name: 'update-name', route: [{observable: observableTypes.link, rel: rels.specialization}]},
			_specalizationHref: { type: String, observable: observableTypes.link, rel: rels.specialization }
		};
	}

	static get styles() {
		return [ css`` ];
	}

	render() {
		return html`
			${this._hasAction('updateName') ? html`<d2l-input-text @input="${this._onInputName}" @change="${this._onChangeName}" label="Name" placeholder="Enter a name" value="${this.name}"></d2l-input-text>` : null}
			<d2l-hm-name href="${ifDefined(this._specalizationHref)}" .token="${this.token}"></d2l-hm-name>
		`;
	}

	_onChangeName(e) {
		if (this.updateName.has) {
			this.updateName.perform({name: e.target.value});
		}
	}

	_onInputName(e) {
		if (this.updateName.has) {
			this.updateName.update({name: { observable: observableTypes.property, value: e.target.value} });
		}
	}

}

customHypermediaElement(
	'd2l-activity-name-learning-path',
	ActivityNameLearningPath,
	'd2l-activity-name',
	[['activity-usage', 'learning-path']]);
