import { Document, pdf, Page, Text } from "@react-pdf/renderer";
import TestingReport from "../reports/testing.report";

export const handlePrint = async () => {
  const blob = await pdf(<TestingReport/>).toBlob();

  const url = URL.createObjectURL(blob);

  const printWindow = window.open(url);

  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print();
    };
  }
};