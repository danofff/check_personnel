const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const nodemailer = require("nodemailer");
const logger = require("./logger");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

let mailOptions = {
  from: "alert@checkpersonnel.com",
  to: process.env.EMAIL_TO,
  subject: "Alert!!!",
};

const sendAlert = async (dataToSend, emailTo = null) => {
  mailOptions.to = emailTo || mailOptions.to;
  //prepare email data
  const email = prepareEmailData(dataToSend);

  //prepare email message
  mailOptions.html = htmlTemplate(email, "danger");

  //send email
  try {
    const response = await transporter.sendMail(mailOptions);
    logger.info(
      "email was sent successfully about clinician #" + dataToSend.clinicianId
    );
    return response;
  } catch (error) {
    logger.error(error);
  }
};

function prepareEmailData(dataToSend) {
  const email = {
    header: `#${dataToSend.clinicianId} is lost!!!`,
  };
  if (dataToSend.data) {
    const encodedObj = encodeURIComponent(JSON.stringify(dataToSend.data));
    email.text = `If you recieved this message it means that clinician #${dataToSend.clinicianId} is out of approved safe area boundaries since ${dataToSend.lostSince}`;
    email.reference = {
      text: "Click to see last clinician location",
      ref: `http://geojson.io/#data=data:application/json,${encodedObj}`,
    };
  } else {
    email.text = `If you recieved this message it means we could not connect to clinician #${dataToSend.clinicianId} since ${dataToSend.createdAt}`;
    email.reference = null;
  }
  return email;
}

function htmlTemplate(email, type = "default") {
  let styles = {
    color: "#444",
  };
  switch (type) {
    case "danger":
      styles.headerColor = "#842029";
      styles.headerBackgroundColor = "#F8D7DA";
      break;
    case "success":
      styles.headerColor = "#0F5132";
      styles.headerBackgroundColor = "#D2E7DD";
      break;
    case "warning":
      styles.headerColor = "#674D02";
      styles.headerBackgroundColor = "#FEF3CD";
      break;
    default:
      styles.headerColor = "#084297";
      styles.headerBackgroundColor = "#CEE2FF";
  }
  let reference = "";
  if (email.reference) {
    reference = `<a target="_blank" href="${email.reference.ref}">${email.reference.text}</a>`;
  }
  return `
    <div style="border: 1px solid ${styles.headerColor}">
      <h3 style="color: ${styles.headerColor}; background: ${styles.headerBackgroundColor}; text-align: center;">
        ${email.header}
      </h3>
      <div style="padding:1rem">
        <p style="color: ${styles.color};">
          ${email.text}
        </p>
        ${reference}
      </div>
    <div>
  `;
}

module.exports = sendAlert;
