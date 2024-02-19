const { getBestCommentsService } = require("../../services/stats/getBestComments.service");

const getBestCommentsController = async (req, res) => {
    const {idPeople,typeOfPerson}=req.query
    try {
        
        const data = await getBestCommentsService(idPeople,typeOfPerson)
        if (data) {
            return res.status(200).json(data);
        }

        return res.status(200).json(data);

    } catch (error) {
        console.log("BestCommentsError: ", error);
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { getBestCommentsController };