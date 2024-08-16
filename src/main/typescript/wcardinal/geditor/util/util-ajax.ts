/*
 * Copyright (C) 2021 Toshiba Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UtilAjaxOptions {
	url: string;
	success: (response: string, xhr: XMLHttpRequest) => void;
	error: (reason: string, xhr: XMLHttpRequest) => void;
	headers?: Record<string, string | null | undefined>;
	timeout?: number;
	data?: XMLHttpRequestBodyInit | null;
}

export const UtilAjax = {
	send(method: string, settings: UtilAjaxOptions): void {
		let isCompleted = false;

		const makeOnError = (reason: string) => {
			return () => {
				if (!isCompleted) {
					isCompleted = true;
					settings.error(reason, xhr);
				}
			};
		};

		const xhr = new XMLHttpRequest();
		xhr.open(method, settings.url, true);
		xhr.onload = (): void => {
			if (!isCompleted) {
				isCompleted = true;
				const status = xhr.status;
				if (
					(200 <= status && status < 300) ||
					status === 0 ||
					status === 304 ||
					status === 1223
				) {
					settings.success(xhr.responseText, xhr);
				} else {
					settings.error(xhr.statusText, xhr);
				}
			}
		};
		const onError = makeOnError("error");
		xhr.onerror = onError;
		xhr.onabort = makeOnError("abort");

		// Headers
		const headers = settings.headers;
		if (headers != null) {
			for (const name in headers) {
				const header = headers[name];
				if (header != null) {
					xhr.setRequestHeader(name, header);
				}
			}
		}
		xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

		// Timeout
		const timeout = settings.timeout;
		if (timeout != null) {
			xhr.timeout = timeout;
			xhr.ontimeout = makeOnError("timeout");
			if (0 < timeout) {
				// For browsers which do not support the `timeout`
				setTimeout((): void => {
					xhr.abort();
				}, timeout);
			}
		}

		// Send
		try {
			const data = settings.data;
			if (data != null) {
				xhr.send(data);
			} else {
				xhr.send();
			}
		} catch {
			onError();
		}
	}
};
