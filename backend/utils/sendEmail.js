const nodeMailer=require("nodemailer");

//jab bhi development mode me 1 app banate hain usme use krte hain 1 email testing service like mailtrap vgerah but usme problem ye h ki jab bhi send mail dabaenge,and apni mailtrpa ki id check karenge,toh usme dikha toh dega ki mail chali gayi h but asliyat m nahi jati h,
//isliye hum gmail use karenge(1 fake id bna lo)


const sendEmail=async (options)=>{

  //transporter
  const transporter=nodeMailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    service:process.env.SMTP_SERVICE,
    auth:{
      user:process.env.SMTP_MAIL,
      pass:process.env.SMTP_PASSWORD,
    },
  });
  
  // mail options
  const mailOptions={
    from:process.env.SMTP_MAIL,
    to:options.email,
    subject:options.subject,
    text:options.message,
  };

  await transporter.sendMail(mailOptions);


}

module.exports=sendEmail;