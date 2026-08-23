import { api } from "./api.interceptor";

export class StationService {
  private readonly CONTROLLER = "station";

  async getAllStations() {
    const res = await api.get(`${this.CONTROLLER}/all`).catch((error) => {
      throw error;
    });

    return res.data;
  }

  async removeStation(id: string) {
    const res = await api
      .delete(`${this.CONTROLLER}/remove/${id}`)
      .catch((error) => {
        throw error;
      });

    return res.data;
  }

  async createNewStation(payload: {
    code: string;
    name: string;
    address: string;
  }) {
    const res = await api
      .post(`${this.CONTROLLER}/create`, payload)
      .catch((error) => {
        throw error;
      });

    return res.data;
  }

  async updateStation(id: string, payload: {
    code: string;
    name: string;
    address: string;
  }) {
    const res = await api
      .put(`${this.CONTROLLER}/update/${id}`, payload)
      .catch((error) => {
        throw error;
      });

    return res.data;
  }
}
