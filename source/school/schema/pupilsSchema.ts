export interface PupilsSchema {
    dateOfBirth: Date; // format date
    description: string;
    image: string;
    name: {
            first: string,
            last: string,
        };
    sex: string; // male OR female
}
