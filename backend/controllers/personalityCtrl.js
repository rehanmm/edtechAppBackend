
const PersonalityTest = require('../models/personalityModel') 
const catchAsyncError = require('../error/catchAsyncError')
const errorHandler = require('../utils/errorHandler');
const { tsend, send } = require('../middleware/responseSender');



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
    // const test_answers = req.body;

    // const { answers } = test_answers;
   

    // const alltests = await PersonalityTest.findOne({}).lean();
  
    // answers.forEach(answer => {
    
    //     const {}
    
// });
    
    

    
    


//  const [testOne, testTwo, testThree,testFour] = req.body;
   


 })
createTest = catchAsyncError(async (req, res, next) => { 

    const test = await PersonalityTest.create(req.body);

    await test.save();

    res.status(200).json({
        success: true
    })
    


    

})


module.exports={startTest,endtTest,createTest}



   