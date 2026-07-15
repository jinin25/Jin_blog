import satori from "satori";
import sharp from "sharp";
import icon from "$public/favicon.svg?raw";
import { loadFont } from ".";

function escapeXml(value: string) {
	return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

async function fallbackImage({ title, description, author }: { title: string; description: string; author: string }) {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
		<rect width="1200" height="630" fill="#fffffd"/>
		<text x="600" y="255" text-anchor="middle" font-family="serif" font-size="76" font-weight="700" fill="#1a1a1a">${escapeXml(title)}</text>
		<text x="600" y="330" text-anchor="middle" font-family="serif" font-size="30" fill="#666">${escapeXml(description)}</text>
		<text x="600" y="450" text-anchor="middle" font-family="serif" font-size="28" fill="#666">${escapeXml(author)}</text>
	</svg>`;

	return sharp(Buffer.from(svg)).resize(1200).png().toBuffer();
}

/*
<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", background: "#fffffd" }}>
	<img src={`data:image/svg+xml;base64,${Buffer.from(icon).toString("base64")}`} alt="LOGO" width={120} height={120} />
	<span style={{ fontSize: "4rem", fontWeight: 900, color: "#1a1a1a", textAlign: "center" }}>{title}</span>
	<span style={{ fontSize: "1.75rem", color: "#888888", textAlign: "center", maxWidth: "75%" }}>{description}</span>
	<span style={{ marginTop: "3rem", borderBottom: "2px solid", padding: "0 0.5rem", fontSize: "1.5rem", color: "#666666" }}>{author}</span>
</div>
*/

export default async ({ locale, title, description, author }: { locale: string; title: string; description: string; author: string }) => {
	try {
		const svg = await satori(
			{
				type: "div",
				props: {
					style: {
						width: "100%",
						height: "100%",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						gap: "1.5rem",
						background: "#fffffd"
					},
					children: [
						{
							type: "img",
							props: {
								src: `data:image/svg+xml;base64,${Buffer.from(icon).toString("base64")}`,
								alt: "LOGO",
								width: 120,
								height: 120
							}
						},
						{
							type: "span",
							props: {
								style: {
									fontSize: "4rem",
									fontWeight: 900,
									color: "#1a1a1a",
									textAlign: "center"
								},
								children: title
							}
						},
						{
							type: "span",
							props: {
								style: {
									fontSize: "1.75rem",
									color: "#888888",
									textAlign: "center",
									maxWidth: "75%"
								},
								children: description
							}
						},
						{
							type: "span",
							props: {
								style: {
									marginTop: "3rem",
									borderBottom: "2px solid",
									padding: "0 0.5rem",
									fontSize: "1.5rem",
									color: "#666666"
								},
								children: author
							}
						}
					]
				}
			},
			{
				width: 1200,
				height: 630,
				fonts: [
					{
						name: "Serif",
						data: await loadFont(locale)
					}
				]
			}
		);

		return sharp(Buffer.from(svg)).resize(1200).png().toBuffer();
	} catch {
		console.warn("Falling back to simple Open Graph image because the font-backed renderer failed.");
		return fallbackImage({ title, description, author });
	}
};
