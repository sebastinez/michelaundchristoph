import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { env } from '$env/dynamic/private';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'asmtp.mail.hostpoint.ch',
  port: 465,
  secure: true,
  auth: {
    user: 'trauzeugen@michelaundchristoph.ch',
    pass: env.GOOGLE_MAIL_APP_PASSWORD
  }
});

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const credential = JSON.parse(atob(env.GOOGLE_SERVICE_ACCOUNT));
    const serviceAccountAuth = new JWT({
      email: credential.client_email,
      key: credential.private_key,
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file'
      ]
    });

    const data = await request.formData();

    const doc = new GoogleSpreadsheet(
      '12G7hrIZQrd_b6GycNdbuLwp-wsAQYyfWlqo4NsTG9js',
      serviceAccountAuth
    );

    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['Anmeldungen']; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
    await sheet.addRow({
      vorname: data.get('vorname')?.toString() || '',
      nachname: data.get('nachname')?.toString() || '',
      email: data.get('email')?.toString() || '',
      teilnahme: data.get('teilnahme')?.toString() || '',
      anzahl_gaeste: data.get('anzahl_gaeste')?.toString() || '',
      anzahl_vegetarisch: data.get('anzahl_vegetarisch')?.toString() || '',
      bemerkungen: data.get('bemerkungen')?.toString() || ''
    });
    const teilnahme = data.get('teilnahme');

    if (teilnahme === 'yes') {
      await transporter.sendMail({
        from: '"Hochzeit Michela und Christoph" <trauzeugen@michelaundchristoph.ch>',
        to: data.get('email')?.toString(),
        subject: 'Anmeldebestätigung für Hochzeit von Michela und Christoph',
        html: `<!DOCTYPE html>
      <html lang="en">

      <head>
          <meta charset="UTF-8">
          <title>Hochzeit Michela und Christoph</title>
          <style>
              @font-face {
                  font-family: "Pathfinder";
                  font-style: normal;
                  font-weight: 400;
                  src: url("fonts/pathfinder.otf");
              }

              h2 {
                  margin: 0;
                  font-family: "Helvetica";
              }

              main {
                  width: 70vw;
                  text-align: justify;
                  margin: auto;
                  padding: 2rem;
                  background-color: rgb(206, 221, 224);
              }
          </style>
      </head>

      <body>
          <main>
              <h2>Hochzeit von Michela und Christoph</h2>
              <p>Lieber ${data.get('vorname')?.toString()}</p>
              <p>wir möchten uns herzlich für deine Anmeldung zu unserer Hochzeitsfeier bedanken. Deine Anwesenheit wird
                  diesen besonderen Tag für uns unvergesslich machen.</p>
              <p>Hier sind die Details zur Hochzeitszeremonie und -apero:</p>
              <ul>
                  <li>Datum der Trauung: 17 April 2024</li>
                  <li>Uhrzeit: 14:00</li>
                  <li>Ort der Trauung: Grossmünster, Zürich</li>
                  <li>Ort des Apero: Lindenhofkeller, Pfalzgasse 4, 8001 Zürich</li>
                  <li>Anzahl Gäste: ${data.get('anzahl_gaeste')} davon vegetarisch ${data.get(
          'anzahl_vegetarisch'
        )}
              </ul>
              <p>Wir bitten dich, bis spätestens 13:30 Uhr am Ort der Trauung einzutreffen, um einen reibungslosen Beginn der
                  Zeremonie zu gewährleisten.</p>

              <p>Für Rückfragen und weitere Informationen bitte informiere dich auf <a
                      href="https://michelaundchristoph.ch">www.michelaundchristoph.ch</a>. Wir freuen uns sehr darauf, diesen
                  feierlichen Tag gemeinsam mit Ihnen zu erleben.</p>

              <strong>
                  <p>Mit herzlichen Grüßen,<br />Michela und Christoph</p>
              </strong>
          </main>
      </body>

      </html>`
      });
    }

    return { teilnahme: teilnahme || 'no' };
  }
};
