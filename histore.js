/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export default function histore() {
	// Server
	if (typeof history === 'undefined') {
		return { get() {}, set() {}, reset() {}, flush() {} };
	}

	let initialized = true
	if (window.__histore_transit === undefined) {
		window.__histore_transit = {}
		window.__histore_transit_id = -1
		initialized = false
	}

	const get = key => history.state && history.state[key]
	const set = (key, value) => {
		clearTimeout(window.__histore_transit_id)
		window.__histore_transit[key] = value;
		window.__histore_transit_id = setTimeout(() => flush(), 100) // Throttle for chrome
	}

	const getTransit = key => window.__histore_transit[key]

	const reset = (state) => {
		window.__histore_reset = state;
	}

	const flush = () => {
		history.replaceState(window.__histore_transit);
	}

	const wrapReplace = m => (state, title, url) => {
		return m.call(history, Object.assign({}, history.state, state || {}), title, url)
	}

	const wrapPush = m => (state, title, url) => {
		history.replaceState(window.__histore_transit)

		if (window.__histore_reset !== undefined) {
			for (var prop in window.__histore_reset) {
				if (Object.prototype.hasOwnProperty.call(window.__histore_reset, prop)) {
					window.__histore_transit[prop] = window.__histore_reset[prop]
				}
			}
		}

		return m.call(history, Object.assign({}, history.state, state || {}, window.__histore_transit), title, url)
	}

	if (!initialized) {
		history.pushState = wrapPush(history.pushState);
		history.replaceState = wrapReplace(history.replaceState);
	}

	return { set, get, getTransit, flush, reset };
}
