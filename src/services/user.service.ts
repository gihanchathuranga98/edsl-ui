import type { Permission } from "../common/constants/permissions";
import { api } from "./api.interceptor";

export class UserService {
  private readonly CONTROLLER = "user";

  async login(email: string, password: string) {
    const res = await api
      .post(`${this.CONTROLLER}/login`, { email, password })
      .catch((error) => {
        throw error;
      });

    return res.data;
  }

  async recoverPassword(email: string) {
    const res = await api
      .post(`${this.CONTROLLER}/recover-password`, { email })
      .catch((error) => {
        throw error;
      });

    return res.data;
  }

  async getAllPasswordRecoveryRequests() {
    const res = await api
      .get(`${this.CONTROLLER}/recovery-requests`)
      .catch((error) => {
        throw error;
      });

    return res.data;
  }

  async fetchAllSystemUsers() {
    const res = await api.get(`${this.CONTROLLER}/all`).catch((error) => {
      throw error;
    });
    return res.data;
  }

  async createNewSystemUser(payload: {name: string, password: string, email: string, permissions: Permission}) {
    const res = await api
      .post(`${this.CONTROLLER}/create-user`, payload)
      .catch((error) => {
        throw error;
      });
    return res.data;
  }

  async fetchAllDesignations() {
    const res = await api
      .get(`${this.CONTROLLER}/designations`)
      .catch((error) => {
        throw error;
      });
    return res.data;
  }

  async removeSystemUser(id: string) {
    const res = await api
      .delete(`${this.CONTROLLER}/remove/${id}`)
      .catch((error) => {
        throw error;
      });
    return res.data;
  }

  async createNewDesignation(payload: {
    designation: string;
    fundShare: number;
  }) {
    const res = await api
      .post(`${this.CONTROLLER}/designation`, payload)
      .catch((error) => {
        throw error;
      });
    return res.data;
  }

  async createOfficer(payload: any) {
    const res = await api
      .post(`${this.CONTROLLER}/officer`, payload)
      .catch((error) => {
        throw error;
      });

    return res.data;
  }

  async fetchAllOfficers() {
    const res = await api.get(`${this.CONTROLLER}/officers`).catch((error) => {
      throw error;
    });
    return res.data;
  }
}
