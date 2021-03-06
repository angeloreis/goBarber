import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Mail from '../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle(data) {
    const { appointment } = data;

    // console.log(appointment);

    await Mail.sendMail({
      to: `Angelo reis - Modo Teste <angelo.desenvolvedor@gmail.com>`,
      // to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento Cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às' h:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
