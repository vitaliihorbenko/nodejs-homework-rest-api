// sendgrid
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const sendEmail = async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const email = {...data, from: 'vitalihorbenko@gmail.com'};
      await sgMail.send(email);
    } 
    catch (error) {
      throw error;
    }
      
  }

  module.exports = sendEmail;