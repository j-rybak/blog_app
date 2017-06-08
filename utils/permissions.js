
module.exports = {
    loggedIn: function (req, res, next) {
        if (req.user) {
            next();
        } else {
            req.flash('warning', 'Musisz być zalogowany');
            res.redirect('/auth/login');
        }
    },
    isAdmin: function (req, res, next) {
        if (req.user &&  req.user.admin) {
            next();
        } else {
            req.flash('warning', 'Nie masz odpowiednich uprawnień.');
            if(req.user){
                res.redirect('/');
            }else{
                res.redirect('/auth/login');
            }
        }
    },

    hasObjectPermissions: function (req, res, object) {
        if (!object.owner._id.equals(req.user._id)) {
            req.flash('warning', 'Nie masz odpowiednich uprawnień.');
            res.redirect('/');
        }
    }
};
