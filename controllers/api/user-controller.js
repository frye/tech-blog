const router = require('express').Router();
const { User } = require('../../models');

router.get

router.post('/', async (req, res) => {
	try {
		const userData = await User.create(req.body);
		console.log(userData.id);
		req.session.save( () => {
			req.session.user_id = userData.id;
			req.session.is_logged_in = true;
      req.session.logged_in_name = userData.username;

			res.status(200).json(userData);
		});
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

router.post('/login', async (req, res) => {
	try {
		const userData = await User.findOne({	where: { email: req.body.email }	});

		if (!userData) {
			res.status(400).json({ message: "Incorrect email or password" });
			return;
		}

		const validPassword = await userData.checkPassword(req.body.password);

		if (!validPassword) {
			res.status(400).json({ message: "Incorrect email or password" });
			return;
		}

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.is_logged_in = true;
      req.session.logged_in_name = userData.username;

			res.status(200).json(userData);
		});

	} catch (err) {
		res.status(400).json(err);
	}
});

router.post('/logout', async (req, res) => {
	if (req.session.is_logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;