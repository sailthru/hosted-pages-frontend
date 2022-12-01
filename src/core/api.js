import { http } from "./http";

export function fetchPages() {
  return http.get("/uiapi/page");
}

export function createPage(data) {
  return http.post("/uiapi/page", data);
}

export function updatePage({ pageId, data }) {
  return http.patch(`/uiapi/page?id=${pageId}`, data);
}

export function deletePage(pageId) {
  return http.delete(`/uiapi/page?id=${pageId}`);
}
