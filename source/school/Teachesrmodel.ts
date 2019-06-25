// import {Validator} from  './validator'
import {forid} from "./id";
import {TeachersSchema} from "./schema/teacherSchema";

class TeachersModel implements TeachersSchema {
    public teachers: TeachersSchema;
    public name: {
        first: string,
        last: string,
    };
    public image: string;
    public dateOfBirth: Date;
    public emails: [
        {
        email: string,
        primary: boolean,
        }
    ];
    public phones: [
        {
        phone: string,
        primary: boolean,
        }
    ];
    public sex: string;
    public subjects: [
        {
        subject: string,
        }
    ];
    public description: string;

    constructor() {
        this.teachers = new Map();
    }
    public async  add(teacher: TeachersSchema) {
        const id = forid();
        this.teachers.set(id, teacher);
        return id;
    }

    public async read(id: string) {
        return { id, ...this.teachers.get(id) };
    }

    public async update(id: string, teacher: TeachersSchema) {
        return this.teachers.set(id, teacher);
    }

    public async remove(id: string) {
        this.teachers.delete(id);
    }

}

export {TeachersModel}
