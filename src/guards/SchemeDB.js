export const SchemeDB = {
    id: '',
    EnteryData: {
        EntryMaterial: '',
        EntryTime: '',
        TypeDisease: '',
        CouncilCode: '',
        Condition: ''
    },
    PersonalData: {
        Name: '',
        Address: '',
        ID: '',
        Gender: '',
        Work: '',
        Age: '',
        Religion: '',
        SocialStatus: '',
        Nationnality: ''
    },
    AdmissionApplicant: {
        Name: '',
        Address: '',
        ID: '',
        Work: '',
        Kinship: '',
        Nationnality: '',
        PhoneNumber: '',
        ApprovalSession: ''
    },
    ExitData: {
        ExitTime: '',
        ReasonExit: ''
    },
    FinancialData: {
        NumberDays: 0,
        NumberSession: 0,
        AmountPaid: 0,
        AmountOwed: 0
    },
    PaymentsDetails: [
        {
            PaymentDate: '',
            AmountPaid: ''
        },
    ],
    SessionDetails: [
        {
            SessionDate: '',
            NumberSession: ''
        },
    ]
}