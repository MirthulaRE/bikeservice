const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const SerdataModel = require('./models/serdata'); 
const User = require('./models/User');



const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://mirthula:mirthula@bikeservice.hwgrs6w.mongodb.net/?retryWrites=true&w=majority&appName=bikeservice', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.json());



app.post('/register', (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(400).json("Already registered");
            } else {
                const newUser = new User({
                    name,
                    email,
                    password,
                    role: isAdmin ? 'admin' : 'user'
                });

                newUser.save()
                    .then(() => res.status(201).json(newUser))
                    .catch(err => res.status(500).json(err)); 
            }
        })
        .catch(err => res.status(500).json(err));
});



app.post('/firststep', (req, res) => {
    const { emailid, fullname, mobile, model, service, bookingDate } = req.body;

    SerdataModel.findOne({ emailid: emailid })
        .then(user => {
            if (user) {
                res.json("Already registered");
            } else {
                SerdataModel.create({
                    emailid: emailid,
                    fullname: fullname,
                    mobile: mobile,
                    model: model,
                    service: service,
                    bookingDate: bookingDate
                })
                    .then(log_ser_form => res.json(log_ser_form))
                    .catch(err => res.json(err));
            }
        });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
     User.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("Wrong password");
                }
            } else {
                res.json("No records found!");
            }
        });
});


app.post('/bookings', (req, res) => {
    const { emailid, fullname, mobile, model, service, bookingDate } = req.body;

    SerdataModel.findOne({ emailid: emailid })
        .then(user => {
            if (user) {
                res.json("Already registered");
            } else {
                SerdataModel.create({
                    emailid: emailid,
                    fullname: fullname,
                    mobile: mobile,
                    model: model,
                    service: service,
                    bookingDate: bookingDate
                })
                    .then(bookings => res.json(bookings))
                    .catch(err => res.json(err));
            }
        });
});


app.get('/previous-bookings', (req, res) => {
    const { emailid } = req.query;
    SerdataModel.find({ emailid })
        .then(bookings => {
            res.json(bookings);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});


const product = require('./routes/product');
const users = require('./routes/users');
const servicebookings = require('./routes/servicebookings');

app.use(cors());
app.use(express.json());
app.use('/api/v1/products', product);
app.use('/api/v1/users', users);
app.use('/api/v1/servicebookings', servicebookings);




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on http://127.0.0.1:${PORT}`);
});

