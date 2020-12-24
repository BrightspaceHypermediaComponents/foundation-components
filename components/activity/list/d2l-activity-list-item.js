import '../image/d2l-activity-image.js';
import '../name/d2l-activity-name.js';
import '../type/d2l-activity-type.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { guard } from 'lit-html/directives/guard';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { ListItemMixin } from '@brightspace-ui/core/components/list/list-item-mixin.js';
import { LitElement } from 'lit-element/lit-element.js';

const rels = Object.freeze({
	activityUsage: 'https://activities.api.brightspace.com/rels/activity-usage'
});

class ActivityListItem extends HypermediaStateMixin(ListItemMixin(LitElement)) {
	static get properties() {
		return {
			_activityHref: { type: String, observable: observableTypes.link, rel: rels.activityUsage }
		};
	}

	render() {
		return this._renderListItem({
			illustration: html`${guard([this._activityHref, this.token], () => html`<d2l-activity-image href="${this._activityHref}" .token="${this.token}"></d2l-activity-image>`)}`,
			content: html`${guard([this._activityHref, this.token], () => html`
				<d2l-activity-name href="${this._activityHref}" .token="${this.token}"></d2l-activity-name>
				<d2l-activity-type href="${this._activityHref}" .token="${this.token}" slot="supporting-info"></d2l-activity-type>`
			)}`
		});
	}
}
customElements.define('d2l-activity-list-item', ActivityListItem);
