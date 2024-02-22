<script lang="ts">
	import { fade } from 'svelte/transition';
	import Box from '$lib/components/Box.svelte';

	import Icon from '@iconify/svelte';
</script>

<svelte:head>
	<title>evan - recommendations</title>
	<meta name="description" content="evan's recommendations" />
</svelte:head>

<h1 class="text-4xl font-bold text-center mt-6">recommendations :)</h1>

<div
	class="mt-6 flex flex-col gap-4 justify-center items-center"
	transition:fade={{ duration: 250 }}
>
	<Box headingText="info" content="just some general recommendations." />
	<!-- protonmail -->
	<Box
		headingText="email"
		hrefURL="https://protonmail.com"
		content="protonmail is a secure email service thats pretty cheap and supports custom domains and catch-all addresses."
	/>

	<!-- brave -->
	<Box
		headingText="browser"
		hrefURL="https://brave.com"
		content="brave is a 'privacy focused' browser that blocks ads and trackers by default. tbh it has tons of annoying crypto stuff but its still a good browser."
	/>

    <!-- bitwarden -->
    <Box
        headingText="password manager"
        hrefURL="https://bitwarden.com"
        content="bitwarden is a free and open-source password manager that has a good browser extension and mobile app."
    />

    <!-- protonvpn -->
    <Box
        headingText="vpn"
        hrefURL="https://protonvpn.com"
        content="protonvpn is a secure vpn service that has a really nice free tier and a good paid tier."
    />

    <!-- signal -->
    <Box
        headingText="messaging"
        hrefURL="https://signal.org"
        content="signal is a secure messaging app that has a good desktop app and a good mobile app. i really wish more of my friends used it."
    />

    <!-- operating system -->
    <Box
        headingText="operating system"
        content="windows 11, linux mint, and macos are all good operating systems. i use windows 11 because i cannot be bothered to troubleshoot games on linux."
    /> 
</div>
