<script lang="ts" context="module">
  import { env } from '$env/dynamic/public';

  export const loader = new Loader({
    apiKey: env.PUBLIC_GOOGLE_MAPS_API_KEY as string,
    version: 'weekly',
    libraries: ['maps', 'marker']
  });
</script>

<script lang="ts">
  import '../app.css';
  import '../fonts.css';
  import { Loader } from '@googlemaps/js-api-loader';
  import { enhance } from '$app/forms';
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

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

  let submitBtn: HTMLInputElement | undefined = undefined;
  let teilnahme: boolean | undefined = undefined;

  onMount(async () => {
    const maps = await loader.importLibrary('maps');
    const { PlacesService } = await loader.importLibrary('places');

    const mapElement = document.getElementById('gmp-map');

    if (mapElement) {
      const map = new maps.Map(mapElement, {
        mapId: '26de143fa7cd1b2f',
        zoom: 17,
        center: {
          lat: 47.37135227848034,
          lng: 8.542397968314921
        },
        fullscreenControl: false,
        zoomControl: true,
        streetViewControl: false
      });

      const service = new PlacesService(map);

      service.getDetails(
        {
          placeId: 'ChIJZWHfSaqgmkcREF9TlBQlGkk',
          fields: ['name', 'formatted_address', 'place_id', 'geometry']
        },
        (place) => {
          new google.maps.Marker({
            map,
            position: place?.geometry?.location,
            icon: '/images/church.png',
            title: 'Grossmünster'
          });
        }
      );
      service.getDetails(
        {
          placeId: 'ChIJr0M7RwcKkEcR58OcvIT2Gls',
          fields: ['name', 'formatted_address', 'place_id', 'geometry']
        },
        (place) => {
          new google.maps.Marker({
            map,
            position: place?.geometry?.location,
            icon: '/images/apero.png',
            title: 'Lindenhofkeller'
          });
        }
      );
    }
  });
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

<div class="xl:container xl:mx-auto">
  <header
    id="top"
    class="flex flex-col justify-between px-3 pb-10 h-155 bg-[url('/images/hero.jpg')] bg-cover bg-no-repeat bg-center"
  >
    <nav class="flex flex-row justify-center gap-6 pt-6 text-2xl font-title">
      <a href="#story" on:click|preventDefault={handleAnchorClick}>Story</a>
      <a href="#location" on:click|preventDefault={handleAnchorClick}>Location</a>
      <a href="#anmeldung" on:click|preventDefault={handleAnchorClick}>Anmeldung</a>
    </nav>
    <div class="pb-6">
      <h1 class="text-8xl pb-3 font-title stroke-black text-white drop-shadow-lg text-center">
        Michela & Christoph
      </h1>
      <h2 class="text-3xl text-white font-title text-center">17 August 2024</h2>
    </div>
  </header>

  <section id="story" class="grid grid-cols-12 py-10 px-3 gap-6">
    <h2 class="col-span-full font-title text-center text-4xl">Unsere Story</h2>
    <div class="col-span-full col-start-2 col-end-12 text-justify">
      <p class=" pt-5 font-thin">
        In einer kleinen Stadt trafen Christoph und Michela durch eine Arbeitskollegin von Michela
        aufeinander. Christoph, der kreative Ingenieur mit einer Vorliebe für Hip-Hop, war von
        Michelas sanfter Natur und ihrer Liebe zur Natur und den Pferden angetan. Die Chemie
        zwischen ihnen war unbestreitbar.
      </p>
      <p class="py-5 font-thin">
        Ihre Verabredungen bestanden aus rhythmischen Tanzabenden und ruhigen Spaziergängen durch
        blühende Gärten. Trotz ihrer unterschiedlichen Interessen fanden sie einen gemeinsamen
        Rhythmus des Herzens. Nun, mit festen Plänen, freuen sie sich darauf, nächstes Jahr den Bund
        fürs Leben zu schließen und ihre einzigartige Melodie der Liebe zu einer lebenslangen
        Harmonie zu weben.
      </p>
    </div>
    <div class="col-span-full col-start-2 col-end-12">
      <img src="/images/story.jpg" alt="kissing with the sun setting" />
    </div>
  </section>

  <section id="location" class="grid grid-cols-12 py-10 px-3 gap-6">
    <div class="col-span-full col-start-2 col-end-12 md:col-start-2 md:col-end-6 text-justify">
      <h2 class="font-title text-4xl">14:00 - Grossmünster</h2>
      <p class="pt-5 font-thin">
        Treffpunkt für alle geladenen Gäste ist um 13:30 Uhr vor dem majestätischen Großmünster, um
        gemeinsam die bevorstehende kirchliche Trauung zu feiern.
      </p>
      <p class="pt-5 font-thin">
        Ihr seid herzlich eingeladen, an dieser besonderen Zeremonie teilzunehmen, die von
        wunderschöner Musik untermalt und durch das atemberaubende Ambiente des Großmünsters
        abgerundet wird.
      </p>
      <p class="pt-5 font-thin">
        Es wird ein unvergesslicher Moment voller Liebe und Freude, den wir gerne mit euch allen
        teilen möchten.
      </p>
    </div>
    <div class="hidden md:block col-span-full col-start-2 col-end-11 md:col-start-7 md:col-end-12">
      <img src="/images/grossmuenster.jpg" alt="kissing with the sun setting" />
    </div>
  </section>

  <section
    id="location"
    style:background-color="#CEDDE0"
    class="grid grid-cols-12 gap-6 px-3 py-10"
  >
    <div class="hidden md:block md:col-start-2 md:col-end-6">
      <img src="/images/lindenhofkeller.png" alt="kissing with the sun setting" />
    </div>
    <div
      class="col-span-full col-start-2 col-end-12 md:col-span-5 md:col-start-7 md:col-end-12 text-justify"
    >
      <h2 class="font-title text-4xl">16:00 - Lindenhofkeller</h2>
      <p class="pt-5 font-thin">
        Um 15:00 Uhr geht's dann mit einem gemütlichen Apéro weiter, wo wir gemeinsam anstoßen und
        die schönen Momente der Trauung Revue passieren lassen können.
      </p>
      <p class="pt-5 font-thin">
        Es wird sicherlich eine entspannte und fröhliche Runde, in der wir bei guten Gesprächen und
        leckeren Getränken zusammen feiern können.
      </p>
    </div>
  </section>
  <div id="gmp-map" style:height="500px" />

  {#if $page.form?.success === 'true'}
    <div class="text-center p-20">
      <div class="text-3xl font-title">Vielen Dank für deine Anmeldung! 🥳</div>
      {#if $page.form.teilnahme === 'yes'}
        <div class="pt-5">Wir freuen uns schon sehr auf deine/eure Teilnahme.</div>
      {:else}
        <div class="pt-5 w-max-96">
          Wir bedauern dass du nicht kommen kannst, danke fürs Bescheid sagen!
        </div>
      {/if}
    </div>
  {:else if $page.form?.success === 'false'}
    <div class="text-center p-20">
      <div class="text-3xl font-title">
        Wir haben leider ein Problem mit deiner Anmeldung festgestellt 😟
      </div>
      <div class="pt-5">{$page.form.error}</div>
    </div>
  {:else}
    <h2 id="anmeldung" class="font-title text-4xl text-center px-3 py-10">Anmeldung</h2>
    <form
      method="POST"
      use:enhance={() => {
        return async ({ update }) => {
          if (submitBtn) submitBtn.disabled = false;
          update();
        };
      }}
      on:submit={() => {
        if (submitBtn) submitBtn.disabled = true;
      }}
      class="grid grid-cols-12 gap-6 px-3 mb-5"
    >
      <div class="col-start-2 col-end-7">
        <label class="font-thin" for="vorname"
          >Vorname<span aria-label="required" class="text-red-400">*</span></label
        >
        <input
          required
          type="text"
          name="vorname"
          id="vorname"
          class="w-full border border-slate-600 p-2"
        />
      </div>
      <div class="col-start-7 col-end-12">
        <label class="font-thin" for="nachname"
          >Nachname<span aria-label="required" class="text-red-400">*</span></label
        >
        <input
          required
          type="text"
          name="nachname"
          id="nachname"
          class="w-full border border-slate-600 p-2"
        />
      </div>
      <div class="col-span-full col-start-2 col-end-12">
        <label class="font-thin" for="mail"
          >E-Mailaddresse<span aria-label="required" class="text-red-400">*</span></label
        >
        <input
          required
          type="email"
          name="email"
          id="email"
          class="w-full border border-slate-600 p-2"
        />
      </div>
      <div class="col-span-full col-start-2 col-end-12">
        <label class="font-thin" for="mail"
          >Teilnahme<span aria-label="required" class="text-red-400">*</span></label
        >
        <div class="flex flex-row gap-8">
          <div>
            <input
              type="radio"
              name="teilnahme"
              on:click={() => (teilnahme = true)}
              required
              value="yes"
              id="teilnahme_yes"
              class="border border-slate-600 p-2"
            /><label for="teilnahme_yes">Ja wir bestätigen</label>
          </div>
          <div>
            <input
              type="radio"
              name="teilnahme"
              on:click={() => (teilnahme = false)}
              required
              value="no"
              id="teilnahme_no"
              class="border border-slate-600 p-2"
            /><label for="teilnahme_no">Nein wir können leider nicht</label>
          </div>
        </div>
      </div>
      {#if teilnahme}
        <div class="col-span-full col-start-2 col-end-7" transition:fly>
          <label class="font-thin" for="anzahl_gaeste"
            >Anzahl Gäste (inkl. Kinder)<span aria-label="required" class="text-red-400">*</span
            ></label
          >
          <input
            type="number"
            required
            min={0}
            name="anzahl_gaeste"
            id="anzahl_gaeste"
            class="w-full border border-slate-600 p-2"
          />
        </div>
        <div class="col-span-full col-start-7 col-end-12" transition:fly>
          <label class="font-thin" for="anzahl_vegetarisch"
            >Wieviele davon vegetarisch?<span aria-label="required" class="text-red-400">*</span
            ></label
          >
          <input
            type="number"
            min={0}
            name="anzahl_vegetarisch"
            id="anzahl_vegetarisch"
            class="w-full border border-slate-600 p-2"
          />
        </div>
        <div class="col-span-full col-start-2 col-end-12" transition:fly>
          <label class="font-thin" for="bemerkungen"
            >Bemerkungen (Allergien, Unverträglichkeiten):</label
          >
          <textarea
            rows={5}
            id="bemerkungen"
            name="bemerkungen"
            class="w-full border border-slate-600 p-2"
          />
        </div>
      {/if}
      <input
        bind:this={submitBtn}
        id="submitBtn"
        type="submit"
        class="col-span-4 font-title col-start-5 disabled:cursor-not-allowed disabled:opacity-20 md:col-span-2 md:col-start-6 bg-slate-500 text-white p-3"
        value="Abschicken"
      />
    </form>
  {/if}

  <footer class="bg-slate-400 text-right py-3 px-3 mt-10">
    <a href="#top" on:click|preventDefault={handleAnchorClick}> nach oben </a>👆
  </footer>
</div>
