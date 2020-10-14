// START custom component imports
// END custom component imports
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import '../item/d2l-activity-item.js';

import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from 'foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaLitMixin, observableTypes } from 'foundation-engine/framework/lit/hypermedia-lit-mixin.js';
import { repeat } from 'lit-html/directives/repeat';

const rels = Object.freeze({
	collection: 'https://activities.api.brightspace.com/rels/activity-collection',
	item: 'item'
});

class ActivityEditorMainCollection extends HypermediaLitMixin(LitElement) {

	static get properties() {
		return {
			items: { type: Array, observable: observableTypes.subEntities, rel: rels.item, route: [{observable: observableTypes.link, rel: rels.collection}] }
		};
	}

	static get styles() {
		return [ css`
			.d2l-activity-collection-body {
				margin: auto;
				max-width: 1230px;
				padding: 0 1.5rem;
			}
			.d2l-activity-collection-body-content {
				max-width: 820px;
				padding: 0 0.35rem;
			}
			.d2l-activity-collection-activities {
				margin: 0 -1.5rem;
				max-width: 881px;
				padding: 0 0.05rem;
			}
			.d2l-activity-collection-list-actions {
				align-items: baseline;
				display: flex;
				justify-content: space-between;
				margin: 0.9rem 0;
				max-width: 820px;
				position: relative;
			}
		`];
	}

	constructor() {
		super();
		this.items = [];
	}

	render() {
		return html`
			<div class="d2l-activity-collection-body">
				<div class="d2l-activity-collection-body-content">
					<div class="d2l-activity-collection-list-actions">
						<d2l-button primary>Add Activity</d2l-button>
						<div class="d2l-body-compact">Activities: ${this.items.length}</div>
					</div>
				</div>
				<div class="d2l-activity-collection-activities">
					<d2l-list @d2l-list-item-position-change="${this._moveItems}">
						${repeat(this.items, href => href, href => html`<d2l-activity-item href="${href}" .token="${this.token}" draggable key="${href}"></d2l-activity-item>`)}
					</d2l-list>
				</div>
			</div>
		`;
	}

	_moveItems(e) {
		e.detail.reorder(this.items, { keyFn: (item) => item });
		this.requestUpdate('items', []);
	}
}

customHypermediaElement('d2l-activity-editor-main-collection', ActivityEditorMainCollection, 'd2l-activity-editor-main', [['activity-collection'], ['learning-path']]);
