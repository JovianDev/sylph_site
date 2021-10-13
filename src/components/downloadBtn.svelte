<script context="module">
	export const prerender = true;
</script>

<script>
	export let OS;
</script>

<button class="download-btn">
	<i class="fa fa-download" />
	<span>
		{`Download for ${OS}`}
	</span>
</button>

<style>
	.download-btn {
		height: 3em;
		width: auto;
		background-color: #714c8e;
		border-radius: 5px;
		margin: 10px;
		color: whitesmoke;
		font-weight: 700;
	}
	.download-btn:hover {
		background-color: #ffeeaa;
		color: #220439;
	}
</style>
