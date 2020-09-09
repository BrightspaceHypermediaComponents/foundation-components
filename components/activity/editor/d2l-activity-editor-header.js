import '../description/d2l-activity-description.js';
import '../name/d2l-activity-name.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { html } from '../../../framework/hypermedia-components.js';
import { HypermediaLitMixin } from '../../../framework/hypermedia-lit-mixin.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

class ActivityEditorHeader extends HypermediaLitMixin(LitElement) {

	static get properties() {
		return {
			subTitle: { type: String, attribute: 'sub-title' }
		};
	}

	static get styles() {
		return css`
			:host {
				background: white;
				box-shadow: inset 0 -1px 0 0 #e3e9f1;
				display: block;
				padding: 0.75rem 1.5rem 0;
			}

			@media only screen and (max-width: 929px) {
				:host {
					padding-left: 1.2rem;
					padding-right: 1.2rem;
				}
			}
		`;
	}
	render() {
		return html`
			<div class="d2l-heading-4 d2l-activity-sub-header">${this.subTitle}</div>
			<h1 class="d2l-heading-1">
				<d2l-activity-name href="${ifDefined(this.href)}" .token="${this.token}"></d2l-activity-name>
			</h1>
			<d2l-activity-description href="${ifDefined(this.href)}" .token="${this.token}"></d2l-activity-description>
		`;
	}
}

customElements.define('d2l-activity-editor-header', ActivityEditorHeader);