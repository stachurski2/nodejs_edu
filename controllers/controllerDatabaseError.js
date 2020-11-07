
exports.getDatabaseError = (req,res,next) => {   
    res.status(500).render('unknownError', { pageTitle: 'Internal dabase error :(', path: 'xxx' });
};