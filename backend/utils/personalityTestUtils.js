class personalityTest{

    constructor(alltests, answers) {
        this.alltests = alltests;
        this.answers = answers;
        this.results = {};
    }



    getQuestion(question_id) {
        this.alltests.tests.forEach((test) => {
            test.questions.forEach((question) => {
                if (question._id == question_id) {
                    return question;
                }
            });
        }
    }
}