
const PersonalityTest = require('../models/personalityModel') 
const User= require('../models/userModel') 
const catchAsyncError = require('../error/catchAsyncError')
const errorHandler = require('../utils/errorHandler');
const { tsend, send } = require('../middleware/responseSender');
const personality = require('../config/personality.json')

// console.log(personality.ENFJ)

getPersonality =  catchAsyncError(async (req, res, next) => {
    const {user_id}=req.body
    const user = await User.findOne({ user_id }).select('is_personality_test_taken   personality').lean();
    if (!user) {
        return next(new errorHandler('list not found', 200))
    }
    if (user.is_personality_test_taken) {
        
        return res.status(200).json(
            {
                success: true,
                data: {
                    is_test_attempted:true,
                    personality: user.personality
                }
            }
        )
    } else {
        return res.status(200).json(
            {
                success: true,
                data: {
                    is_test_attempted:false
                }
            }
        )
    }
 })

startTest = catchAsyncError(async (req, res, next) => {

    const tests = await PersonalityTest.findOne({}).lean();
    tsend(tests, '', res)

 })
endtTest = catchAsyncError(async (req, res, next) => {
    /**
     * object creaate krna hai
     * json se info uthna hai jaisa head ka result aaaye
     * head create krna hai jo aaayega weight sum krne se aayega
     * 
     * 
     */
    const {user_id}=req.body
    const test_answers = req.body;

    const { tests } = test_answers;
   

    const alltests = await PersonalityTest.findOne({}).lean();

    // console.log(alltests)
    const param = {};
    let scores = [];
    let head = '';
    let sum_weight = 0;
    tests.forEach(test_answer => {
      const score={};
        let M = 0, P = 0, Q = 0, T = 0;;
        const test_id = test_answer.test_id;
        const test = alltests.tests.find(test => test._id == test_id);
        param.T = test.questions.length;
        test.questions.forEach(question => {
            const question_id = question._id;
            const answer = test_answer.answers.find(answer => answer.question_id == question_id);
          
            const option_id = answer.option_id;
            const answer_weight = question.options.find(option => option._id == option_id).weight;
            question.weight = answer_weight;
            sum_weight += answer_weight;
            M += answer_weight;
        });
        param.test_id=test_id;
        param.M = M;
        param.R = (M / param.T);
        param.P = ((1 + param.R) / 2) * 100
        param.Q = ((1 - param.R) / 2) * 100
        param.S = test.positive.abb;

        param.positive = test.positive;
        param.negative = test.negative;
        if (param.R < 0) {
            param.S=  param.negative.abb
        

        }
        head += param.S;
        
        score.test_id = test_id;
        score.title = test.title;
       score.positive_score=param.P
       score.positive_title= test.positive.title
       score.negative_score= param.Q
       score.negative_title= test.negative.title
  
        scores.push(score);
    //   console.log(param)
        
    });
    
    // console.log(head)
    const Code= personality[head]
    const result = { ...Code,head, scores }

    
    await User.findOneAndUpdate(user_id, { personality: result ,is_personality_test_taken: true});
   
    
    return res.json({
        success: true,
        data: result
      
  });  
    

    
    


//  const [testOne, testTwo, testThree,testFour] = req.body;
   


 })
createTest = catchAsyncError(async (req, res, next) => { 

    const test = await PersonalityTest.create(req.body);

    await test.save();

    res.status(200).json({
        success: true
    })
    


    

})


module.exports={startTest,endtTest,createTest, getPersonality}



   