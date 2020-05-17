const db 				= 		require('../database/mysqlDb');
const bcrypt 			= 		require('bcrypt');
const jwt               =       require('jsonwebtoken');
const keys 				=		require('../config/keys');

let register = async (req, res) => {
	console.log(req.body);

	const { username, email, password } = req.body;

	if (username && email && password) {
		sql = `select * from users where  email='${email}'`;

		//check if user exist or not
		db.queryAsync(sql)
			.then((user) => {
				console.log(user);
				if (user.length > 0) {
					res.status(201).json({
						data: 'User already exist',
					});
				} else {
					//encrypt password
					let saltRounds = 10;
					bcrypt.hash(password, saltRounds, (err, hashPassword) => {
						if (err) throw err;

						let sql = `insert into users(username,email,password) values('${username}','${email}','${hashPassword}')`;

						db.queryAsync(sql)
							.then((response) => {
								res.status(200).json({
									data: response,
									message: 'User registered successfully!',
								});
							})
							.catch((err) => {
								res.status(500).json({
									data: err.message,
									message: 'Server error',
								});
							});
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	} else {
		console.log('user already exist!!!');
	}
};

let login = async(req, res) => {
	const { email, password } = req.body;

	if (email && password) {
             
        let sql=`select * from users where email='${email}'`;

        db.queryAsync(sql)
        .then(async(user)=>{
            
             if(email==user[0].email){
					  
				//compare encrypted password
				bcrypt.compare(password,user[0].password)
				.then(isPasswordMatched=>{
					if(isPasswordMatched){

						//create jwt token
						const auth_token=jwt.sign({id:user[0].id},keys.jwt.SECRET_TOKEN);
						res.status(200).json({
							body:{
								token: auth_token
							},
							message: "User Login Successfully!"
						});

					}
				})

             }else{
                 console.log('Email is not correct')
             }

        })
        .catch()

	} else {
        console.log('Input fields are empty!');
	}
};

module.exports = {
	register,
	login
}
