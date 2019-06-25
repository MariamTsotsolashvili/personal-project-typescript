import {forid} from "./id";
import {RecordSchema} from "./schema/recordSchema";

class GradesbooksModel implements RecordSchema {
    public gradeBook: any;
    public groups: any;
    public teachers: any;
    public LMS: any;
    public pupilId: string;
    public teacherId: string;
    public subjectId: object;
    public lesson: number;
    public mark: number;

    constructor(groups: any, teachers: any, LMS: any) {
        this.gradeBook = new Map();
        this.groups = groups;
        this.teachers = teachers;
        this.LMS = LMS;
    }

    public async add(level: any, groupID: string) {
        if (!level || typeof level !== "number") {
            throw new Error("Level should be a Number!");
        }
        const id = forid();
        this.gradeBook.set( id, { level, groupID, records: [] });

        return id;
    }

    public async clear() {
        return this.gradeBook.clear();
    }

    public async addRecord(id: string, record: any) {
        this.gradeBook.get(id).records.push( record );
    }

    public async read(id: string, pupil: any) {
        const records = this.gradeBook.get(id).records.filter((record:any) => record.pupilId === pupil);
        const { name: { first, last } } = await this.groups.pupil.read(records[0].pupilId);
        const result = { name: `${first} ${last}`, records};

        for (const { teacherId, subjectId, lesson, mark } of records) {
            if (!teacherId) {
                break;
            }
            const { name: {first, last} } = await this.teachers.read(teacherId);
            const { title: subject } = await this.LMS.read(subjectId.id);
            result.records.push({ teacher: `${first} ${last}`, subject, lesson, mark });
        }

        return result;
    }

    public async readAll(id: string) {
        const records = this.gradeBook.get(id).records;
        const result = new Map();

        for (const { pupilId, teacherId, subjectId, lesson, mark } of records) {

            if (!result.has(pupilId)) {
                const { name: { first, last } } = await this.groups.pupil.read(records[0].pupilId);
                result.set(pupilId, { name: `${first} ${last}`, records: [] });
            }

            const { name: { first, last } } = await this.teachers.read(teacherId);
            const { title: subject } = await this.LMS.read(subjectId.id);
            result.get(pupilId).records.push({ teacher: `${first} ${last}`, subject, lesson, mark });

        }

        return Array.from(result.values());
    }

}

export { GradesbooksModel };
