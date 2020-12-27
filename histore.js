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

	let initialized = true
	if (window.transit === undefined) {
		window.transit = {}
		initialized = false
	}

	const previousReplaceState = history.replaceState
	const previousPushState = history.pushState

	const get = key => history.state && history.state[key];
	const set = (key, value) => {
		window.transit[key] = value;
		console.log(`*** Set transit: ${key} / ${value}`)

		//const state = {};
		//state[key] = value;
		//history.replaceState(state);
	};
	const flush = () => {
		console.log(`*** Flush:`)
		console.log(window.transit)

		history.replaceState(window.transit);
	}
	
	const wrap = m => (state, title, url) => {
		console.log(`ReplaceState called`)
		console.log(Object.assign({}, history.state, state || {}, window.transit))

		return m.call(history, Object.assign({}, history.state, state || {}, window.transit), title, url)
	}

	const wrapPush = m => (state, title, url) => {
		console.log(`PushState called`)
		history.replaceState(window.transit)

		window.transit.position = 0

		console.log(Object.assign({}, history.state, state || {}, window.transit))

		return m.call(history, Object.assign({}, history.state, state || {}, window.transit), title, url)
	}

	if (!initialized) {
		history.pushState = wrapPush(history.pushState);
		history.replaceState = wrap(history.replaceState);
	}

	return { set, get, flush };
}
