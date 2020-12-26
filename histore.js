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
		return { get() {}, set () {} };
	}

	let transit = {}
	let empty = {}

	const previousReplaceState = history.replaceState
	const previousPushState = history.pushState

	const get = key => history.state && history.state[key];
	const set = (key, value) => {
		transit[key] = value;

		//const state = {};
		//state[key] = value;
		//history.replaceState(state);
	};
	const setEmpty = (obj) => {
		empty = obj;
	};
	const flush = () => {
		history.replaceState(transit, document.title);
	}
	const wrapPush = m => (state, title, url) => {
		previousReplaceState(Object.assign({}, history.state, transit), document.title)

		// Reset transit
		transit = {}
		for (var prop in empty) {
			if (Object.prototype.hasOwnProperty.call(empty, prop)) {
				transit[prop] = obj[prop];
			}
		}

		return m.call(history, Object.assign({}, history.state, state || {}, transit), title, url)
	}
	const wrap = m => (state, title, url) => {
		return m.call(history, Object.assign({}, history.state, state || {}, transit), title, url)
	}
	history.pushState = wrap(history.pushState);
	history.replaceState = wrap(history.replaceState);
	return { set, get, flush, setEmpty };
}
