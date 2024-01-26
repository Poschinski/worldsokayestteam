<script lang="ts">
	export let riotId: string;
	export let role: string;

	let res: Promise<any> | null = sendData();

	async function sendData() {
		res = await fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				riotId
			})
		}).then(async (res) => {
			const ress = await res.json();
			return ress;
		});
		return res;
	}

</script>

{#await res}
	<p>loading...</p>
{:then response}
	<div class="card">
		<h3>{riotId}</h3>
		<p>{role}</p>
        <div class="solo-q">
			{#if response.data[1] == null || response.data[1] == undefined}
			<div class="left-side">
				<img src="/img/unranked.webp" alt="league rank"/>
			</div>
			<div class="right-side">
				<h3>Solo-Q</h3>
				<p>Unranked</p>
			</div>
			{:else}
			<div class="left-side">
				<img src="/img/{(response.data[1].tier).toLowerCase()}.png" alt="league rank"/>
			</div>
			<div class="right-side">
				<h3>Solo-Q</h3>
				<p>{response.data[1].tier} {response.data[1].rank}</p>
				<p>Winrate: {Math.round((response.data[1].wins / (response.data[1].wins + response.data[1].losses))*1000) /10} %</p>
			</div>
			{/if}
		</div>
        <div class="flex-q">
			<div class="left-side">
				<img src="/img/{(response.data[0].tier).toLowerCase()}.png" alt="league rank"/>
			</div>
			<div class="right-side">
				<h3>Flex-Q</h3>
                {#if response.data[0] == null || response.data[0] == undefined}
				<p>Unranked</p>
                {:else}
                <p>{response.data[0].tier} {response.data[0].rank}</p>
				<p>Winrate: {Math.round((response.data[0].wins / (response.data[0].wins + response.data[0].losses))*1000) /10} %</p>
                {/if}
			</div>
		</div>
	</div>
{:catch error}
	<p>{error.message}</p>
{/await}

<style>
	.card {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		transition: 0.3s;
		border-radius: 5px;
		padding: 20px;
		margin: 10px;
		background-color: #f5f5f5;
		width: 300px;
	}
	.card h3 {
		color: #333;
		font-size: 24px;
	}
	.card p {
		color: #666;
		font-size: 18px;
	}
	.solo-q,
	.flex-q {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}
	.left-side,
	.right-side {
		flex-basis: 50%;
	}
	.right-side {
		text-align: right;
	}
</style>
