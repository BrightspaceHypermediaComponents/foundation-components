// START custom component imports
// END custom component imports
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/list/list.js';
import '../../list/d2l-activity-list-item-accumulator.js';
import './d2l-activity-editor-collection-add.js';

import { bodyCompactStyles, heading3Styles} from '@brightspace-ui/core/components/typography/styles.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { LocalizeFoundationEditor } from '../lang/localization.js';
import { repeat } from 'lit-html/directives/repeat';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

const rels = Object.freeze({
	collection: 'https://activities.api.brightspace.com/rels/activity-collection',
	item: 'item'
});

class ActivityEditorMainCollection extends LocalizeFoundationEditor(SkeletonMixin(HypermediaStateMixin(LitElement))) {

	static get properties() {
		return {
			items: { type: Array, observable: observableTypes.subEntities, rel: rels.item, prime: true, route:
				[{ observable: observableTypes.link, rel: rels.collection }] },
			collectionHref: { observable: observableTypes.link, rel: rels.collection }
		};
	}

	static get styles() {
		return [ super.styles, heading3Styles, bodyCompactStyles, css`
			:host {
				background: white;
				height: 100%;
			}

			.d2l-activity-collection-body {
				border-top: 1px solid var(--d2l-color-gypsum);
				display: block;
				padding: 0 1.45rem;
				width: 100%;
			}
			.d2l-activity-collection-body-content {
				max-width: 820px;
				padding: 0 0.35rem;
			}
			.d2l-activity-collection-activities {
				margin: -0.65rem 0 0 -1.5rem;
				max-width: 861px;
				padding: 0 0.05rem;
			}
			.d2l-activity-collection-list-actions {
				align-items: baseline;
				display: flex;
				justify-content: space-between;
				margin: 1.2rem 1.5rem 0.9rem 0;
				max-width: 820px;
				position: relative;
			}
			.d2l-activity-collection-activity {
				align-items: center;
				background: var(--d2l-color-regolith);
				display: flex;
				height: 3rem;
				padding: 0 1.85rem;
			}
			.d2l-activity-collection-activity-header-3 {
				color: var(--d2l-color-ferrite);
			}
		`];
	}

	constructor() {
		super();
		this.items = [];
		this.skeleton = true;
	}

	get _loaded() {
		return !this.skeleton;
	}

	set _loaded(loaded) {
		this.skeleton = !loaded;
	}

	render() {
		return html`
			<div class="d2l-activity-collection-activity">
				<h3 class="d2l-heading-3 d2l-activity-collection-activity-header-3">Activities</h3>
			</div>
			<div class="d2l-activity-collection-body">
				<div class="d2l-activity-collection-body-content">
					<div class="d2l-activity-collection-list-actions">
						<d2l-activity-editor-collection-add href="${this.collectionHref}" .token="${this.token}">
						</d2l-activity-editor-collection-add>

						<div class="d2l-body-compact d2l-skeletize">${this.localize('text-activities')} ${this.items.length}</div>
					</div>
				</div>
				<div class="d2l-activity-collection-activities">
					<d2l-list @d2l-list-item-position-change="${this._moveItems}">${repeat(this.items, item => item.href || item.properties.actionState, item => html`
						<d2l-activity-list-item-accumulator
							href="${item.href || item.activityUsageHref}"
							.token="${this.token}"
							draggable
							key="${item.properties.id || item.properties.actionState}"></d2l-activity-list-item-accumulator>
						`)}
					</d2l-list>
				</div>
			</div>
		`;
	}

	_moveItems(e) {
		e.detail.reorder(this.items, { keyFn: (item) => item.properties.id || item.properties.actionState });
		this.requestUpdate('items', []);
	}
}

customHypermediaElement('d2l-activity-editor-main-collection', ActivityEditorMainCollection, 'd2l-activity-editor-main', [['activity-collection'], ['learning-path']]);
