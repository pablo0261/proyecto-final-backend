const { sendMailService } = require("../../services/sendMail/sendMail.service");

const sendMailController = async (req, res) => {
    try {
        const { from, to, subject, text } = req.body;
        if (!to || !subject || !text) {
            return res.status(400).json({ error: 'Faltan datos' });
        }

        const result = await sendMailService(to, subject, text);
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(500).json({ error: error.message });
        }
    }
    catch (error) {
        return res.status(401).json({ error: error.message });
    }
}

module.exports = { sendMailController }