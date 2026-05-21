import type { FundTypesEnum } from "../common/constants/fundTypes.const";
import { api } from "./api.interceptor";

export class FundService {
  private readonly CONTROLLER = "fund";

  async getAllFunds() {
    const res = await api.get(`${this.CONTROLLER}/all`).catch((error) => {
      throw error;
    });

    return res.data;
  }

  async createFund(payload: { fundType: FundTypesEnum; fundShare: number }) {
    const res = await api
      .post(`${this.CONTROLLER}/create`, payload)
      .catch((error) => {
        throw error;
      });

    return res.data;
  }
}
