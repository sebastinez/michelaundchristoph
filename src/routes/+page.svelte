<script lang="ts">
  import '../app.css';
  import FormElement from '../components/FormElement.svelte';

  function handleAnchorClick(event: any) {
    const link = event.currentTarget;
    const anchorId = new URL(link.href).hash.replace('#', '');
    const anchor = document.getElementById(anchorId);
    if (anchor) {
      window.scrollTo({
        top: anchor.offsetTop,
        behavior: 'smooth'
      });
    }
  }
</script>

<style>
  h1,
  h2 {
    -webkit-text-stroke: 1px black;
  }
</style>

<svelte:head>
  <title>Michela und Christoph</title>
  <meta name="description" content="Michela und Christoph Hochzeits Website" />
</svelte:head>

<header
  class="w-screen h-168 bg-[url('/images/hero.jpg')] bg-cover bg-no-repeat bg-center flex flex-col justify-between"
>
  <nav class="flex flex-row justify-center gap-6 pt-6 text-xl font-title">
    <a href="#story" on:click|preventDefault={handleAnchorClick}>Story</a>
    <a href="#location" on:click|preventDefault={handleAnchorClick}>Location</a>
    <a href="#anmeldung" on:click|preventDefault={handleAnchorClick}>Anmeldung</a>
  </nav>
  <div class="pb-6">
    <h1 class="text-8xl pb-3 font-title stroke-black text-white drop-shadow-lg text-center">
      Michela & Christoph
    </h1>
    <h2 class="text-3xl font-title text-white stroke-black text-center">17 August 2023</h2>
  </div>
</header>

<section id="story" class="w-full py-10 px-20 flex flex-col items-center">
  <h2 class="font-title text-center text-4xl">Unsere Story</h2>
  <p class="pt-5 w-155 font-thin">
    In einer kleinen Stadt trafen Christoph und Michela durch eine Arbeitskollegin von Michela
    aufeinander. Christoph, der kreative Ingenieur mit einer Vorliebe für Hip-Hop, war von Michelas
    sanfter Natur und ihrer Liebe zur Natur und den Pferden angetan. Die Chemie zwischen ihnen war
    unbestreitbar.
  </p>
  <p class="py-5 w-155 font-thin">
    Ihre Verabredungen bestanden aus rhythmischen Tanzabenden und ruhigen Spaziergängen durch
    blühende Gärten. Trotz ihrer unterschiedlichen Interessen fanden sie einen gemeinsamen Rhythmus
    des Herzens. Nun, mit festen Plänen, freuen sie sich darauf, nächstes Jahr den Bund fürs Leben
    zu schließen und ihre einzigartige Melodie der Liebe zu einer lebenslangen Harmonie zu weben.
  </p>
  <img src="/images/story.jpg" alt="kissing with the sun setting" class="w-8/12 pt-6" />
</section>

<section id="location" class="w-full h-144 py-10 px-20 flex flex-row justify-between">
  <div>
    <h2 class="font-title text-4xl">14:00 - Grossmünster</h2>
    <p class="pt-5 w-128 font-thin">
      Treffpunkt für alle geladenen Gäste ist um 13:30 Uhr vor dem majestätischen Großmünster, um
      gemeinsam die bevorstehende kirchliche Trauung um 14:00 Uhr zu feiern.
    </p>
    <p class="pt-5 w-128 font-thin">
      Ihr seid herzlich eingeladen, an dieser besonderen Zeremonie teilzunehmen, die von
      wunderschöner Musik untermalt und durch das atemberaubende Ambiente des Großmünsters
      abgerundet wird.
    </p>
    <p class="pt-5 w-128 font-thin">
      Es wird ein unvergesslicher Moment voller Liebe und Freude, den wir gerne mit euch allen
      teilen möchten.
    </p>
  </div>
  <div class="hidden lg:block">
    <img src="/images/grossmuenster.jpg" alt="kissing with the sun setting" class="h-128" />
  </div>
</section>

<section id="location" class="w-full h-144 py-10 px-20 flex flex-row justify-between">
  <div class="hidden lg:block">
    <img src="/images/grossmuenster.jpg" alt="kissing with the sun setting" class="h-128" />
  </div>
  <div>
    <h2 class="font-title text-4xl">16:00 - Lindenhofkeller</h2>
    <p class="pt-5 w-128 font-thin">
      Um 15:00 Uhr geht's dann mit einem gemütlichen Apéro weiter, wo wir gemeinsam anstoßen und die
      schönen Momente der Trauung Revue passieren lassen können.
    </p>
    <p class="pt-5 w-128 font-thin">
      Es wird sicherlich eine entspannte und fröhliche Runde, in der wir bei guten Gesprächen und
      leckeren Getränken zusammen feiern können.
    </p>
  </div>
</section>

<section id="location" class="w-full h-144 py-10 px-20 flex flex-row justify-between">
  <div>
    <h2 class="font-title text-4xl">18:00 - BellaVista</h2>
    <p class="pt-5 w-128 font-thin">
      Um 18:00 Uhr geht's dann für den engeren Kreis mit einem feinen Abendessen im Bellavista am
      Hönggerberg weiter.
    </p>
    <p class="pt-5 w-128 font-thin">
      Bei diesem gemütlichen Beisammensein freuen wir uns auf einige herzliche Beiträge von den
      Trauzeugen und anderen lieben Gästen.
    </p>
    <p class="pt-5 pb-4 w-128 font-thin">
      Und danach? Da lassen wir die Korken knallen und feiern zusammen bis die Sonne wieder aufgeht!
    </p>
    <button class="p-3 bg-slate-500"> Zeig mir den Weg </button>
  </div>
  <div class="hidden lg:block">
    <img src="/images/grossmuenster.jpg" alt="kissing with the sun setting" class="h-128" />
  </div>
</section>

<!-- <section>
  <iframe
    title="Wegbeschreibung"
    src="https://www.google.com/maps/d/embed?mid=1vDM7yWkS-Tw8KiKGg-68_GY5Znr8k6M&hl=en&ehbc=2E312F"
    width="640"
    height="480"
  />
</section> -->

<section id="anmeldung" class="w-full py-10 px-20 flex flex-col items-center justify-stretch">
  <h2 class="font-title text-4xl">Anmeldung</h2>
  <form class="">
    <div class="flex gap-5">
      <div>
        <label class="block font-thin" for="vorname"
          >Vorname<span class="text-red-400">*</span></label
        >
        <input type="text" id="vorname" class="border border-slate-600 p-2" />
      </div>
      <div>
        <label class="block font-thin" for="nachname"
          >Nachname<span class="text-red-400">*</span></label
        >
        <input type="text" id="nachname" class="border border-slate-600 p-2" />
      </div>
    </div>
    <div>
      <label class="block font-thin" for="mail"
        >E-Mailaddresse<span class="text-red-400">*</span></label
      >
      <input type="text" id="mail" class="border border-slate-600 p-2 w-96" />
    </div>
    <div>
      <label class="block font-thin" for="mail">Teilnahme<span class="text-red-400">*</span></label>
      <input type="radio" id="mail" class="border border-slate-600 p-2" /><span
        >Ja wir bestätigen</span
      >
      <input type="radio" id="mail" class="border border-slate-600 p-2" /><span
        >Nein wir können leider nicht</span
      >
    </div>
    <div>
      <label class="block font-thin" for="mail"
        >Anzahl Gäste (inkl. Kinder)<span class="text-red-400">*</span></label
      >
      <input type="text" id="number" class="border border-slate-600 p-2 w-96" />
    </div>
    <div>
      <label class="block font-thin" for="mail">Bemerkungen (Allergien, Unverträglichkeiten):</label
      >
      <textarea id="number" class="border border-slate-600 p-2 w-96" />
    </div>
    <input type="submit" class="bg-slate-400 p-4" value="Abschicken" />
  </form>
</section>
