import { json } from "@sveltejs/kit";
import { parseHTML } from "linkedom";

// Python function for ref
// async def get_registry(self, page=1, sort=5, query=None):
//         registry_url = BASE_URL + f"/domain/registry/?page={page}&sort={sort}"
//         if query is not None:
//             registry_url += f"&q={query}"

//         async with self.session.get(registry_url) as response:
//             html = await response.text()
//             document = lxml.html.fromstring(html)

//             domains_str = document.cssselect('font[size="2"]')[0].text_content()
//             domains_parsed = re.findall(
//                 r"Showing (\S+)-(\S+) of (\S+) total", domains_str
//             )[0]
//             domains_info = {
//                 "page_start": int(domains_parsed[0].replace(",", "")),
//                 "page_end": int(domains_parsed[1].replace(",", "")),
//                 "total": int(domains_parsed[2].replace(",", "")),
//             }

//             pages_str = document.cssselect('td[width="33%"][align="center"]')[0]
//             current_page = pages_str.cssselect("input")[0].get("value")
//             total_pages = pages_str.text_content().split()[-1]
//             pages_info = {
//                 "current_page": int(current_page),
//                 "total_pages": int(total_pages),
//             }

//             table_rows = document.cssselect("tr.trl, tr.trd")
//             domains = []
//             for row in table_rows:
//                 cells = row.getchildren()
//                 domain_link = cells[0].getchildren()[0]
//                 domain = domain_link.text_content()
//                 domain_id = int(domain_link.get("href").split("=")[-1])

//                 hosts_span = cells[0].getchildren()[-1]
//                 hosts_count = int(re.findall(r"(\d+)", hosts_span.text_content())[0])

//                 status = cells[1].text_content()

//                 owner_link = cells[2].getchildren()[0]
//                 owner_name = owner_link.text_content()
//                 owner_id = int(
//                     re.findall(r"user_id=(\d+)&subject", owner_link.get("href"))[0]
//                 )

//                 age_text = cells[3].text_content()
//                 age_parsed = re.findall(r"(\d+) days{0,1} ago \((\S+)\)", age_text)[0]
//                 days_ago = int(age_parsed[0])
//                 date_created = age_parsed[1]

//                 domain_data = {
//                     "domain": domain,
//                     "id": domain_id,
//                     "hosts": hosts_count,
//                     "status": status,
//                     "owner_name": owner_name,
//                     "owner_id": owner_id,
//                     "age": days_ago,
//                     "created": date_created,
//                 }
//                 domains.append(domain_data)

//             return {
//                 "domains_info": domains_info,
//                 "pages_info": pages_info,
//                 "domains": domains,
//             }

export async function GET({ url }) {
    const page = url.searchParams.get("page") || 1;
    const sort = url.searchParams.get("sort") || 5;
    const query = url.searchParams.get("query") || null;

    let response: Response;
    if (query !== null) {
        response = await fetch(`https://freedns.afraid.org/domain/registry/?page=${page}&sort=${sort}&q=${query}`);
    } else {
        response = await fetch(`https://freedns.afraid.org/domain/registry/?page=${page}&sort=${sort}`);
    }

    const html = await response.text();
    const { document } = parseHTML(html);

    // grab the table
    const table = document.querySelector("table[border='0'][width='90%']");
    if (table === null) {
        return new Response("Error: Could not find table");
    }
    // go through each row
    const rows = table.querySelectorAll("tr.trl, tr.trd");
    const domains = [];
    for (const row of rows) {
        const cells = row.children;
        const domainLink = cells[0].querySelector("a");
        const domain = domainLink.textContent;
        const domainId = domainLink.href.split("=")[1];

        const hostsSpan = cells[0].querySelector("span");
        const hostsCount = parseInt(hostsSpan.textContent.match(/\d+/)[0]);

        const status = cells[1].textContent;

        const ownerLink = cells[2].querySelector("a");
        const ownerName = ownerLink.textContent;
        const ownerId = ownerLink.href.match(/user_id=(\d+)&subject/)[1];

        const ageText = cells[3].textContent;
        const ageParsed = ageText.match(/(\d+) days{0,1} ago \((\S+)\)/);
        const daysAgo = parseInt(ageParsed[1]);
        const dateCreated = ageParsed[2];

        domains.push({
            domain,
            id: domainId,
            hosts: hostsCount,
            status,
            owner_name: ownerName,
            owner_id: ownerId,
            age: daysAgo,
            created: dateCreated
        });
    }

    return json(domains);
}
