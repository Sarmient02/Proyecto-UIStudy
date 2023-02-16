const { Router } = require('express');
const router = Router();
const multer = require('multer');

const User = require('../models/User');
const Document = require('../models/Document');

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('hello')
});

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({email, password});
    const user = await User.findOne({email});
    if (user) return res.status(401).send('The email already exists');
    await newUser.save();
		const token = await jwt.sign({_id: newUser._id}, 'secretkey');
    res.status(200).json({token});
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(401).send('The email doen\' exists');
    const validate = await user.isValidPassword(password);
    if (!validate) return res.status(401).send('Wrong Password');

		const token = jwt.sign({_id: user._id}, 'secretkey');

    return res.status(200).json({token});
});

router.get('/tasks', (req, res) => {
    res.json([
        {
            _id: '1',
            name: "task one",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '2',
            name: "task two",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '3',
            name: "task three",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
    ])
});

router.get('/private-tasks', verifyToken, (req, res) => {
    res.json([
        {
            _id: '1',
            name: "task one",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '2',
            name: "task two",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
        {
            _id: '3',
            name: "task three",
            description: 'asdadasd',
            date: "2019-11-06T15:50:18.921Z"
        },
    ])
});

router.get('/documentos', (req, res) => {
    Document.find().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    })
});

router.get('/documentos/:id', (req, res) => {
    Document.findById(req.params.id).then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    })
});

//Subir archivos con multer
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        const namef = file.originalname.replace(/[^\x00-\x7F]/g,'');
        const filename = (namef.split(" ").join("-")) + "-" + Date.now();
        cb(null, `${filename}.${ext}`);
    },
    destination: (req, file, cb) => {
        cb(null, './public');
    }
});

const upload = multer({storage});

router.post('/upload', verifyToken, upload.single('myFile'), async (req, res) => {
    const file = req.file;
    const { title, description, content, id_carrera, id_materia } = req.body;
    const id_user = req.userId;
    const newDocument = new Document({id_user, file, title, description, content, id_carrera, id_materia});
    await newDocument.save();
    console.log(req.body.id_materia)
    res.status(200).json({newDocument});
});

/*
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const newUser = new User({email, password});
    const user = await User.findOne({email});
    if (user) return res.status(401).send('The email already exists');
    await newUser.save();
		const token = await jwt.sign({_id: newUser._id}, 'secretkey');
    res.status(200).json({token});
});
*/

async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, 'secretkey');
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		//console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}

module.exports = router;
