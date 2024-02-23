<script lang="ts">
	import { fade } from 'svelte/transition';
	import Box from '$lib/components/Box.svelte';
</script>

<svelte:head>
	<title>evan - projects</title>
	<meta name="description" content="evan's projects" />
</svelte:head>

<h1 class="text-4xl font-bold text-center mt-6">projects/work stuff</h1>

<div
	class="mt-6 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 w-fit mx-auto gap-4 justify-center items-center"
	transition:fade={{ duration: 250 }}
>
	<Box headingText="info" content="just some projects i've worked on." />
	<Box
		headingText="kazwire"
		hrefURL="https://kazwire.com"
		content="massive game site along with a proxy to let students have unfiltered access to the internet."
		imageURL="/screenshots/kazwire.png"
	/>
	<Box
		headingText="ubg us"
		hrefURL="https://ubgus.net"
		content="another game site, but this one was focused on ease of customizability along with an account system."
		imageURL="/screenshots/ubgus.png"
	/>
	<Box
		headingText="elixir"
		hrefURL="https://github.com/whos-evan/elixir"
		content="first proxy i made that let students have unfiltered access to the internet."
		imageURL="https://socialify.git.ci/whos-evan/elixir/image?description=1&descriptionEditable=Beautiful%20proxy%20made%20using%20Tailwind%20CSS%2C%20Ultraviolet%20and%20bare-server!%20&forks=1&issues=1&logo=https%3A%2F%2Fraw.githubusercontent.com%2Fwhos-evan%2Felixir%2Fmain%2Fimages%2Flogo.svg&name=1&owner=1&pattern=Solid&pulls=1&stargazers=1&theme=Dark"
	/>
	<Box
		headingText="interstellar"
		hrefURL="https://gointerstellar.app"
		content="helped with the deployment of interstellar keeping in mind tight budget constraints and security."
		imageURL="/screenshots/interstellar.png"
	/>
</div>
