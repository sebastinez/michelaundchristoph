import nodemailer from 'nodemailer';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import { geschenkTemplate, mailTemplate } from '$lib/mail-template';

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
  confirm: async ({ request }) => {
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
        anzahl_vegetarisch: anzahl_vegetarisch === '' ? 0 : anzahl_vegetarisch,
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
  },
  gift: async ({ request }) => {
    const formData = await request.formData();
    const formDataArray = Array.from(formData.entries()).map(([key, value]) => [
      key,
      value.toString()
    ]);
    const { email } = Object.fromEntries(formDataArray);

    if (!email) {
      return fail(400, { success: 'false', error: 'Es fehlt uns Ihre E-Mail addresse.' });
    }

    try {
      await transporter.sendMail({
        from: '"Hochzeit Michela und Christoph" <trauzeugen@michelaundchristoph.ch>',
        to: email,
        subject: 'Nützliche Informationen für Hochzeitsgeschenk für Michela und Christoph',
        attachments: [
          {
            filename: 'QR-Rechnung.pdf',
            content: einzahlungsScheinPDF,
            contentType: 'application/pdf',
            encoding: 'base64'
          }
        ],
        html: geschenkTemplate()
      });
    } catch (e) {
      console.error(e);
      return fail(500, {
        success: 'false',
        error:
          'Es gab aber leider ein Problem beim Versenden der Geschenkinformationen. Bitte wenden Sie sich an trauzeugen@michelaundchristoph.ch'
      });
    }
  }
};

const einzahlungsScheinPDF =
  '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ZWx2ZXRpY2EtQm9sZAovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwo+PgplbmRvYmoKOSAwIG9iago8PAovVHlwZSAvRm9udAovU3VidHlwZSAvVHlwZTEKL0Jhc2VGb250IC9IZWx2ZXRpY2EKL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcKPj4KZW5kb2JqCnhyZWYKMCAxMAowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTUgMDAwMDAgbg0KMDAwMDAwMDEyMiAwMDAwMCBuDQowMDAwMDAwMDc4IDAwMDAwIG4NCjAwMDAwMDAxNzkgMDAwMDAgbg0KMDAwMDAwMDI5NyAwMDAwMCBuDQowMDAwMDAyNTc1IDAwMDAwIG4NCjAwMDAwMDI2MDggMDAwMDAgbg0KMDAwMDAwMjY0OSAwMDAwMCBuDQowMDAwMDAyNzUxIDAwMDAwIG4NCnRyYWlsZXIKPDwKL1Jvb3QgMSAwIFIKL0luZm8gMyAwIFIKL0lEIFs8OTYzMTUxRDlFRUZGQjQ1MEFERDFFRURDODZEMDQzN0Q+IDw5NjMxNTFEOUVFRkZCNDUwQUREMUVFREM4NkQwNDM3RD5dCi9TaXplIDEwCj4+CnN0YXJ0eHJlZgoyODQ4CiUlRU9GCjMgMCBvYmoKPDwgL01vZERhdGUgKEQ6MjAyNDA2MDcyMTE1MTdaMDAnMDAnKSAvUHJvZHVjZXIgKG1hY09TIFZlcnNpb24gMTQuNSBcKEJ1aWxkIDIzRjc5XCkgUXVhcnR6IFBERkNvbnRleHQsIEFwcGVuZE1vZGUgMS4xKQovVGl0bGUgKFN3aXNzIFFSIEJpbGwpID4+CmVuZG9iago0IDAgb2JqCjw8IC9Db250ZW50cyA1IDAgUiAvVHlwZSAvUGFnZSAvUmVzb3VyY2VzIDYgMCBSIC9Sb3RhdGUgMCAvTWVkaWFCb3ggWyAwIDAKNTk1LjI3NTYgMjk3LjYzNzggXSAvUGFyZW50IDIgMCBSID4+CmVuZG9iagp4cmVmCjAgMQowMDAwMDAwMDAwIDY1NTM1IGYgCjMgMgowMDAwMDAzMjAyIDAwMDAwIG4gCjAwMDAwMDMzNjIgMDAwMDAgbiAKdHJhaWxlcgo8PCAvSUQgWzw5NjMxNTFEOUVFRkZCNDUwQUREMUVFREM4NkQwNDM3RD48MTA4RDQ5MEY5QzZBODQwNjRDODc3MjkxRDEzRTdBMTI+IF0gL1Jvb3QgMSAwIFIgL1NpemUgMTAgL1ByZXYgMjg0OCAvSW5mbyAzIDAgUiA+PiAKc3RhcnR4cmVmCjM0ODgKJSVFT0YK';
