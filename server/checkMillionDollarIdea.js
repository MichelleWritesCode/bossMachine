const checkMillionDollarIdea = (req, res, next) => {
    let numWeeks = req.body.numWeeks;
    console.log(numWeeks);
    let weeklyRevenue = req.body.weeklyRevenue;
    console.log(weeklyRevenue);
    let millionDollar = numWeeks * weeklyRevenue;
    console.log(millionDollar);
    
    if (millionDollar < 1000000) {
        return res.status(400).send("Not a valid $1000000 idea!");
    }
    next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
