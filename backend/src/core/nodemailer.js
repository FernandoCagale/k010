import nodemailer from 'nodemailer';

function config () {
  const transporte = nodemailer.createTransport({
    service: 'Gmail',
    secure: true,
    auth: {
      user: process.env.EMAIL || 'email@email.com',
      pass: process.env.EMAIL_PASSWORD || 'password'
    }
  });
  return transporte;
}

function configEmail () {
  const email = {
    from: process.env.EMAIL || 'email@email.com'
  };

  return email;
}

export async function sender (pessoa) {
  const transporte = config();
  let email = configEmail();
  email.to = pessoa.email;
  email.subject = 'Sorteio amigo secreto.';
  email.html = `Seu amigo secreto é ${pessoa.amigo}`;

  return new Promise((resolve, reject) => {
    transporte.sendMail(email, (err, info) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}