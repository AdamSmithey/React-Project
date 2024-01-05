import http from "../http-common";

class ContentDataService {
  create(contents) {
    return http.post("/contents", contents);
  }

  get(categoryId) {
    return http.get(`/contents`, {params: {categoryId: categoryId}});
  }

  delete(id) {
    return http.delete(`/contents/${id}`);
  }
}

export default new ContentDataService();