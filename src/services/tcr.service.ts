import { api } from "./api.interceptor";

export class TcrService {
  private readonly CONTROLLER = "tcr";

  async createTcr(payload: any) {
    const response = await api
      .post(`${this.CONTROLLER}/create`, payload)
      .catch((error) => {
        throw error;
      });

    return response.data;
  }

  async updateTcr(tcrId: string, payload: any) {
    const response = await api
      .put(`${this.CONTROLLER}/update/${tcrId}`, payload)
      .catch((error) => {
        throw error;
      });

    return response.data;
  }

  async fetchAllTcr() {
    const response = await api.get(`${this.CONTROLLER}/all`).catch((error) => {
      throw error;
    });

    return response.data;
  }

  async approveTcr(tcrId: string, type: "APPROVED" | "REJECTED") {
    const response = await api
      .post(`${this.CONTROLLER}/review/${tcrId}/${type}`)
      .catch((error) => {
        throw error;
      });
    return response.data;
  }

  async fetchTcrById(tcrId: string) {
    const response = await api
      .get(`${this.CONTROLLER}/get/${tcrId}`)
      .catch((error) => {
        throw error;
      });

    return response.data;
  }

  async deleteTcr(tcrId: string) {
    const response = await api
      .delete(`${this.CONTROLLER}/${tcrId}`)
      .catch((error) => {
        throw error;
      });

    return response.data;
  }
}
