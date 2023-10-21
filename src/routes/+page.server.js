/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const vorname = data.get('vorname');
    const nachname = data.get('nachname');
    const teilnahme = data.get('teilnahme');
    const bemerkungen = data.get('bemerkungen');
    const anzahl = data.get('anzahl');

    console.log(vorname, nachname, teilnahme, anzahl, bemerkungen);

    // TODO log the user in
  }
};
