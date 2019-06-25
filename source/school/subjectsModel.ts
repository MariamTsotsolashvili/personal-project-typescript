import {forid} from "./id";
import {SubjectsSchema} from "./schema/subjectsSchema";

export class SubjectsModel {
    public title: string;
    public lessons: number;
    public description: string;
    public id: string;
    constructor(subject: SubjectsSchema) {

        this.id = forid();

        subjects.set(this.id, subject);

    }

    public async iddefinier() {
        return this.id;
    }

}