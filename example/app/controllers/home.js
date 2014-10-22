/**
 * Created by chris on 10/22/14.
 */
module.exports = {
    root: '/',
    routes: {
        'get': index
    }
};

function index(req, res){
    res.send('request received and responded to!');
}