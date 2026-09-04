import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Alert, Button, Card, Col, DatePicker, Descriptions, Flex, Form, message, Row, Table } from "antd"
import { Document, Page, pdf, StyleSheet, Text, View } from "@react-pdf/renderer"
import { useState } from "react"
import dayjs from "dayjs"
import { ReportService, type AllTcrsReport, type OfficerHandlingTypeSummaryStation, type TotalTcrSummaryReport } from "../services/report.service"

const styles = StyleSheet.create({
    page: { padding: 32, fontSize: 10, fontFamily: "Helvetica", color: "#1f2937" },
    title: { fontSize: 18, fontFamily: "Helvetica-Bold", marginBottom: 8 },
    detail: { marginBottom: 4 },
    separator: { borderBottomWidth: 1, borderBottomColor: "#94a3b8", marginBottom: 8 },
    stationSection: { marginTop: 16 },
    stationRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
    station: { fontSize: 12, fontFamily: "Helvetica-Bold" },
    stationTotal: { fontSize: 10, fontFamily: "Helvetica-Bold" },
    table: { borderWidth: 1, borderColor: "#cbd5e1" },
    header: { flexDirection: "row", backgroundColor: "#e2e8f0", fontFamily: "Helvetica-Bold" },
    row: { flexDirection: "row", borderTopWidth: 1, borderTopColor: "#cbd5e1" },
    officer: { width: "28%", padding: 7 },
    tcr: { width: "20%", padding: 7, borderLeftWidth: 1, borderLeftColor: "#cbd5e1" },
    roles: { width: "30%", padding: 7, borderLeftWidth: 1, borderLeftColor: "#cbd5e1" },
    rewards: { width: "22%", padding: 7, borderLeftWidth: 1, borderLeftColor: "#cbd5e1", textAlign: "right" },
    roleLine: { marginBottom: 3 },
    noResults: { marginTop: 24, textAlign: "center" },
    summaryLabel: { width: "65%", padding: 8 },
    summaryValue: { width: "35%", padding: 8, borderLeftWidth: 1, borderLeftColor: "#cbd5e1", textAlign: "right" },
    summaryTotalLabel: { width: "65%", padding: 8, fontFamily: "Helvetica-Bold" },
    summaryTotalValue: { width: "35%", padding: 8, borderLeftWidth: 1, borderLeftColor: "#cbd5e1", textAlign: "right", fontFamily: "Helvetica-Bold" },
    indexColumn: { width: "8%", padding: 7 },
    branchColumn: { width: "32%", padding: 7, borderLeftWidth: 1, borderLeftColor: "#cbd5e1" },
    tcrNumberColumn: { width: "20%", padding: 7, borderLeftWidth: 1, borderLeftColor: "#cbd5e1" },
    createdDateColumn: { width: "20%", padding: 7, borderLeftWidth: 1, borderLeftColor: "#cbd5e1" },
    amountColumn: { width: "20%", padding: 7, borderLeftWidth: 1, borderLeftColor: "#cbd5e1", textAlign: "right" },
});

const formatCurrency = (value: number) => Number(value).toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const OfficerHandlingTypeSummaryPdf = ({ selectedDateRange, stations }: { selectedDateRange: string; stations: OfficerHandlingTypeSummaryStation[] }) => (
    <Document title="Officer Handling Type Summary Report">
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Officer Handling Type Summary Report</Text>
            <Text style={styles.detail}>Selected date range: {selectedDateRange}</Text>
            <View style={styles.separator} />

            {stations.length === 0
                ? <Text style={styles.noResults}>No officer reward allocations were found for the selected date range.</Text>
                : stations.map((station) => (
                    <View key={station.stationName} style={styles.stationSection}>
                        <View style={styles.stationRow}>
                            <Text style={styles.station}>{station.stationName}</Text>
                            <Text style={styles.stationTotal}>Total rewards: LKR {Number(station.totalReward).toLocaleString("en-LK", { minimumFractionDigits: 2 })}</Text>
                        </View>
                        <View style={styles.table}>
                            <View style={styles.header}>
                                <Text style={styles.officer}>Officer name</Text>
                                <Text style={styles.tcr}>TCR number</Text>
                                <Text style={styles.roles}>Role(s)</Text>
                                <Text style={styles.rewards}>Reward(s) (LKR)</Text>
                            </View>
                            {station.officers.map((officer) => (
                                <View style={styles.row} key={`${officer.officerName}-${officer.tcrNumber}`}>
                                    <Text style={styles.officer}>{officer.officerName}</Text>
                                    <Text style={styles.tcr}>{officer.tcrNumber}</Text>
                                    <View style={styles.roles}>
                                        {officer.roles.map((role) => <Text key={role.role} style={styles.roleLine}>{role.role}</Text>)}
                                    </View>
                                    <View style={styles.rewards}>
                                        {officer.roles.map((role) => <Text key={role.role} style={styles.roleLine}>{Number(role.reward).toLocaleString("en-LK", { minimumFractionDigits: 2 })}</Text>)}
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
        </Page>
    </Document>
);

const TotalTcrSummaryPdf = ({ selectedDateRange, report }: { selectedDateRange: string; report: TotalTcrSummaryReport }) => {
    const rows = [
        ["Number of TCRs", String(report.numberOfTcr)],
        ["Total TCR value", `LKR ${formatCurrency(report.totalTcrValue)}`],
        ["Special funds", `LKR ${formatCurrency(report.specialFunds)}`],
        ["Consolidated funds", `LKR ${formatCurrency(report.consolidatedFunds)}`],
        ["Detection funds", `LKR ${formatCurrency(report.detectionFunds)}`],
        ["Information funds", `LKR ${formatCurrency(report.informationFunds)}`],
        ["Prosecuting funds", `LKR ${formatCurrency(report.prosecutingFunds)}`],
        ["Participation officer funds", `LKR ${formatCurrency(report.participationOfficerFunds)}`],
        ["Non-participation officer funds", `LKR ${formatCurrency(report.nonParticipationOfficerFunds)}`],
    ];
    const isBalanced = Math.abs(report.difference) < 0.01;

    return (
        <Document title="Total TCR Summary - Island Wide">
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>Total TCR Summary (Island Wide)</Text>
                <Text style={styles.detail}>Selected date range: {selectedDateRange}</Text>
                <Text style={styles.detail}>Includes approved TCRs only</Text>
                <View style={styles.separator} />
                <View style={styles.table}>
                    {rows.map(([label, value], index) => (
                        <View style={index === 0 ? styles.header : styles.row} key={label}>
                            <Text style={styles.summaryLabel}>{label}</Text>
                            <Text style={styles.summaryValue}>{value}</Text>
                        </View>
                    ))}
                    <View style={styles.row}>
                        <Text style={styles.summaryTotalLabel}>Total of all funds</Text>
                        <Text style={styles.summaryTotalValue}>LKR {formatCurrency(report.totalFunds)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.summaryTotalLabel}>Difference from total TCR value</Text>
                        <Text style={styles.summaryTotalValue}>LKR {formatCurrency(report.difference)}</Text>
                    </View>
                </View>
                <Text style={{ marginTop: 12, color: isBalanced ? "#166534" : "#b91c1c" }}>
                    {isBalanced ? "Reconciled: total funds equal the total TCR value." : "Not reconciled: the fund total differs from the total TCR value."}
                </Text>
            </Page>
        </Document>
    );
};

const AllTcrsPdf = ({ selectedDateRange, report }: { selectedDateRange: string; report: AllTcrsReport }) => (
    <Document title="List of All TCRs - Island Wide">
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>List of All TCRs (Island Wide)</Text>
            <Text style={styles.detail}>Created date range: {selectedDateRange}</Text>
            <View style={styles.separator} />
            {report.tcrs.length === 0
                ? <Text style={styles.noResults}>No TCRs were created within the selected date range.</Text>
                : <View style={styles.table}>
                    <View style={styles.header} fixed>
                        <Text style={styles.indexColumn}>No.</Text>
                        <Text style={styles.branchColumn}>Branch</Text>
                        <Text style={styles.tcrNumberColumn}>TCR No.</Text>
                        <Text style={styles.createdDateColumn}>Created Date</Text>
                        <Text style={styles.amountColumn}>Amount (LKR)</Text>
                    </View>
                    {report.tcrs.map((tcr) => (
                        <View style={styles.row} key={tcr.index} wrap={false}>
                            <Text style={styles.indexColumn}>{tcr.index}</Text>
                            <Text style={styles.branchColumn}>{tcr.branch}</Text>
                            <Text style={styles.tcrNumberColumn}>{tcr.tcrNumber}</Text>
                            <Text style={styles.createdDateColumn}>{dayjs(tcr.createdDate).format("DD MMM YYYY")}</Text>
                            <Text style={styles.amountColumn}>{formatCurrency(tcr.amount)}</Text>
                        </View>
                    ))}
                </View>}
        </Page>
    </Document>
);

const Reports = () => {
    const [selectedDateRange, setSelectedDateRange] = useState<string | null>(null);
    const [reportDateRange, setReportDateRange] = useState<{ startDate: string; endDate: string } | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [totalSummaryDateRange, setTotalSummaryDateRange] = useState<{ startDate: string; endDate: string } | null>(null);
    const [totalSummarySelectedDates, setTotalSummarySelectedDates] = useState<string | null>(null);
    const [totalTcrSummary, setTotalTcrSummary] = useState<TotalTcrSummaryReport | null>(null);
    const [isLoadingTotalSummary, setIsLoadingTotalSummary] = useState(false);
    const [isDownloadingTotalSummary, setIsDownloadingTotalSummary] = useState(false);
    const [allTcrsDateRange, setAllTcrsDateRange] = useState<{ startDate: string; endDate: string } | null>(null);
    const [allTcrsSelectedDates, setAllTcrsSelectedDates] = useState<string | null>(null);
    const [allTcrsReport, setAllTcrsReport] = useState<AllTcrsReport | null>(null);
    const [isLoadingAllTcrs, setIsLoadingAllTcrs] = useState(false);
    const [isDownloadingAllTcrs, setIsDownloadingAllTcrs] = useState(false);
    const reportService = new ReportService();

    const downloadOfficerHandlingTypeSummary = async () => {
        if (!reportDateRange) {
            message.error("Please select a start date and end date before downloading the report.");
            return;
        }

        setIsGenerating(true);
        try {
            const report = await reportService.getOfficerHandlingTypeSummary(reportDateRange);
            const blob = await pdf(
                <OfficerHandlingTypeSummaryPdf
                    selectedDateRange={selectedDateRange ?? ""}
                    stations={report.stations}
                />,
            ).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "officer-handling-type-summary-report.pdf";
            link.click();
            URL.revokeObjectURL(url);
        } catch {
            message.error("Unable to generate the report. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    }

    const viewTotalTcrSummary = async () => {
        if (!totalSummaryDateRange) {
            message.error("Please select a start date and end date before viewing the report.");
            return;
        }

        setIsLoadingTotalSummary(true);
        try {
            setTotalTcrSummary(await reportService.getTotalTcrSummary(totalSummaryDateRange));
        } catch {
            message.error("Unable to load the total TCR summary. Please try again.");
        } finally {
            setIsLoadingTotalSummary(false);
        }
    }

    const downloadTotalTcrSummary = async () => {
        if (!totalSummaryDateRange) {
            message.error("Please select a start date and end date before downloading the report.");
            return;
        }

        setIsDownloadingTotalSummary(true);
        try {
            const report = await reportService.getTotalTcrSummary(totalSummaryDateRange);
            setTotalTcrSummary(report);
            const blob = await pdf(
                <TotalTcrSummaryPdf
                    selectedDateRange={totalSummarySelectedDates ?? ""}
                    report={report}
                />,
            ).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "total-tcr-summary-island-wide.pdf";
            link.click();
            URL.revokeObjectURL(url);
        } catch {
            message.error("Unable to generate the total TCR summary. Please try again.");
        } finally {
            setIsDownloadingTotalSummary(false);
        }
    }

    const viewAllTcrsReport = async () => {
        if (!allTcrsDateRange) {
            message.error("Please select a start date and end date before viewing the report.");
            return;
        }

        setIsLoadingAllTcrs(true);
        try {
            setAllTcrsReport(await reportService.getAllTcrsReport(allTcrsDateRange));
        } catch {
            message.error("Unable to load the TCR list. Please try again.");
        } finally {
            setIsLoadingAllTcrs(false);
        }
    }

    const downloadAllTcrsReport = async () => {
        if (!allTcrsDateRange) {
            message.error("Please select a start date and end date before downloading the report.");
            return;
        }

        setIsDownloadingAllTcrs(true);
        try {
            const report = await reportService.getAllTcrsReport(allTcrsDateRange);
            setAllTcrsReport(report);
            const blob = await pdf(
                <AllTcrsPdf selectedDateRange={allTcrsSelectedDates ?? ""} report={report} />,
            ).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "list-of-all-tcrs-island-wide.pdf";
            link.click();
            URL.revokeObjectURL(url);
        } catch {
            message.error("Unable to generate the TCR list. Please try again.");
        } finally {
            setIsDownloadingAllTcrs(false);
        }
    }

    return (
        <>
            <Row gutter={[10, 10]}>
                <Col span={8}>
                    <Card size="small" title={<div style={{ textAlign: "center" }}>Officer Handling Type Summary Report</div>}>
                        <Form layout="vertical">
                            <Form.Item label="Select Date Range">
                                <DatePicker.RangePicker
                                    style={{ width: "100%" }}
                                    onChange={(dates) => {
                                        if (!dates?.[0] || !dates?.[1]) {
                                            setSelectedDateRange(null);
                                            setReportDateRange(null);
                                            return;
                                        }

                                        setSelectedDateRange(`${dayjs(dates[0]).format("DD MMM YYYY")} - ${dayjs(dates[1]).format("DD MMM YYYY")}`);
                                        setReportDateRange({
                                            startDate: dayjs(dates[0]).format("YYYY-MM-DD"),
                                            endDate: dayjs(dates[1]).format("YYYY-MM-DD"),
                                        });
                                    }}
                                />
                            </Form.Item>
                            <Flex justify="flex-end">
                                <Button loading={isGenerating} onClick={downloadOfficerHandlingTypeSummary} type="primary">
                                    Download <FontAwesomeIcon icon={faDownload} />
                                </Button>
                            </Flex>
                        </Form>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card size="small" title={<div style={{ textAlign: "center" }}>Total TCR Summary (Island wide)</div>}>
                        <Form layout="vertical">
                            <Form.Item label="Select Date Range">
                                <DatePicker.RangePicker
                                    style={{ width: "100%" }}
                                    onChange={(dates) => {
                                        setTotalTcrSummary(null);
                                        if (!dates?.[0] || !dates?.[1]) {
                                            setTotalSummaryDateRange(null);
                                            setTotalSummarySelectedDates(null);
                                            return;
                                        }

                                        setTotalSummarySelectedDates(`${dayjs(dates[0]).format("DD MMM YYYY")} - ${dayjs(dates[1]).format("DD MMM YYYY")}`);
                                        setTotalSummaryDateRange({
                                            startDate: dayjs(dates[0]).format("YYYY-MM-DD"),
                                            endDate: dayjs(dates[1]).format("YYYY-MM-DD"),
                                        });
                                    }}
                                />
                            </Form.Item>
                            <Flex gap={8} justify="flex-end">
                                <Button loading={isLoadingTotalSummary} onClick={viewTotalTcrSummary}>View Summary</Button>
                                <Button loading={isDownloadingTotalSummary} onClick={downloadTotalTcrSummary} type="primary">Download <FontAwesomeIcon icon={faDownload} /></Button>
                            </Flex>
                        </Form>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card size="small" title={<div style={{ textAlign: "center" }}>List of All TCRs (Island Wide)</div>}>
                        <Form layout="vertical">
                            <Form.Item label="Select Created Date Range">
                                <DatePicker.RangePicker
                                    style={{ width: "100%" }}
                                    onChange={(dates) => {
                                        setAllTcrsReport(null);
                                        if (!dates?.[0] || !dates?.[1]) {
                                            setAllTcrsDateRange(null);
                                            setAllTcrsSelectedDates(null);
                                            return;
                                        }

                                        setAllTcrsSelectedDates(`${dayjs(dates[0]).format("DD MMM YYYY")} - ${dayjs(dates[1]).format("DD MMM YYYY")}`);
                                        setAllTcrsDateRange({
                                            startDate: dayjs(dates[0]).format("YYYY-MM-DD"),
                                            endDate: dayjs(dates[1]).format("YYYY-MM-DD"),
                                        });
                                    }}
                                />
                            </Form.Item>
                            <Flex gap={8} justify="flex-end">
                                <Button loading={isLoadingAllTcrs} onClick={viewAllTcrsReport}>View Report</Button>
                                <Button loading={isDownloadingAllTcrs} onClick={downloadAllTcrsReport} type="primary">Download <FontAwesomeIcon icon={faDownload} /></Button>
                            </Flex>
                        </Form>
                    </Card>
                </Col>
            </Row>
            {totalTcrSummary && (
                <Card
                    style={{ marginTop: 16 }}
                    title="Total TCR Summary (Island Wide)"
                    extra={totalSummarySelectedDates}
                >
                    <Descriptions bordered column={2} size="small">
                        <Descriptions.Item label="Number of TCRs">{totalTcrSummary.numberOfTcr}</Descriptions.Item>
                        <Descriptions.Item label="Total TCR Value">LKR {formatCurrency(totalTcrSummary.totalTcrValue)}</Descriptions.Item>
                        <Descriptions.Item label="Special Funds">LKR {formatCurrency(totalTcrSummary.specialFunds)}</Descriptions.Item>
                        <Descriptions.Item label="Consolidated Funds">LKR {formatCurrency(totalTcrSummary.consolidatedFunds)}</Descriptions.Item>
                        <Descriptions.Item label="Detection Funds">LKR {formatCurrency(totalTcrSummary.detectionFunds)}</Descriptions.Item>
                        <Descriptions.Item label="Information Funds">LKR {formatCurrency(totalTcrSummary.informationFunds)}</Descriptions.Item>
                        <Descriptions.Item label="Prosecuting Funds">LKR {formatCurrency(totalTcrSummary.prosecutingFunds)}</Descriptions.Item>
                        <Descriptions.Item label="Participation Officer Funds">LKR {formatCurrency(totalTcrSummary.participationOfficerFunds)}</Descriptions.Item>
                        <Descriptions.Item label="Non-participation Officer Funds">LKR {formatCurrency(totalTcrSummary.nonParticipationOfficerFunds)}</Descriptions.Item>
                        <Descriptions.Item label="Total of All Funds">LKR {formatCurrency(totalTcrSummary.totalFunds)}</Descriptions.Item>
                    </Descriptions>
                    <Alert
                        style={{ marginTop: 16 }}
                        type={Math.abs(totalTcrSummary.difference) < 0.01 ? "success" : "error"}
                        showIcon
                        message={Math.abs(totalTcrSummary.difference) < 0.01
                            ? "Reconciled: total funds equal the total TCR value."
                            : `Not reconciled: difference is LKR ${formatCurrency(totalTcrSummary.difference)}.`}
                    />
                </Card>
            )}
            {allTcrsReport && (
                <Card
                    style={{ marginTop: 16 }}
                    title="List of All TCRs (Island Wide)"
                    extra={allTcrsSelectedDates}
                >
                    <Table
                        rowKey="index"
                        dataSource={allTcrsReport.tcrs}
                        pagination={{ pageSize: 10 }}
                        columns={[
                            { title: "Index No.", dataIndex: "index", key: "index", width: 100 },
                            { title: "Branch", dataIndex: "branch", key: "branch" },
                            { title: "TCR No.", dataIndex: "tcrNumber", key: "tcrNumber" },
                            {
                                title: "Created Date",
                                dataIndex: "createdDate",
                                key: "createdDate",
                                render: (value: string) => dayjs(value).format("DD MMM YYYY"),
                            },
                            {
                                title: "Amount (LKR)",
                                dataIndex: "amount",
                                key: "amount",
                                align: "right",
                                render: (value: number) => formatCurrency(value),
                            },
                        ]}
                    />
                </Card>
            )}
        </>
    )
}

export default Reports
