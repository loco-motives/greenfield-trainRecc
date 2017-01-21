var users = {
    get: function(req, res){
        console.log('Serving request for ', req.method, 'where url is ', req.url);
        res.send('got');
    }
};
module.exports = {
    users: users
};