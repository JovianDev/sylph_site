<script>
  // import { page } from '$app/stores';
  import DownloadBtn from './downloadBtn.svelte';
  import UAParser from 'ua-parser-js';
  let OS;
  let sylphVersion;
  let parser = new UAParser();

  OS = parser.getOS();

  if (OS?.name === 'Mac OS') {
    sylphVersion =
      'https://github.com/oslabs-beta/Sylph/releases/download/v1.0.0-MacOS/Sylph-1.0.0.dmg';
  }
  if (OS?.name === 'Windows') {
    sylphVersion =
      'https://github.com/oslabs-beta/Sylph/releases/download/v1.0.0-testing/Sylph.Setup.1.0.0.exe';
  }
</script>

<header>
  <img src="/sylphLogoPossibility.png" alt="Sylph logo" />
  <nav>
    <ul>
      <!-- <li class:active={$page.path === '/'}>
				<a href="/">Home</a>
			</li>
			<li class:active={$page.path === '/about'}>
				<a href="/about">About</a>
			</li>
			<li class:active={$page.path === '/docs'}>
				<a href="/docs">Docs</a>
			</li> -->
    </ul>
  </nav>
  <div class="dl-btn">
    <a href="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        class="bi bi-github"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
        />
      </svg>
    </a>
  </div>
</header>

<style>
  header {
    margin: 0;
    padding: 0;
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #220439;
  }
  nav {
    margin: 0;
    padding: 0;
  }
  ul {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    list-style: none;
  }
  li {
    text-decoration: none;
  }
  img {
    height: 50px;
    padding: 10px;
  }
  a {
    text-decoration: none;
    color: whitesmoke;
    font-size: 1.5em;
  }
  .active {
    border-bottom: 2px solid #ffeeaa;
  }
  .dl-btn {
    padding-right: 10px;
  }
</style>
