export interface TeachersSchema {
    name: {
        first: string,
        last: string,
    };
    image: string;
    dateOfBirth: Date;
    emails: [
        {
        email: string,
        primary: boolean,
        }
    ];
    phones: [
        {
        phone: string,
        primary: boolean,
        }
    ];
    sex: string;
    subjects: [
        {
        subject: string;
        }
    ];
    description: string;
}
