/**
 * Add the learn.pardofigueroa.org CNAME record to Cloudflare.
 *
 * Usage:
 *   CLOUDFLARE_API_TOKEN=... node scripts/dns_setup.js
 *
 * The token is read from env so it can be kept out of source control.
 * Get the token from the Cloudflare dashboard: My Profile → API Tokens.
 */
const domain = "pardofigueroa.org";
const subdomain = "learn";
const vercelCNAME = "cname.vercel-dns.com";

const token = process.env.CLOUDFLARE_API_TOKEN;
if (!token) {
  console.error(
    "Missing CLOUDFLARE_API_TOKEN env var. Get a token from the Cloudflare dashboard (My Profile → API Tokens) and export it before running."
  );
  process.exit(1);
}

async function main() {
  console.log(`Querying Cloudflare Zone ID for ${domain}...`);
  const zoneResponse = await fetch(
    `https://api.cloudflare.com/client/v4/zones?name=${domain}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const zoneData = await zoneResponse.json();
  if (!zoneData.success || zoneData.result.length === 0) {
    console.error("Failed to retrieve zone ID:", zoneData.errors);
    process.exit(1);
  }
  const zoneId = zoneData.result[0].id;
  console.log(`Zone ID: ${zoneId}`);

  // Check if record already exists
  console.log(`Checking for existing ${subdomain} record...`);
  const listResponse = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?name=${subdomain}.${domain}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const listData = await listResponse.json();
  const existing = listData.result.find(
    (r) => r.type === "CNAME" && r.name === `${subdomain}.${domain}`
  );

  if (existing) {
    console.log(`Record already exists (id=${existing.id}). Updating...`);
    const updateResponse = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${existing.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "CNAME",
          name: subdomain,
          content: vercelCNAME,
          ttl: 1,
          proxied: false,
        }),
      }
    );
    const updateData = await updateResponse.json();
    if (!updateData.success) {
      console.error("Failed to update:", updateData.errors);
      process.exit(1);
    }
    console.log("Updated:", updateData.result);
  } else {
    console.log(`Adding CNAME for ${subdomain}.${domain} → ${vercelCNAME}...`);
    const createResponse = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "CNAME",
          name: subdomain,
          content: vercelCNAME,
          ttl: 1,
          proxied: false,
        }),
      }
    );
    const createData = await createResponse.json();
    if (!createData.success) {
      console.error("Failed to create:", createData.errors);
      process.exit(1);
    }
    console.log("Created:", createData.result);
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
