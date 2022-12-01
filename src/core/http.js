/**
 * Wrapper around [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
 * Marshalls data for the request and extracts body from the response.
 * Will log error and throw if response is not OK.
 *
 * Consumers can trigger any HTTP method using http function.
 * Example:
 *   http("uiapi/templates", { method: 'GET' });
 *
 * There are also shortcut methods:
 *   http.get("uiapi/templates", { "version": "v1" });
 *   http.post("uiapi/templates", data);
 *   http.put("uiapi/templates/3415123", { name: "New name" });
 *   http.delete("uiapi/templates/3415123");
 */
export async function http(url, requestOptions = {}) {
  const DefaultRequestOptions = {
    headers: {
      Accept: "application/json, text/javascript, */*; q=0.01",
      "Content-Type": "application/json; charset=UTF-8",
    },
    credentials: "same-origin",
  };
  const config = Object.assign({}, DefaultRequestOptions, requestOptions);
  const res = await fetch(url, config);
  return verifyResponse(res);
}

http.get = createShortMethod("GET");
http.head = createShortMethod("HEAD");
http.delete = createShortMethod("DELETE");

http.post = createShortMethodForData("POST");
http.put = createShortMethodForData("PUT");
http.patch = createShortMethodForData("PATCH");

/**
 * Handles fetch response by extracting body from response.
 * Throws if response is not OK.
 */
async function verifyResponse(res) {
  const body = await res.json();
  if (!res.ok) {
    throw body;
  }
  return body;
}

/**
 * Adds shortcut methods to http to make usage less verbose
 *
 * Query params should be passed as an object instead manually
 * concatenating the url str
 *
 * Examples:
 *  http.get('uiapi/templates', { version: "v1" });
 *      => GET https://my.sailthru.com/uiapi/templates?version=v1
 *  http.delete('uiapi/templates/123');
 */
function createShortMethod(method) {
  return function (url, queryParams = {}, requestOptions = {}) {
    if (queryParams != null && Object.keys(queryParams).length) {
      url += stringify(queryParams);
    }
    return http(url, {
      ...requestOptions,
      method: method,
    });
  };
}

/**
 * Adds shortcut methods for data requests
 *
 * Example:
 *  http.post('uiapi/templates', { name: 'new template name' });
 */
function createShortMethodForData(method) {
  return function (url, data = "", requestOptions = {}, queryParams = {}) {
    if (queryParams != null && Object.keys(queryParams).length) {
      url += stringify(queryParams);
    }
    if (typeof data !== "string") {
      data = JSON.stringify(data);
    }
    return http(url, {
      ...requestOptions,
      method: method,
      body: data,
    });
  };
}

/**
 * Accepts an object and returns query param string
 * @param queryParams
 * @returns {string}
 */
function stringify(queryParams) {
  return Object.keys(queryParams).reduce((accum, key, i) => {
    if (i === 0) {
      accum += "?";
    } else {
      accum += "&";
    }
    const val = queryParams[key];
    accum += `${key}`;
    if (val != null) {
      accum += `=${encodeURIComponent(val)}`;
    }
    return accum;
  }, "");
}
