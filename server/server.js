import express from "express";
import mysql from "mysql";
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import Stripe from "stripe";

const salt = 10;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "",
    database: 'signup'
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are not authorized " })
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Error: "Token is not okay " })
            } else {
                req.id = decoded.id;
                next();
            }
        })
    }
}
app.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Success", id: req.id })
})

app.get('/profile', verifyUser, (req, res) => {

    const id = req.id

    const sql = "SELECT * FROM login WHERE id =?";

    db.query(sql, [id], (err, data) => {
        if (err) return res.json({ Error: err });

        if (data.length > 0) {
            return res.json({ Status: "Success", user: data[0] })
        }
    })


})

app.post('/register', (req, res) => {
    const sql = "INSERT INTO login(`name`,`email`,`gender`,`birthday`,`password`) VALUES(?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Error for hassing password " })
        const values = [
            req.body.name,
            req.body.email,
            req.body.gender,
            req.body.birthday,
            hash
        ]
        db.query(sql, [values], (err, result) => {
            if (err) return res.json({ Error: err });
            return res.json({ Status: "Success" });
        })
    })

})

app.post('/updateprofile', (req, res) => {
    const sql = "UPDATE login SET `name` = ?,`gender` =?,`birthday`=? where id=?";

    db.query(sql, [req.body.name,
    req.body.gender,
    req.body.birthday, req.body.id], (err, result) => {
        if (err) return res.json({ Error: err });
        return res.json({ Status: "Success" });
    })

})

app.post('/login', (req, res) => {

    const sql = "SELECT * FROM login WHERE email =?";

    db.query(sql, [req.body.email], (err, data) => {

        // return res.json({a: data});

        if (err) return res.json({ Error: 'Login error in server' });

        if (data.length > 0) {

            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {

                if (err) return res.json({ Error: "Password compare error" });

                if (response) {
                    const id = data[0].id;
                    const token = jwt.sign({ id }, 'jwt-secret-key', { expiresIn: '1d' });
                    res.cookie('token', token);
                    return res.json({ Status: "Success" })
                } else {
                    return res.json({ Error: "Password not matched" })

                }
            })

        } else {
            return res.json({ Error: "No email existed" })
        }
    })
})

app.get('/subscription', verifyUser, (req, res) => {

    const id = req.id

    const sql = "SELECT * FROM subscription";

    db.query(sql, [id], (err, data) => {
        if (err) return res.json({ Error: err });

        if (data.length > 0) {
            return res.json({ Status: "Success", subscription: data })
        }
    })


})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" })
})




  app.post("/create-payment-intent", async (req, res) => {
    try {
        
    const stripe = new Stripe('sk_test_51NLhbuJV1IgKgD8UanV0t6zyoXXfTUfipFvXTYYoq7fKE6sepnvpBq7lcEosXqFcoJnt9pYfw3t7xs7PVRfxfLs700Ak4hRyMc');
    const amount = req.body.amount;

      const paymentIntent = await stripe.paymentIntents.create({
        currency: "EUR",
        amount: 10,
        automatic_payment_methods: { enabled: true },
      });
  
      // Send publishable key and PaymentIntent details to client
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (e) {
      return res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
  });








app.listen(8081, () => {
    console.log("yess..Running.......");
})