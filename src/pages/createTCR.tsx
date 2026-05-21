import React, { useState } from 'react'
import { Flex, Steps } from 'antd';
import ReviewTCR from '../components/reviewTCR';
import OfficerDetailsForm from '../components/officerDetailsForm';
import CaseDetailsForm from '../components/caseDetailsForm';

// eslint-disable-next-line react-refresh/only-export-components
export enum TcrStep {
    TCR_DETAILS = 'TCR_DETAILS',
    OFFICER_DETAILS = 'OFFICER_DETAILS',
    REVIEW = 'REVIEW'
}

const CreateTCR = () => {

    const [step, setStep] = useState<TcrStep>(TcrStep.TCR_DETAILS);

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

    return (
        <>
            <Flex justify='center'>
                <div style={{ minWidth: 1000 }}>
                    <Steps items={items} type='dot' current={getCurrentStep()} />
                </div>
            </Flex>
            {step === TcrStep.TCR_DETAILS && <CaseDetailsForm setStep={setStep} />}
            {step === TcrStep.OFFICER_DETAILS && <OfficerDetailsForm setStep={setStep} />}
            {step === TcrStep.REVIEW && <ReviewTCR />}
        </>
    )
}

export default CreateTCR;