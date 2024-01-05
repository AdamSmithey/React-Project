import http from "../http-common";

class CategoryDataService {
  create(category) {
    return http.post("/categories", category);
  }

  get(data) {
    return http.get(`/categories`, data);
  }

  update(id, data) {
    return http.put(`/categories/${id}`, data);
  }

  delete(id) {
    return http.delete(`/categories/${id}`);
  }

}

export default new CategoryDataService();