import {forid} from "./id";
import {PupilsSchema} from "./schema/pupilsSchema";

class PupilsModel {
    public pupils: any;
    public name: {
        first: string,
        last: string,
    };
    public image: string;
    public dateOfBirth: Date;
    public phones: [
        {
        phone: string,
        primary: boolean,
        }
    ];
    public sex: string;
    public description: string;

    constructor() {
        this.pupils = new Map();
    }

    public async add(pupil: PupilsSchema) {
        const id = forid();
        this.pupils.set(id, pupil);
        return id;
    }

    public async read(id: string) {
        return { id, ...this.pupils.get(id) };
    }

    public async update(id: string, pupil: PupilsSchema) {
        return this.pupils.set(id, pupil);
    }

    public async remove(id: string) {
        this.pupils.delete(id);
    }
}

export {PupilsModel};
