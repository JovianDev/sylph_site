<script>
  let active;
</script>

<header>
  <div class="sylph-logo">
    <img src="/sylph-mac-icon.png" alt="Sylph logo" />
    <p>Sylph</p>
  </div>

  <nav>
    <ul>
      <!-- <li>
        <a href="#download">Home</a>
      </li>
      <li class:active={something === '/about'}>
        <a href="/about">About</a>
      </li>
      <li class:active={something === '/docs'}>
        <a href="/docs">Docs</a>
      </li> -->
    </ul>
  </nav>
  <div class="header-right">
    <a href="https://github.com/oslabs-beta/Sylph" target="_blank">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        class="bi bi-github"
        viewBox="0 0 16 16"
        color="#ffeeaa"
      >
        <path
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
        />
      </svg>
    </a>
    <a
      href="https://medium.com/@sylph.dev.team/sylph-the-svelte-prototyper-f89f20984d4"
      target="_blank"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        class="bi bi-medium"
        viewBox="0 0 16 16"
        color="#ffeeaa"
      >
        <path
          d="M9.025 8c0 2.485-2.02 4.5-4.513 4.5A4.506 4.506 0 0 1 0 8c0-2.486 2.02-4.5 4.512-4.5A4.506 4.506 0 0 1 9.025 8zm4.95 0c0 2.34-1.01 4.236-2.256 4.236-1.246 0-2.256-1.897-2.256-4.236 0-2.34 1.01-4.236 2.256-4.236 1.246 0 2.256 1.897 2.256 4.236zM16 8c0 2.096-.355 3.795-.794 3.795-.438 0-.793-1.7-.793-3.795 0-2.096.355-3.795.794-3.795.438 0 .793 1.699.793 3.795z"
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
  /* .active {
    border-bottom: 2px solid #ffeeaa;
  } */
  .header-right {
    display: flex;
    padding-right: 20px;
    color: #ffeeaa;
    gap: 1em;
  }
  .sylph-logo {
    display: flex;
    align-items: center;
    color: #ffeeaa;
    font-size: 2em;
    font-weight: 900;
  }
</style>
