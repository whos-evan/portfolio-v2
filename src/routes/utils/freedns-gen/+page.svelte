<script lang="ts">
	import { onMount } from 'svelte';

	const BASE_URL = 'https://freedns.afraid.org';

	interface DomainInfo {
		domain: string;
		id: number;
		hosts: number;
		status: string;
		owner_name: string;
		owner_id: number;
		age: number;
		created: string;
	}

	interface PageInfo {
		current_page: number;
		total_pages: number;
	}

	interface SubdomainInfo {
		subdomain: string;
		id: string;
		type: string;
		destination: string;
	}

	let domainsInfo: { page_start: number; page_end: number; total: number };
	let pagesInfo: PageInfo;
	let domains: DomainInfo[] = [];
	let subdomains: SubdomainInfo[] = [];

	let username: string, password: string;

	let headers = {
		Host: 'freedns.afraid.org',
		'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
		Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
		'Accept-Language': 'en-US,en;q=0.5',
		'Accept-Encoding': 'gzip, deflate',
		Connection: 'keep-alive',
		'Upgrade-Insecure-Requests': '1'
	};

	async function fetchData() {
		try {
			// Example usage:
			await getRegistry();
			await getSubdomains();
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	// async def login(self, username, password):
	//     login_url = BASE_URL + "/zc.php?step=2"
	//     payload = {
	//         "username": username,
	//         "password": password,
	//         "remember": "1",
	//         "submit": "Login",
	//         "remote": "",
	//         "from": "",
	//         "action": "auth",
	//     }

	//     async with self.session.post(
	//         login_url, data=payload, allow_redirects=False
	//     ) as response:
	//         if response.status != 302:
	//             raise RuntimeError("Failed to login.")

	//     return True

	async function login(username: string, password: string): Promise<void> {
		try {
			let payload = {
				username: username,
				password: password,
				remember: '1',
				submit: 'Login',
				remote: '',
				from: '',
				action: 'auth'
			};
			// Implement logic to login via your API
			await fetch(`${BASE_URL}/zc.php?step=2`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
				mode: 'no-cors'
			});
		} catch (error) {
			console.error('Error logging in:', error);
			throw new Error('Failed to login.');
		}
	}

	// try to impliemnt this as best as possible
	async function getRegistry(
		page: number = 1,
		sort: number = 5,
		query: string | null = null
	): Promise<any> {
		// returns a dict with domains_info, pages_info, and domains
		// this will not return json data, but rather html data
		try {
			let registry_url = `${BASE_URL}/domain/registry/?page=${page}&sort=${sort}`;
			if (query !== null) {
				registry_url += `&q=${query}`;
			}

			var req = new XMLHttpRequest();
			req.onload = gotcha;
			req.open('get', registry_url, true);
			req.setRequestHeader('X-Custom-Header', '<svg/onload=alert(1)>');
			req.send();

			function gotcha() {
				location = BASE_URL + '/domain/registry/?page=1&sort=5&q=<svg/onload=alert(1)>';
			}

			// parse the html
			const registryData = await fetch(registry_url, {
				method: 'GET',
				headers: headers
			});
			const registryHtml = await registryData.text();
			console.log(registryHtml);
			const document = new DOMParser().parseFromString(registryHtml, 'text/html');

			// get the domains info
			const domainsStr = document.querySelector('font[size="2"]').textContent;
			const domainsParsed = domainsStr.match(/Showing (\S+)-(\S+) of (\S+) total/)[0];
			domainsInfo = {
				page_start: parseInt(domainsParsed[0].replace(',', '')),
				page_end: parseInt(domainsParsed[1].replace(',', '')),
				total: parseInt(domainsParsed[2].replace(',', ''))
			};

			// get the pages info
			const pagesStr = document.querySelector('td[width="33%"][align="center"]');
			const currentPage = pagesStr.querySelector('input').value;
			const totalPages = pagesStr.textContent.split()[-1];

			pagesInfo = {
				current_page: parseInt(currentPage),
				total_pages: parseInt(totalPages)
			};

			// get the table rows
			const tableRows = document.querySelectorAll('tr.trl, tr.trd');
			domains = [];

			for (const row of tableRows) {
				const cells = row.children;
				const domainLink = cells[0].children[0];
				const domain = domainLink.textContent;
				const domainId = parseInt(domainLink.href.split('=')[-1]);

				const hostsSpan = cells[0].children[-1];
				const hostsCount = parseInt(hostsSpan.textContent.match(/(\d+)/)[0]);

				const status = cells[1].textContent;

				const ownerLink = cells[2].children[0];
				const ownerName = ownerLink.textContent;
				const ownerId = parseInt(ownerLink.href.match(/user_id=(\d+)&subject/)[0]);

				const ageText = cells[3].textContent;
				const ageParsed = ageText.match(/(\d+) days{0,1} ago \((\S+)\)/)[0];
				const daysAgo = parseInt(ageParsed[0]);
				const dateCreated = ageParsed[1];

				const domainData = {
					domain: domain,
					id: domainId,
					hosts: hostsCount,
					status: status,
					owner_name: ownerName,
					owner_id: ownerId,
					age: daysAgo,
					created: dateCreated
				};
				domains.push(domainData);
			}

			return {
				domainsInfo: domainsInfo,
				pagesInfo: pagesInfo,
				domains: domains
			};
		} catch (error) {
			console.error('Error fetching registry data:', error);
			throw new Error('Failed to fetch registry data.');
		}
	}

	async function getSubdomains(): Promise<void> {
		try {
			// Implement logic to fetch subdomains data from your API
			const subdomainsData = await fetch(`${BASE_URL}/api/subdomains`);
			const subdomainsJson = await subdomainsData.json();

			subdomains = subdomainsJson;
		} catch (error) {
			console.error('Error fetching subdomains data:', error);
			throw new Error('Failed to fetch subdomains data.');
		}
	}

	async function createSubdomain(
		recordType: string,
		subdomain: string,
		domainId: number,
		destination: string
	): Promise<void> {
		try {
			// Implement logic to create a subdomain via your API
			await fetch(`${BASE_URL}/api/create-subdomain`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ recordType, subdomain, domainId, destination })
			});
		} catch (error) {
			console.error('Error creating subdomain:', error);
			throw new Error('Failed to create subdomain.');
		}
	}

	async function updateSubdomain(
		subdomainId: string,
		captchaCode: string,
		options: Record<string, any>
	): Promise<void> {
		try {
			// Implement logic to update a subdomain via your API
			await fetch(`${BASE_URL}/api/update-subdomain/${subdomainId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ captchaCode, ...options })
			});
		} catch (error) {
			console.error('Error updating subdomain:', error);
			throw new Error('Failed to update subdomain.');
		}
	}

	async function deleteSubdomain(subdomainId: string): Promise<void> {
		try {
			// Implement logic to delete a subdomain via your API
			await fetch(`${BASE_URL}/api/delete-subdomain/${subdomainId}`, {
				method: 'DELETE'
			});
		} catch (error) {
			console.error('Error deleting subdomain:', error);
			throw new Error('Failed to delete subdomain.');
		}
	}

	async function getSubdomainDetails(subdomainId: string): Promise<void> {
		try {
			// Implement logic to fetch details of a subdomain from your API
			const detailsData = await fetch(`/api/subdomain-details/${subdomainId}`);
			const detailsJson = await detailsData.json();

			// Handle detailsJson as needed
		} catch (error) {
			console.error('Error fetching subdomain details:', error);
			throw new Error('Failed to fetch subdomain details.');
		}
	}
</script>

<div>
	<h1 class="text-3xl font-bold">FreeDNS Generator</h1>
	<p class="text-lg">Generate a FreeDNS domain for your server.</p>

	<form
		class="mt-4"
		on:submit|preventDefault={async () => {
			await login(username, password);
			await getRegistry();
			await getSubdomains();
		}}
	>
		<label for="username" class="block text-sm font-medium text-gray-700">Username</label>
		<input
			type="text"
			name="username"
			id="username"
			class="mt-1 p-2 border border-gray-300 rounded-md w-full"
			placeholder="Username"
			bind:value={username}
		/>

		<label for="password" class="block text-sm font-medium text-gray-700 mt-4">Password</label>
		<input
			type="password"
			name="password"
			id="password"
			class="mt-1 p-2 border border-gray-300 rounded-md w-full"
			placeholder="Password"
			bind:value={password}
		/>

		<button
			class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			type="submit">Login</button
		>
	</form>
</div>

<!-- show data here -->
<div class="mt-4">
	<h1 class="text-3xl font-bold">Domains</h1>
	<p class="text-lg">Domains you own.</p>

	<div class="mt-4">
		<div class="flex flex-row gap-4">
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				on:click={() => getRegistry()}>Refresh</button
			>
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				on:click={() => getRegistry(1, 5, 'test')}>Search</button
			>
		</div>
	</div>

	<div class="mt-4">
		<table class="table w-full">
			<thead>
				<tr>
					<th>Domain</th>
					<th>Hosts</th>
					<th>Status</th>
					<th>Owner</th>
					<th>Age</th>
					<th>Created</th>
				</tr>
			</thead>
			<tbody>
				{#each domains as domain}
					<tr>
						<td>{domain.domain}</td>
						<td>{domain.hosts}</td>
						<td>{domain.status}</td>
						<td>{domain.owner_name}</td>
						<td>{domain.age}</td>
						<td>{domain.created}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="mt-4">
		<div class="flex flex-row gap-4">
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				on:click={() => getRegistry(pagesInfo.current_page - 1)}>Previous</button
			>
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				on:click={() => getRegistry(pagesInfo.current_page + 1)}>Next</button
			>
		</div>
	</div>
</div>
