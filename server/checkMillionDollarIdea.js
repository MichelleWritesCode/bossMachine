const checkMillionDollarIdea = (req, res, next) => {
    let numWeeks = req.body.numWeeks;
    let weeklyRevenue = req.body.weeklyRevenue;

    if (!numWeeks || !weeklyRevenue || !Number(numWeeks) || !Number(weeklyRevenue)) {
        return res.status(400).send();
    } else {
        let millionDollar = Number(numWeeks) * Number(weeklyRevenue);
        
        if (millionDollar < 1000000) {
            return res.status(400).send("Not a valid $1000000 idea!");
        }
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
