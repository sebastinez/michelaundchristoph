import nodemailer from 'nodemailer';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import { mailTemplate } from '$lib/mail-template';

const transporter = nodemailer.createTransport({
  host: 'asmtp.mail.hostpoint.ch',
  port: 465,
  secure: true,
  auth: {
    user: 'trauzeugen@michelaundchristoph.ch',
    pass: env.GOOGLE_MAIL_APP_PASSWORD
  }
});

const credential = JSON.parse(atob(env.GOOGLE_SERVICE_ACCOUNT));
const serviceAccountAuth = new JWT({
  email: credential.client_email,
  key: credential.private_key,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive.file'
  ]
});

const doc = new GoogleSpreadsheet(
  '12G7hrIZQrd_b6GycNdbuLwp-wsAQYyfWlqo4NsTG9js',
  serviceAccountAuth
);

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    // Parse formData
    const formData = await request.formData();
    const formDataArray = Array.from(formData.entries()).map(([key, value]) => [
      key,
      value.toString()
    ]);
    const { vorname, nachname, email, teilnahme, anzahl_gaeste, anzahl_vegetarisch, bemerkungen } =
      Object.fromEntries(formDataArray);

    // Validate formData
    if (!vorname) {
      return fail(400, { success: 'false', error: 'Es fehlt uns Ihr Vorname.' });
    } else if (!nachname) {
      return fail(400, { success: 'false', error: 'Es fehlt uns Ihr Nachname.' });
    } else if (!email) {
      return fail(400, { success: 'false', error: 'Es fehlt uns Ihre E-Mail addresse.' });
    } else if (!teilnahme) {
      return fail(400, {
        success: 'false',
        error: 'Wir haben nicht verstanden ob Sie kommen können oder nicht.'
      });
    } else if (teilnahme === 'yes' && !anzahl_gaeste) {
      return fail(400, { success: 'false', error: 'Es fehlt uns die Anzahl Gäste.' });
    } else if (teilnahme === 'yes' && anzahl_gaeste < 1) {
      return fail(400, {
        success: 'false',
        error: 'Sie müssen mindestens eine Person angeben in Anzahl Gäste.'
      });
    }

    // Load google spreadsheet
    try {
      await doc.loadInfo();
      const sheet = doc.sheetsByTitle['Anmeldungen'];
      await sheet.addRow({
        vorname,
        nachname,
        email,
        teilnahme,
        anzahl_gaeste,
        anzahl_vegetarisch: anzahl_vegetarisch ?? 0,
        bemerkungen
      });
    } catch (e) {
      console.error(e);
      return fail(500, {
        success: 'false',
        error:
          'Es gab leider ein Problem beim Eintragen ihrer Anmeldedaten, bitte wenden Sie sich an trauzeugen@michelaundchristoph.ch'
      });
    }

    if (teilnahme === 'yes') {
      try {
        await transporter.sendMail({
          from: '"Hochzeit Michela und Christoph" <trauzeugen@michelaundchristoph.ch>',
          to: email,
          subject: 'Anmeldebestätigung für Hochzeit von Michela und Christoph',
          html: mailTemplate(vorname, anzahl_gaeste, anzahl_vegetarisch)
        });
      } catch (e) {
        console.error(e);
        return fail(500, {
          success: 'false',
          error:
            'Deine Daten wurden gespeichert, es gab aber leider ein Problem beim Versenden des Bestätigungsemails. Bitte wenden Sie sich an trauzeugen@michelaundchristoph.ch'
        });
      }
    }

    return { success: 'true', teilnahme };
  }
};
