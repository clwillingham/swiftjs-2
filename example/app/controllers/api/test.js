/**
 * Created by chris on 11/2/14.
 */
module.exports = {
    routes: {
        'get': index
    }
};

function index(req, res){
    res.json({success: true});
}