import { subjects } from "./SubjectsModel";

export class LMSModel {
    public subjects: any
    constructor() {
        this.subjects = new Set();
    }

    public async add(id: any) {
        this.subjects.add(id);
    }

    public async remove(id: string) {
        this.subjects.delete(id);
    }

    public async verify(id: string) {
        return this.subjects.has(id);
    }

    public async read(id: string) {
        return subjects.get(id);
    }

    public async readAll() {
        return this.subjects.values().map((subjectId: any) => ({ subjectId }));
    }

}
