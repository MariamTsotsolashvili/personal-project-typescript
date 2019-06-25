import {
    GradesbooksModel,
    GroupsModel,
    LMSModel,
    pupilsModel,
    SubjectsModel,
    TeachersModel,

} from "./school/index";

const teacherSchema = {
    dateOfBirth: "11-04-1962",
    description: "desc",
    emails: [{ email: "mari.1@gmail.com", primary: true }],
    image: "IMage",
    name: { first: "Mariam", last: "Tsotso"},
    phones: [{ phone: "5999999", primary: false }],
    sex: "female", subjects: [{ subject: "History" }],
};

const pupilSchema = {
    dateOfBirth: "11-04-2000",
    description: "ript",
    image: "imageeee",
    name: { first: "Mari", last: "ts" },
    phones: [{ phone: "777588777", primary: false }],
    sex: "female",
};

const pupilSchemaSecond = { description: "ion", name: { first: "mariko", last: "ariko" },
    phones: [{ phone: "599663322", primary: false}, { phone: "599557558", primary: true}],
    sex: "female",
};
(async () => {
    const history = new SubjectsModel({
        description: "description",
        lessons: 24,
        title: "History",
    });

    const lms = new LMSModel();
    await lms.add(history);

    const teacher = new TeachersModel();
    const teacherID = await teacher.add(teacherSchema);

    const pupil = new pupilsModel();
    const pupilId = await pupil.add(pupilSchema);
    await pupil.update(pupilId, pupilSchemaSecond);

    const group = new GroupsModel(pupil);
    const groupID = await group.add(236);
    // await group.addPupil(groupID, (pupilId:String);
    await group.readAll();

    const level = 1;
    const grade = await new GradesbooksModel(group, teacher, lms);
    const gradebook = await grade.add(level, groupID);

    const record = ({
        lesson: 3,
        mark: 7,
        pupilId: (pupilId),
        subjectId: history,
        teacherId: teacherID,
    });

    await grade.addRecord(gradebook, record);

    const stud = await grade.read(gradebook, pupilId);
    const result = await grade.readAll(gradebook);
    console.log(stud);
    console.log(result);
})();
