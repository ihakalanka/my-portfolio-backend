const Contact = require('../model/contact');
const { errorResponse, successResponse } = require('../shared/response');
const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendMessage = async (req, res) => {
    const {
        name,
        email,
        message,
    } = req.body;

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let nameWithCap = capitalizeFirstLetter(name);
    let msgWithCap = capitalizeFirstLetter(message);

    try {
        const mail = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        })

        const mailOptions = {
            from: `"${nameWithCap} 👻"<user>`,
            to: email,
            subject: `Subscribed by ${nameWithCap}`,
            html: `
            <h2>Subscribed by ${nameWithCap}</h2>
            <p>
            <b>Dear Haresh</b> &#128075;
            </br></br>
            I'm ${nameWithCap} and ${msgWithCap}.
            Please contact me.
            </br></br>
            Thank you.
            </br></br>
            Regards,
            </br>
            ${nameWithCap}
            </p>
            `
        }

        mail.sendMail(mailOptions, (err, info) => {
            if (err) {
                errorResponse(res, null, null, err);
            }
            else {
                try {
                    const newUser = new Contact({
                        name,
                        email,
                        message
                    });
                    newUser.save();
                    successResponse(res, 'New user saved', info.response);
                }
                catch (err) {
                    errorResponse(res, null, null, err);
                }
                successResponse(res, 'Email sent', info.response);
            }
        })
    }
    catch (err) {
        errorResponse(res, null, null, err);
    }
}