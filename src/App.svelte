<script context="module">
  export const prerender = true;
</script>

<script>
  import ContributorBlock from './components/contributorBlock.svelte';
  import Header from './components/header.svelte';
  import Footer from './components/footer.svelte';
  import DownloadBtn from './components/downloadBtn.svelte';
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
        <DownloadBtn OS={OS.name} />
      </form>
    </div>
    <div class="title-img">
      <img src="/sylph-screen.png" alt="sylph screen shot" />
    </div>
  </section>
  <section class="yt-video">
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/uK2RnIzrQ0M"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </section>
  <section class="features">
    <div class="feature">
      <div class="feature-discription">
        <img src="/dnd.png" alt="feature icon" class="feature-icon" />
        <h2>About</h2>
        <p>
          <strong><em>Sylph</em></strong> is a prototyping tool for Svelte web applications.
          With its convenient drag-and-drop interface, component customizer, real-time
          code preview, and real-time site preview, Sylph allows users to quickly
          prototype and develop the architecture of their Svelte applications.
        </p>
      </div>
      <div class="feature-img">
        <img src="/sylph-screen.png" alt="feature screenshot" />
      </div>
    </div>
    <div class="feature">
      <div class="feature-img">
        <img src="/sylph-screen.png" alt="feature screenshot" />
      </div>
      <div class="feature-discription">
        <img src="/dnd.png" alt="feature icon" class="feature-icon" />
        <h2>Svelte Prototyping, Reimagined</h2>
        <p>
          Harnessing the power of Electron, TypeScript, and Svelte, <strong
            ><em>Sylph</em></strong
          > provides an open-source solution for the fast-growing Svelte community's
          prototyping needs. Sylph is available for Mac and Windows operating systems.
        </p>
      </div>
    </div>
  </section>
  <section class="download">
    <div>
      <h1>Download Sylph</h1>
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
    background-color: #1e1e1e;
  }
  .download div {
    padding: 20px;
    margin: 40px;
  }
  .download h1 {
    color: whitesmoke;
    font-weight: 800;
  }
  .title-head {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: auto;
    background-color: #532b72;
    justify-content: center;
    padding: 30px;
    margin: 0 0 20px 0;
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
    color: darkgray;
    font-size: 1.3em;
  }
  .feature-discription h2 {
    color: whitesmoke;
    font-size: 2em;
    font-weight: 700;
  }
  .feature-img {
    justify-content: center;
    align-items: center;
  }
  .feature-img img {
    height: 300px;
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
