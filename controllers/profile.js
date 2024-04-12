const handleProfileGet = (req,res,postgres) => {
	const { id } = req.params;
	postgres.select('*').from('users').where({id})//because prop = value
		.then(user => {
			if(user.length){
				res.json(user[0]);
			} else {
				res.status(400).json('not found');
			}
		})
		.catch(err => res.status(400).json('error getting user'));
}

module.exports = {
	handleProfileGet: handleProfileGet
}