//Controller for adding a question (for admin)

//import general aptitude model
const general_aptitudes = require('../Models/generalSchema');
// const general_aptitude = require('../Models/generalSchema')

//logic for add question
exports.addQuestion = async(req,res)=>{
    console.log('Inside general controller');
    const {section_name,category,question,option_a,option_b,option_c,option_d,answer,explanation} = req.body;

    const question1 = {question,option_a,option_b,option_c,option_d,answer,explanation}

    try{
        // find the section and topic if they exist
        let generalAptitude = await general_aptitudes.findOne({"sections.section_name":section_name});

        if(generalAptitude){
             let section = generalAptitude.sections.find((sec)=>sec.section_name === section_name);

             let topic = section.topics.find((top)=>top.category === category);

             if(topic){
                const newQuestion = question1
                topic.questions.push(newQuestion);
             }
             else{
                const newTopic = {
                    category,
                    questions:[question1]
                };
                section.topics.push(newTopic);
             }
             await generalAptitude.save();
             res.status(200).json(generalAptitude);
        }
        else{
            const newSection = {
                section_name,
                topics:[
                    {
                        category,
                        questions:[question1]
                    }
                ]
            };
            generalAptitude = new general_aptitudes({
                sections:[newSection]
            });

            await generalAptitude.save();
            res.status(200).json(generalAptitude)
        }
    }catch(err){
        res.status(500).json(`Add question request failed due to ${err}`);
    }
}

//logic for getting arithmetic apt questions
exports.getGeneralQuestions = async(req,res)=>{

    const {sectionName,categoryName} = req.params;
    if(!sectionName || !categoryName){
        res.status(400).json('Section and Category required!')
    }

    try{
        const arithQuestions = await general_aptitudes.findOne({
            'sections.section_name':sectionName,
            'sections.topics.category':categoryName
        },{
            'sections.$':1
        });

        if(arithQuestions && arithQuestions.sections.length > 0){
            const section = arithQuestions.sections[0];
            const topic = section.topics.find(top=> top.category === categoryName);

            if(topic && topic.questions.length > 0){
                res.status(200).json(topic.questions);
            } else{
                res.status(404).json('No questions found for the specified category! ')
            }
        } else{
            res.status(404).json('No sections found!')
        }
    } catch(err){
        res.status(400).json(`Request failed due to ${err}`)
    }
};

//logic for editing a Question
exports.editQuestions = async(req,res)=>{
    const {section_name,category,question,option_a,option_b,option_c,option_d,answer,explanation} = req.body;
    const {id} = req.params;

    try {
        let general_aptitude = await general_aptitudes.findOne({"sections.section_name":section_name})

        if(general_aptitude){
            let section = general_aptitude.sections.find(sec => sec.section_name === section_name);

            if(section){
                let topic = section.topics.find(top => top.category === category)

                if(topic){
                    let existingQuestion = topic.questions.id(id);

                    if(existingQuestion){
                        existingQuestion.question = question;
                        existingQuestion.option_a = option_a;
                        existingQuestion.option_b = option_b;
                        existingQuestion.option_c = option_c;
                        existingQuestion.option_d = option_d;
                        existingQuestion.answer = answer;
                        existingQuestion.explanation = explanation;

                        //save the updated question
                        await general_aptitude.save();
                        res.status(200).json(existingQuestion);
                    } else {
                        res.status(404).json("Question not found!");
                    }
                } else {
                    res.status(404).json('Section not found!')
                }
            } else {
                res.status(404).json('General aptitude data not found!')
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

//logic for deleting arith apt questions
exports.deleteArithQuestions = async(req,res)=>{
    const {id} = req.params
    const {section_name,category} = req.body;
    try {
        let generalAptitude = await general_aptitudes.findOne({"sections.section_name":section_name})
        if(generalAptitude){
            let section = generalAptitude.sections.find(sec=>sec.section_name === section_name)
            if(section){
                let topic = section.topics.find(top=>top.category === category)
                if(topic){
                    const updatedQstn = topic.questions.filter(q=>q._id.toString() !== id)
                    topic.questions = updatedQstn
                    await generalAptitude.save()
                    res.status(200).json(updatedQstn)
                }else{
                    res.status(404).json('Topic not found!');  
                }
            }else{
                res.status(404).json('Section not found!');
                
            }
        } else{
            res.status(404).json('General not found!');
            
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

//logic for getting exam questions
exports.getGeneralExam = async(req, res) => {
    const {sectionName,categoryName} = req.params;
    if(!sectionName || !categoryName){
        res.status(400).json('Section and Category required!')
    }

    try{
        const arithQuestions = await general_aptitudes.findOne({
            'sections.section_name':sectionName,
            'sections.topics.category':categoryName
        },{
            'sections.$':1
        });

        if(arithQuestions && arithQuestions.sections.length > 0){
            const section = arithQuestions.sections[0];
            const topic = section.topics.find(top=> top.category === categoryName);

            if(topic && topic.questions.length > 0){
                res.status(200).json(topic.questions);
            } else{
                res.status(404).json('No questions found for the specified category! ')
            }
        } else{
            res.status(404).json('No sections found!')
        }
    } catch(err){
        res.status(400).json(`Request failed due to ${err}`)
    }
};

