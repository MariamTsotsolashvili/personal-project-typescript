import {forid} from "./id";
class GroupsModel {
    public pupil: object;
    public groups: any;
    public group: any;
    constructor(pupil: object) {
        this.groups = new Map();
        this.pupil = pupil;
    }

    public newerror(id: string) {
        if (!this.groups.has(id)) {
            throw new Error ("There is no user with this id !");
        }
    }

    public iderror() {
        throw new Error("There is no such id !");
    }

    public async add(room: number) {
        const id = forid();
        this.groups.set(id, { room, students: new Set() });

        return id;
    }

    public async read(id: string) {
        this.newerror(id);

        return { id, ...this.groups.get(id) };
    }

    public async remove(id: string) {
        this.newerror(id);

        this.groups.delete(id);
    }

    public async update(id: string, room: number) {
        this.newerror(id);

        this.groups.set(id, room);
    }

    public async readAll() {
        const result: any = [];
        this.groups.forEach(({...group}: any, id: string) => {
            group.students = Array.from(group.students);
            result.push({ id, ...group });
        });

        return result;
    }

    public async addPupil(id: string, pupli: object) {
        if (this.groups.has(id)) {
            this.groups.get(id).students.add(pupli);
        } else {
            this.iderror();
        }
    }

    public async removePupil(id: string, pupli: object){
        if (this.groups.has(id)) {
            this.groups.get(id).students.delete(pupli);
        } else {
            this.iderror();
        }
    }
}

export { GroupsModel };
