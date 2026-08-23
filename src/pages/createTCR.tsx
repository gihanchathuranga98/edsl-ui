import React, { use, useContext, useEffect, useState } from 'react'
import { Flex, Steps } from 'antd';
import ReviewTCR from '../components/reviewTCR';
import OfficerDetailsForm from '../components/officerDetailsForm';
import CaseDetailsForm from '../components/caseDetailsForm';
import { StationService } from '../services/station.service';
import { UserService } from '../services/user.service';
import { FundService } from '../services/fund.service';
import { TcrService } from '../services/tcr.service';
import { AuthContext } from '../contexts/auth.context';
import { useParams } from 'react-router';
import dayjs from 'dayjs';

// eslint-disable-next-line react-refresh/only-export-components
export enum TcrStep {
    TCR_DETAILS = 'TCR_DETAILS',
    OFFICER_DETAILS = 'OFFICER_DETAILS',
    REVIEW = 'REVIEW'
}

interface TcrPayload {
    tcrNumber: string;
    stationId: string;
    date: Date;
    totalCaseAmount: number;
    detectingOfficers: string[];
    informant: string[];
    prosecutingOffiers: string[];
    detectionOthers: string[];
    others: string[];
}

const CreateTCR = () => {

    const [detectingOfficers, setDetectingOfficers] = useState<any[]>([{ isEditable: true }]);
    const [detectingOfficeFund, setDetectingOfficerFund] = useState<number>(0);
    const [informantFund, setInformantFund] = useState<number>(0);
    const [informantOfficers, setInformantOfficers] = useState<any[]>([{ isEditable: true }])
    const [prosecutingOfficerFund, setProsecutingOfficerFund] = useState<number>(0);
    const [prosecutingOfficers, setProsecutingOfficers] = useState<any[]>([{ isEditable: true }]);
    const [otherOfficers, setOtherOfficers] = useState([{ isEditable: true }]);
    const [otherOfficerFund, setOtherOfficerFund] = useState<number>(0);
    const [nonParticipationOfficers, setNonParticipationOfficers] = useState([{ isEditable: true }]);
    const [nonParticipantOfficerFund, setNonParticipantOfficerFund] = useState<number>(0);

    const [step, setStep] = useState<TcrStep>(TcrStep.TCR_DETAILS);
    const [caseDetails, setCaseDetails] = useState<any>();
    const [stations, setStations] = useState<any[]>([]);
    const [employees, setEmployees] = useState<any[]>([]);
    const [fundData, setFundData] = useState<any[]>([]);

    const { showAlert } = useContext(AuthContext);
    const { tcr } = useParams();

    // officer detail

    const stationService = new StationService();
    const userServie = new UserService();
    const fundService = new FundService();
    const tcrService = new TcrService();

    const items: any[] = [
        {
            title: 'Case Details',
        },
        {
            title: 'Officers Details',
        },
        {
            title: 'Review TCR',
        },
    ];

    const handleTcrCreate = () => {

        const payload = {
            trcNumber: caseDetails.caseNo,
            stationId: caseDetails.leadingStation,
            date: caseDetails.date,
            totalCaseAmount: caseDetails.totalCaseAmount,
            detectingOfficers: detectingOfficers.filter(officer => officer?.officerId).map(officer => officer.officerId),
            informant: informantOfficers.filter(officer => officer?.officerId).map(officer => officer?.officerId),
            prosecutingOffiers: prosecutingOfficers.filter(officer => officer?.officerId).map(officer => officer?.officerId),
            nonParticipationOfficers: nonParticipationOfficers.filter(officer => officer?.officerId).map(officer => officer?.officerId),
            participationOfficers: otherOfficers.filter(officer => officer?.officerId).map(officer => officer?.officerId)
        }

        if (tcr) {
            tcrService.updateTcr(payload, tcr)
                .then(data => {
                    showAlert.success('TCR has been created successfully');
                })
                .catch(error => {

                })
        } else {
            tcrService.createTcr(payload)
                .then(data => {
                    showAlert.success('TCR has been created successfully');
                })
                .catch(error => {

                })
        }

    }

    const getCurrentStep = () => {
        switch (step) {
            case TcrStep.TCR_DETAILS:
                return 0;
            case TcrStep.OFFICER_DETAILS:
                return 1;
            case TcrStep.REVIEW:
                return 2;
            default:
                return 0;
        }
    }

    const fetchStations = () => {
        stationService.getAllStations()
            .then(data => {
                setStations(data);
            })
    }

    const fetchAllEmployees = () => {
        userServie.fetchAllOfficers()
            .then(data => {
                setEmployees(data);
            })
    }

    const fetchAllFunds = () => {
        fundService.getAllFunds()
            .then(data => {
                setFundData(data);
            })
    }

    useEffect(() => {
        Promise.all([fetchStations(), fetchAllEmployees(), fetchAllFunds()])
        if (tcr) {
            tcrService.fetchTcrById(tcr)
                .then(data => {
                    setCaseDetails({
                        caseNo: data.tcrNo,
                        leadingStation: data.stationId,
                        date: dayjs(data.incidentDate),
                        totalCaseAmount: data.totalCaseAmount,
                    })
                    setDetectingOfficers([...data.detectingOfficers.map((officer: any) => { return { station: `${officer.stations[0]?.station?.code} - ${officer.stations[0]?.station?.name}`, officerId: officer.id, officerNumber: officer.code, officerName: officer.name, designation: officer?.designation?.designation, reward: data?.detectingOfficerFund / data.detectingOfficers.length, isEditable: false } }), { isEditable: true }]);
                    setInformantOfficers([...data.informant.map((officer: any) => { return { station: `${officer.stations[0]?.station?.code} - ${officer.stations[0]?.station?.name}`, officerId: officer.id, officerNumber: officer.code, officerName: officer.name, designation: officer?.designation?.designation, reward: data?.informantFund / data?.informant.length, isEditable: false } }), { isEditable: true }]);
                    setProsecutingOfficers([...data.prosecutingOfficers.map((officer: any) => { return { station: `${officer.stations[0]?.station?.code} - ${officer.stations[0]?.station?.name}`, officerId: officer.id, officerNumber: officer.code, officerName: officer.name, designation: officer?.designation?.designation, reward: data?.prosecutingOfficerFund / data?.prosecutingOfficers.length, isEditable: false } }), { isEditable: true }]);
                    setOtherOfficers([...data.participationOfficers.map((officer: any) => { return { station: `${officer.stations[0]?.station?.code} - ${officer.stations[0]?.station?.name}`, officerId: officer.id, officerNumber: officer.code, officerName: officer.name, designation: officer?.designation?.designation, reward: data?.participationOfficerFund / data?.participationOfficers.length, isEditable: false } }), { isEditable: true }]);
                    setNonParticipationOfficers([...data.others.map((officer: any) => { return { station: `${officer.stations[0]?.station?.code} - ${officer.stations[0]?.station?.name}`, officerId: officer.id, officerNumber: officer.code, officerName: officer.name, designation: officer?.designation?.designation, reward: data?.nonParticipationOfficerFund, fund: officer?.designation?.fundShare, isEditable: false } }), { isEditable: true }]);

                    setInformantFund(data.informantFund)
                    setProsecutingOfficerFund(data.prosecutingOfficerFund)
                    setOtherOfficerFund(data.participationOfficerFund)
                    setNonParticipantOfficerFund(data.nonParticipationOfficerFund)
                    setDetectingOfficerFund(data.detectingOfficerFund)

                })
        }
    }, [])

    const handleSetCaseDetails = (data) => {
        if (isNaN(data.totalCaseAmount)) {
            showAlert.error("Please enter a valid amount");
        }
        setCaseDetails(data);
        setStep(TcrStep.OFFICER_DETAILS);
    }

    return (
        <>
            <Flex justify='center'>
                <div style={{ minWidth: 1000 }}>
                    <Steps items={items} type='dot' current={getCurrentStep()} />
                </div>
            </Flex>
            {step === TcrStep.TCR_DETAILS && <CaseDetailsForm stations={stations} caseDetails={caseDetails} setCaseDetails={handleSetCaseDetails} />}
            {step === TcrStep.OFFICER_DETAILS && <OfficerDetailsForm
                detectingOfficers={detectingOfficers}
                setDetectingOfficers={setDetectingOfficers}
                detectingOfficeFund={detectingOfficeFund}
                setDetectingOfficerFund={setDetectingOfficerFund}
                informantFund={informantFund}
                setInformantFund={setInformantFund}
                informantOfficers={informantOfficers}
                setInformantOfficers={setInformantOfficers}
                prosecutingOfficerFund={prosecutingOfficerFund}
                setProsecutingOfficerFund={setProsecutingOfficerFund}
                prosecutingOfficers={prosecutingOfficers}
                setProsecutingOfficers={setProsecutingOfficers}
                otherOfficers={otherOfficers}
                setOtherOfficers={setOtherOfficers}
                otherOfficerFund={otherOfficerFund}
                setOtherOfficerFund={setOtherOfficerFund}
                nonParticipationOfficers={nonParticipationOfficers}
                setNonParticipationOfficers={setNonParticipationOfficers}
                nonParticipantOfficerFund={nonParticipantOfficerFund}
                setNonParticipantOfficerFund={setNonParticipantOfficerFund}
                totalCaseAmount={caseDetails.totalCaseAmount} officers={employees} fundShares={fundData} setStep={setStep} />}
            {step === TcrStep.REVIEW && <ReviewTCR caseDetails={caseDetails}
                detectingOfficers={detectingOfficers}
                detectingOfficeFund={detectingOfficeFund}
                informantFund={informantFund}
                informantOfficers={informantOfficers}
                prosecutingOfficerFund={prosecutingOfficerFund}
                prosecutingOfficers={prosecutingOfficers}
                otherOfficers={otherOfficers}
                otherOfficerFund={otherOfficerFund}
                nonParticipationOfficers={nonParticipationOfficers}
                nonParticipantOfficerFund={nonParticipantOfficerFund}
                totalCaseAmount={caseDetails.totalCaseAmount}
                officers={employees}
                fundShares={fundData}
                setStep={setStep}
                stations={stations}
                handleTcrCreate={handleTcrCreate}
            />}
        </>
    )
}

export default CreateTCR;