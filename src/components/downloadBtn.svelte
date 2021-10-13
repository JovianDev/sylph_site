<script context="module">
	export const prerender = true;
</script>

<script>
	export let OS;
	
</script>

<button class="download-btn">
	{`Download for ${OS}`}
	
	<span>
		<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" class="bi bi-cloud-arrow-down-fill" viewBox="0 0 16 16">
			<path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z"/>
		  </svg>
	</span>
</button>

<style>
	.download-btn {
		display:flex;
		align-items: center;
		justify-content: center;
		gap:10px;
		height: 3em;
		width: 50%;
		background-color: #9476AB;
		border-radius: 30px;
		border:none;
		margin: 10px;
		color: whitesmoke;
		font-size: 1.2em;
		font-weight: 700;
		box-shadow: 5px 5px 2px 2px rgba(55, 55, 55, 0.5);
	}
	.download-btn:hover {
		background-color: #ffeeaa;
		color: #220439;
		box-shadow: inset 8px 10px 10px 1px rgba(0,0,0,0.5);
	}
</style>
