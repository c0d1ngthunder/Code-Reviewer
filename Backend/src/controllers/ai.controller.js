const aiservice = require("../services/ai.service")

module.exports.getReview = async (req,res)=>{
    const code = req.body.code;

    if (!code){
        return res.status(400).send("code is not given")
    }

    const response = await aiservice.generateContent(code)
    res.send(response)
}