import { api } from "./api.interceptor";

export type OfficerHandlingTypeSummaryReportRequest = {
  startDate: string;
  endDate: string;
};

export type OfficerHandlingTypeSummaryStation = {
  stationId: string;
  stationName: string;
  stationCode: string | null;
  totalReward: number;
  officers: Array<{
    officerId: string;
    officerName: string;
    tcrNumber: string;
    roles: Array<{ role: string; reward: number }>;
  }>;
};

export type OfficerHandlingTypeSummaryReport = {
  startDate: string;
  endDate: string;
  stations: OfficerHandlingTypeSummaryStation[];
};

export type TotalTcrSummaryReport = {
  startDate: string;
  endDate: string;
  numberOfTcr: number;
  totalTcrValue: number;
  specialFunds: number;
  consolidatedFunds: number;
  detectionFunds: number;
  informationFunds: number;
  prosecutingFunds: number;
  participationOfficerFunds: number;
  nonParticipationOfficerFunds: number;
  totalFunds: number;
  difference: number;
};

export type AllTcrsReport = {
  startDate: string;
  endDate: string;
  tcrs: Array<{
    index: number;
    branch: string;
    tcrNumber: string;
    createdDate: string;
    amount: number;
  }>;
};

export class ReportService {
  private readonly CONTROLLER = "report";

  async getOfficerHandlingTypeSummary(
    payload: OfficerHandlingTypeSummaryReportRequest,
  ): Promise<OfficerHandlingTypeSummaryReport> {
    const response = await api.post<OfficerHandlingTypeSummaryReport>(
      `${this.CONTROLLER}/officer-handling-type-summary`,
      payload,
    );

    return response.data;
  }

  async getTotalTcrSummary(
    payload: OfficerHandlingTypeSummaryReportRequest,
  ): Promise<TotalTcrSummaryReport> {
    const response = await api.post<TotalTcrSummaryReport>(
      `${this.CONTROLLER}/total-tcr-summary`,
      payload,
    );

    return response.data;
  }

  async getAllTcrsReport(
    payload: OfficerHandlingTypeSummaryReportRequest,
  ): Promise<AllTcrsReport> {
    const response = await api.post<AllTcrsReport>(
      `${this.CONTROLLER}/all-tcrs`,
      payload,
    );

    return response.data;
  }
}
