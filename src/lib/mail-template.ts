export const mailTemplate = (name: string, anzahl: string, vegetarisch: string) =>
  `<!DOCTYPE html>
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
              <p>Lieber ${name}</p>
              <p>wir möchten uns herzlich für deine Anmeldung zu unserer Hochzeitsfeier bedanken. Deine Anwesenheit wird
                  diesen besonderen Tag für uns unvergesslich machen.</p>
              <p>Hier sind die Details zur Hochzeitszeremonie und -apero:</p>
              <ul>
                  <li>Datum der Trauung: 17 April 2024</li>
                  <li>Uhrzeit: 14:00</li>
                  <li>Ort der Trauung: Grossmünster, Zürich</li>
                  <li>Ort des Apero: Lindenhofkeller, Pfalzgasse 4, 8001 Zürich</li>
                  <li>Anzahl Gäste: ${anzahl} davon vegetarisch ${vegetarisch}
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

      </html>`;
