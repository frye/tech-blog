const withAuth = (req, res, next) => {
	if (!req.session.is_logged_in) {
		res.redirect('/login');
	} else {
		next();
	}
}

module.exports = withAuth;