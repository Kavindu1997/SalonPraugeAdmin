const nodemailer = require("nodemailer");
const config = require("config");

const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.get("MAIL_USER"),
    pass: config.get("MAIL_PWD"),
  },
});

const sendEmail = (values, token) => {
  const mailOptions = {
    from: config.get("MAIL_USER"),
    to: "kavindu.s@eyepax.com",
    subject: "Salon Prauge Registration",
    html: `
      <body>
      <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
        <div style="max-width: 700px; background-color: white; margin: 0 auto">
          <div style="width: 100%; background-color: #b99a5f; padding: 20px 0  margin: 0 auto">
          <a ><img
              src="https://res.cloudinary.com/dkbk51c9j/image/upload/v1666175300/logo_black_copydsd_d3azq9.png"
              style="width: 100%; height: 100px; object-fit: contain"
            /></a> 
          
          </div>
          <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
            <p style="font-weight: 800; font-size: 1.8rem; padding: 0 0px">
              Hi ${values["firstname"]} ${values["lastname"]},
            </p>
            <P style="width: 100%; gap: 10px; padding: 0px 20px; display: grid;">Please click below link to register with the Salon Prauge system.</P>
            <div style="font-size: .8rem; margin: 0 30px">
                <a href="http://localhost:3000/register?key=${token}">Click here to register</a>
            </div>
            <p style="width: 100%; gap: 10px; padding: 0px 20px; display: grid">Thank you & Stay safe.</p>
            <div style="width: 100%; gap: 10px; padding: 0px 20px; display: grid">Best wishes,</div>
            <div style="width: 100%; gap: 10px; padding: 0px 20px; display: grid">Salon Prauge.</div>
          </div>
        </div>
      </div>
          `,
  };

  transport.sendMail(mailOptions, function (err) {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = sendEmail;
