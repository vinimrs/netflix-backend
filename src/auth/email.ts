import nodemailer from 'nodemailer';
import { IUser } from 'schemas/User';

// Outros tipos de provedores de email em produção https://cursos.alura.com.br/course/nodejs-refresh-tokens-confirmacao-cadastro/task/80264
const configuracaoEmailProducao = {
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USUARIO,
    pass: process.env.EMAIL_SENHA,
  },
  secure: true,
};

const configuracaoEmailTeste = (contaTeste: nodemailer.TestAccount) => ({
  host: 'smtp.ethereal.email',
  auth: contaTeste,
});

async function criaConfiguracaoEmail() {
  if (process.env.NODE_ENV === 'production') {
    return configuracaoEmailProducao;
  } else {
    const contaTeste = await nodemailer.createTestAccount();
    return configuracaoEmailTeste(contaTeste);
  }
}

class Email {
  public from: string;
  public to: string;
  public subject: string;
  public text: string;
  public html: string;

  async enviaEmail() {
    const configuracaoEmail = await criaConfiguracaoEmail();
    const transportador = nodemailer.createTransport(configuracaoEmail);
    const info = await transportador.sendMail({
      from: this.from,
      to: this.to,
      subject: this.subject,
      text: this.text,
      html: this.html,
    });

    if (process.env.NODE_ENV !== 'production') {
      'URL: ' + nodemailer.getTestMessageUrl(info);
    }
  }
}

class EmailVerificacao extends Email {
  constructor(usuario: IUser, endereco: string) {
    super();
    this.from = '"Netflix - Clone" <noreply@netflixclone.com.br>';
    this.to = usuario.email;
    this.subject = 'Verificação de e-mail';
    this.text = `Olá! Verifique seu email aqui: ${endereco}`;
    this.html = `<h1>Olá!</h1> Verifique seu email aqui: <a href="${endereco}">Verificar</a>`;
  }
}

export default { EmailVerificacao };
