<script context="module">
  export const prerender = true;
</script>

<script>
  import ContributorBlock from './components/contributorBlock.svelte';
  import Header from './components/header.svelte';
  import Footer from './components/footer.svelte';
  import DownloadBtnDynamic from './components/downloadBtnDynamic.svelte';
  import { OS, sylphVersion } from './utilities/userOS';
</script>

<svelte:head>
  <title>Sylph</title>
</svelte:head>
<Header />
<container class="main-container">
  <section class="title-head">
    <div class="title-text">
      <h2>Svelte Prototyping</h2>
      <h1>SIMPLIFIED</h1>
      <p>An Open Source Drag and Drop</p>
      <p>Svelte Prototyping App</p>
      <form action={sylphVersion} method="get" target="_blank" class="DL-form">
        <DownloadBtnDynamic OS={OS.name} />
      </form>
    </div>
    <div class="title-img">
      <img src="/sylph-screen.png" alt="sylph screen shot" />
    </div>
  </section>
  <!-- <section class="yt-video">
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/uK2RnIzrQ0M"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </section> -->
  <section class="about">
    <div class="about-head">
      <h1>What is Sylph?</h1>
    </div>
    <div class="about-text">
      <p>
        <strong><em>Sylph</em></strong> is a prototyping tool for Svelte web applications.
        With its convenient drag-and-drop interface, component customizer, real-time
        code preview, and real-time site preview, Sylph allows users to quickly prototype
        and develop the architecture of their Svelte applications.
      </p>
      <p>
        Harnessing the power of Electron, TypeScript, and Svelte, <strong
          ><em>Sylph</em></strong
        > provides an open-source solution for the fast-growing Svelte community's
        prototyping needs. Sylph is available for Mac and Windows operating systems.
      </p>
    </div>
  </section>
  <section class="features">
    <div class="feature">
      <div class="feature-discription">
        <img src="/dnd.png" alt="feature icon" class="feature-icon" />
        <h2>Drag and Drop</h2>
        <p>
          <strong><em>Sylph</em></strong> features a simple drag and drop interface
          that allows for a wide experience range of software engineers to quickly
          prototype Svelte projects by dragging and nesting components into the sandbox,
          complete with the ability to edit attributes and styles within the element
          or global scope.
        </p>
      </div>
      <div class="feature-img">
        <img src="/sylph-dnd.png" alt="feature screenshot" />
      </div>
    </div>
    <div class="feature">
      <div class="feature-img">
        <img src="/sylph-preview.png" alt="feature screenshot" />
      </div>
      <div class="feature-discription">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="7em"
          height="7em"
          fill="currentColor"
          class="bi bi-code-slash"
          viewBox="0 0 16 16"
          color="whitesmoke"
        >
          <path
            d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"
          />
        </svg>
        <h2>Live Previews</h2>
        <p>
          <strong><em>Sylph's</em></strong> preview window visualizes the generated
          Svelte code and/or the DOM which updates live as you work so changes can
          be monitored instantly, making it truly a WYSIWYG application.
        </p>
      </div>
    </div>
    <div class="feature">
      <div class="feature-discription">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="7em"
          height="7em"
          fill="currentColor"
          class="bi bi-card-checklist"
          viewBox="0 0 16 16"
          color="whitesmoke"
        >
          <path
            d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
          />
          <path
            d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"
          />
        </svg>
        <h2>Complete Projects</h2>
        <p>
          <strong><em>Sylph</em></strong> doesn't just simply create code snippets
          to copy and paste into an editor, it creates the entire svelte project,
          saved on your local machine, ready to be opened in your favorite code editor
          to build out the prototype created in the application.
        </p>
      </div>
      <div class="feature-img">
        <img src="/sylph-projects.png" alt="feature screenshot" />
      </div>
    </div>
  </section>

  <section class="download" name="download">
    <div>
      <h1>Download Sylph</h1>
    </div>
    <div class="app-option">
      <div class="app-version">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="6em"
          height="6em"
          fill="currentColor"
          class="bi bi-windows"
          viewBox="0 0 16 16"
          color="#714c8e"
        >
          <path
            d="M6.555 1.375 0 2.237v5.45h6.555V1.375zM0 13.795l6.555.933V8.313H0v5.482zm7.278-5.4.026 6.378L16 16V8.395H7.278zM16 0 7.33 1.244v6.414H16V0z"
          />
        </svg>
        <form
          action="https://github.com/oslabs-beta/Sylph/releases/download/v1.0.0-beta/Sylph.Setup.1.0.0.exe"
          method="get"
          target="_blank"
          class="DL-form"
        >
          <DownloadBtnDynamic OS={'Windows'} />
        </form>
      </div>
      <div class="app-version">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="6em"
          height="6em"
          fill="currentColor"
          class="bi bi-apple"
          viewBox="0 0 16 16"
          color="#714c8e"
        >
          <path
            d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z"
          />
          <path
            d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z"
          />
        </svg>
        <form
          action="https://github.com/oslabs-beta/Sylph/releases/download/v1.0.0-Beta-Mac/Sylph-1.0.0.dmg"
          method="get"
          target="_blank"
          class="DL-form"
        >
          <DownloadBtnDynamic OS={'Mac OS'} />
        </form>
      </div>
    </div>
  </section>
  <section class="dev-section">
    <h1>Sylph Contributors</h1>
    <div class="devs">
      <ContributorBlock
        devImg="https://media-exp1.licdn.com/dms/image/C4D03AQGA6GbnL7avug/profile-displayphoto-shrink_800_800/0/1631750855713?e=1639612800&v=beta&t=pbtoVQC0qc8Ap0n2dRDbj7qvyYN8fwVApYtQsZqu4Ks"
        name="Randy Diebold"
        linkedin="https://www.linkedin.com/in/randy-diebold-523802206/"
        github="https://github.com/Randy-diebold"
      />
      <ContributorBlock
        devImg="https://media-exp1.licdn.com/dms/image/C4D03AQFkBD1Q_j8AAw/profile-displayphoto-shrink_800_800/0/1563465185947?e=1639612800&v=beta&t=-8k7a0_FGR6M7eaQeMdNbfyLlD3DD0ETRNZSWAR5ipc"
        name="Kailee Pedersen"
        linkedin="https://www.linkedin.com/in/kaileepedersen/"
        github="https://github.com/kailee-p"
      />
      <ContributorBlock
        devImg="https://media-exp1.licdn.com/dms/image/C4E03AQEKSfkLzET2Dw/profile-displayphoto-shrink_800_800/0/1629157163376?e=1639612800&v=beta&t=Dr92AuQHcyoSBWiZSq1LgPTqkqmCSGjnKrUfHcCIcmE"
        name="Haobo Wang"
        linkedin="https://www.linkedin.com/in/haobowang225/"
        github="https://github.com/hwpanda"
      />
      <ContributorBlock
        devImg="https://media-exp1.licdn.com/dms/image/C4E03AQF499xOPl_xjQ/profile-displayphoto-shrink_800_800/0/1631916229559?e=1639612800&v=beta&t=lQ3b5BwuQETt64nYRZzq8SMzN3-c6wvPvIAFVDyD0wQ"
        name="Nick Andreala"
        linkedin="https://www.linkedin.com/in/nickandreala/"
        github="https://github.com/JovianDev"
      />
    </div>
  </section>
  <Footer />
</container>

<style>
  .about {
    display: flex;
    flex-direction: column;
    padding: 40px;
    justify-content: center;
    align-items: center;
    background-color: #282828;
    margin: 20px 10px;
    color: whitesmoke;
    border-radius: 15px;
  }
  .about-text {
    display: flex;
    flex-direction: column;
    width: 50%;
    font-size: 1.3em;
  }
  .about-head {
    font-size: 1.8em;
    font-weight: 700;
    margin-top: -30px;
  }
  .app-option {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: auto;
    margin-top: 50px;
    gap: 1em;
  }
  .app-version {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* width: 100%; */
    padding: 0;
    margin: 0;
  }
  .app-version svg {
    margin-bottom: 20px;
  }

  .dev-section {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 6em;
    background-color: #1e1e1e;
    width: 100%;
    height: 400px;
    margin: 30px 0 10px 0;
    border-radius: 30% 30% 0 0;
  }
  .dev-section h1 {
    color: whitesmoke;
    font-size: 2.5em;
    margin: 0;
    padding: 0;
  }
  .devs {
    display: grid;
    width: auto;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: inherit;
    margin: 0 0 40px 0;
  }
  .DL-form {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .download {
    width: 100%;
    height: 500px;
    margin: 0;
    background-color: #1e1e1e;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .download h1 {
    color: whitesmoke;
    font-weight: 800;
    font-size: 2em;
    padding-bottom: 50px;
  }

  .title-head {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: auto;
    background-color: #532b72;
    justify-content: center;
    padding: 30px;
    margin: 0 0 20px 0;
    border-radius: 0 0 15px 15px;
  }
  .title-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .title-img {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .title-img img {
    max-width: 100%;
    height: auto;
  }
  .main-container {
    background-color: #202040;
  }
  .title-text h1 {
    margin: 0;
    padding: 0;
    color: #ffeeaa;
    font-weight: 800;
    font-size: 3.3em;
  }
  .title-text h2 {
    margin: 0;
    padding: 0;
    color: whitesmoke;
    font-weight: 600;
    font-size: 2em;
  }
  .title-text p {
    margin: 0;
    padding: 0;
    color: darkgray;
    font-size: 1.3em;
    font-weight: 500;
  }
  .feature {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #282828;
    margin: 20px 10px;
    border-radius: 15px;
    box-shadow: -1rem 0 3rem #000;
  }
  .feature-discription {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    margin: 20px;
  }
  .feature-discription p {
    color: whitesmoke;
    font-size: 1.3em;
    width: 60%;
  }
  .feature-discription h2 {
    color: whitesmoke;
    font-size: 2em;
    font-weight: 700;
  }
  .feature-img {
    justify-content: center;
    align-items: center;
    width: 50%;
    margin: 0 20px;
  }
  .feature-img img {
    /* max-width: 100%;
    height: auto; */
    height: 350px;
    border-radius: 15px;
    padding: 30px;
    margin: 20x;
  }
  .feature-icon {
    width: 200px;
  }
  .yt-video {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    background-color: #1e1e1e;
  }
</style>
