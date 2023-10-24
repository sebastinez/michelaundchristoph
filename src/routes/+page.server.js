import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { env } from '$env/dynamic/private';
import { json, text } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    // Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
    const serviceAccountAuth = new JWT({
      // env var values here are copied from service account credentials generated by google
      // see "Authentication" section in docs for more info
      email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: env.GOOGLE_PRIVATE_KEY,
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
      vorname: data.get('vorname') || '',
      nachname: data.get('nachname') || '',
      email: data.get('email') || '',
      teilnahme: data.get('teilnahme') || '',
      anzahl_gaeste: data.get('anzahl_gaeste') || '',
      anzahl_vegetarisch: data.get('anzahl_vegetarisch') || '',
      bemerkungen: data.get('bemerkungen') || ''
    });
    const teilnahme = data.get('teilnahme');

    return { teilnahme: teilnahme || 'no' };
  }
};
