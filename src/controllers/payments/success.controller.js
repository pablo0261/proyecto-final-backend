

const successController = (req, res) => {
    console.log("Success: ", req.query)

    res.redirect('https://www.google.com');
}

module.exports = successController;