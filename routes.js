const router = require('express').Router();
const fs = require('fs');
const dataChats = require("./dataChats.json");
const msg = require('./messages.json');
const users = require('./users.json');
const secret = require("./secret")
const jwt = require('jwt-simple');
const auth = require("auth-jwt");

// const authMiddleware = (req, res, next) => {
//     auth.verify(req, secret)
//     .then(user => {
//         req.user = user;
// 		next();
//     })
//     .catch(function(err){
// 		res.sendStatus(401);
// 	});
// }

router.post("/api/auth", (req, res) => {
	const uName = req.body.name;
    const uPwd = req.body.password;
	const userIndex = users.users.findIndex(item => {
		return item.name === uName && item.pwd === uPwd;
    });
	if(userIndex !== -1){
		const dataObj = {
			user: users[userIndex],
			iat: new Date().getTime(),
		}
        const token = jwt.encode(dataObj, secret);    
        res.json({token: token});
        
	}
	else {
		res.sendStatus(401);
	}
});

// router.get("/api/secret", authMiddleware, (req, res) => {
// 	console.log(req.user);
// 	res.sendStatus(200);
// });


//render Chats
router.get("/api", (req, res) => {
    res.json(dataChats.chats);
});

//render Messages onClick
router.get("/api/:roomId/messages", (req, res) => {
    const roomId = req.params.roomId;
    const roomMessages = msg.messages.filter(item => item.roomId === roomId);
    res.json(roomMessages);

    router.post("/api/addmessage", (req, res) => {
        const newMsg = {
            text: req.body.text,
            roomId: req.body.roomId,
            userId: req.body.userId
        }
        const arr = [...msg.messages];
        arr.push(newMsg);
        msg.messages = arr;
        fs.writeFile('./messages.json', JSON.stringify(msg), err => {
            if (!err) {
                res.json(msg.messages)
            }
        })
    })

})






module.exports = router;