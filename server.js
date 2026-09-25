import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "./db.js";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express();

const PORT = 5000;
const SECRET = process.env.JWT_SECRET || "dev_secret_key_12345";

if (!process.env.JWT_SECRET) {
    console.warn("JWT_SECRET missing, using temporary dev key");
}

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
);

app.use(express.json());
app.use(cookieParser());


// =========================
// SIGNUP
// =========================

app.post("/api/v1/signup", async (req, res) => {

    const {
        firstName,
        lastName,
        email,
        password,
        phone,
        isSeller
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).send({
            status: "error",
            message: "Required Parameter Missing"
        });
    }

    try {

        const salt = await bcrypt.genSalt(12);

        const hash = await bcrypt.hash(password, salt);

        const role = isSeller ? "seller" : "buyer";

        const dbRes = await db.query(
            `
            INSERT INTO users
            (first_name, last_name, email, password_hash, phone, role)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, first_name, last_name, email, phone, role
            `,
            [
                firstName,
                lastName,
                email,
                hash,
                phone || "",
                role
            ]
        );

        res.status(201).send({
            status: "success",
            message: `User created with email: ${email}`,
            user: dbRes.rows[0]
        });

    } catch (error) {

        console.log("Signup Error:", error);

        if (error.code === "23505") {

            return res.status(400).send({
                status: "error",
                message: "User already exists with this email"
            });

        }

        res.status(500).send({
            status: "error",
            message: "Internal Server Error"
        });
    }
});


// =========================
// LOGIN
// =========================

app.post("/api/v1/login", async (req, res) => {

    const {
        email,
        password
    } = req.body;

    if (!email || !password) {

        return res.status(400).send({
            status: "error",
            message: "Required Parameter Missing"
        });
    }

    try {

        const users = await db.query(
            `
            SELECT *
            FROM users
            WHERE email = $1
            AND is_active = true
            `,
            [email]
        );

        const currentUser = users.rows[0];

        if (!currentUser) {

            return res.status(404).send({
                status: "error",
                message: "User Not Found With This Email"
            });
        }

        const isPassMatched = await bcrypt.compare(
            password,
            currentUser.password_hash
        );

        if (!isPassMatched) {

            return res.status(401).send({
                status: "error",
                message: "Password did not match"
            });
        }

        delete currentUser.password_hash;

        const userToken = jwt.sign(
            {
                ...currentUser
            },
            SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.cookie("Token", userToken, {
            maxAge: 86400000,
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.status(200).send({
            status: "success",
            user: currentUser
        });

    } catch (error) {

        console.log("Login Error:", error);

        res.status(500).send({
            status: "error",
            message: "Internal Server Error"
        });
    }
});


// =========================
// CHECK LOGIN / ME
// =========================

app.get("/api/v1/me", (req, res) => {

    if (!req.cookies?.Token) {

        return res.status(401).send({
            status: "error",
            message: "Unauthorized"
        });
    }

    jwt.verify(
        req.cookies.Token,
        SECRET,
        (err, decodedData) => {

            if (err) {

                return res.status(401).send({
                    status: "error",
                    message: "Invalid or expired token"
                });
            }

            delete decodedData.iat;
            delete decodedData.exp;

            res.status(200).send({
                status: "success",
                user: decodedData
            });
        }
    );
});


// =========================
// LOGOUT
// =========================

app.post("/api/v1/logout", (req, res) => {

    res.cookie("Token", "", {
        maxAge: 1,
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    res.status(200).send({
        status: "success",
        message: "Logout Successfully"
    });
});


// =========================
// SERVER
// =========================


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __frontend = path.join(__dirname, "frontend", "build");

if (!fs.existsSync(__frontend)) {
    console.warn(`Frontend build folder not found at ${__frontend}. Run "npm run build" inside frontend first.`);
}

app.use(express.static(__frontend, { index: false }));

// Serve the app shell only for real browser routes, never for missing asset requests.
app.get(/^\/((?!api\/).)*$/, (req, res, next) => {
    const hasFileExtension = /\.[^/]+$/.test(req.path);

    if (hasFileExtension) {
        return res.status(404).send("Not Found");
    }

    const indexPath = path.join(__frontend, "index.html");
    if (!fs.existsSync(indexPath)) {
        return next(new Error("Frontend build not found. Run npm run build in the frontend folder."));
    }

    return res.sendFile(indexPath);
});

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`);
});
