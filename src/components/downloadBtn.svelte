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
		width: 50%;
		background-color: #9476AB;
		border-radius: 5px;
		border:none;
		margin: 10px;
		color: whitesmoke;
		font-weight: 700;
		box-shadow: 5px 5px 2px 2px rgba(55, 55, 55, 0.5);
	}
	.download-btn:hover {
		background-color: #ffeeaa;
		color: #220439;
		box-shadow: inset 8px 10px 10px 1px rgba(0,0,0,0.5);
	}
</style>
