"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.default = async (email, subject, text, res) => {
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.EMAIL_HOST,
        service: process.env.EMAIL_SERVICE,
        port: process.env.EMAIL_PORT,
        secure: true,
        // logger: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    try {
        const sendEmail = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject,
            text,
        });
        return (sendEmail.accepted && sendEmail.accepted.length > 0);
    }
    catch (err) {
        console.log(err.message);
        return false;
    }
};
//# sourceMappingURL=sendEmail.js.map