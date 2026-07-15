import satori from "satori";
import sharp from "sharp";
import icon from "$public/favicon.svg?raw";
import { loadFont } from ".";

function escapeXml(value: string) {
	return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

async function fallbackImage({
	type,
	site,
	author,
	title,
	time,
	series,
	tags
}: {
	type: string;
	site: string;
	author: string;
	title: string;
	time: string;
	series?: string;
	tags?: string[];
}) {
	const meta = [time, series, ...(tags ?? []).map(tag => `#${tag}`)].filter(Boolean).join("  /  ");
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
		<rect width="1200" height="630" fill="#fffffd"/>
		<rect x="72" y="72" width="8" height="54" fill="#111"/>
		<text x="100" y="112" font-family="serif" font-size="32" fill="#111">${escapeXml(type)}</text>
		<text x="72" y="300" font-family="serif" font-size="70" font-weight="700" fill="#111">${escapeXml(title)}</text>
		<text x="72" y="380" font-family="serif" font-size="28" fill="#555">${escapeXml(meta)}</text>
		<line x1="72" y1="485" x2="1128" y2="485" stroke="#111" stroke-width="6"/>
		<text x="72" y="555" font-family="serif" font-size="34" fill="#111">${escapeXml(site)}</text>
		<text x="1128" y="555" text-anchor="end" font-family="serif" font-size="28" fill="#333">${escapeXml(author)}</text>
	</svg>`;

	return sharp(Buffer.from(svg)).resize(1200).png().toBuffer();
}

/*
<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "3rem", width: "100%", height: "100%", background: "#fffffd" }}>
	<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flexGrow: 1 }}>
		<span style={{ alignSelf: "flex-start", borderLeft: "0.5rem solid black", padding: "0.25rem 1rem 0.75rem", fontSize: "1.5rem" }}>
			{contentType}
			{series && (
				<span>
					<span style={{ padding: "0 0.5rem" }}>·</span>
					{series}
				</span>
			)}
		</span>
		<span style={{ fontSize: "4rem" }}>{title}</span>
		<div style={{ display: "flex", gap: "1rem", alignItems: "center", fontSize: "1.25rem", color: "#555555" }}>
			<time>{time}</time>
			{!!tags?.length && [
				<span key="separator" style={{ height: "100%", borderLeft: "0.125rem solid" }} />,
				tags.map(tag => <span key={tag}>#{tag}</span>)
			]}
		</div>
	</div>
	<hr style={{ margin: "2.5rem 0 2rem", borderTop: "0.25rem solid black" }} />
	<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
		<div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
			<img src={`data:image/svg+xml;base64,${Buffer.from(icon).toString("base64")}`} alt="LOGO" height={48} />
			<span style={{ fontSize: "2rem" }}>{site}</span>
		</div>
		<div style={{ fontSize: "1.5rem" }}>{author}</div>
	</div>
</div>
*/

export default async ({
	locale,
	type,
	site,
	author,
	title,
	time,
	series,
	tags
}: {
	locale: string;
	type: string;
	site: string;
	author: string;
	title: string;
	time: string;
	series?: string;
	tags?: string[];
}) => {
	try {
		const svg = await satori(
			{
				type: "div",
				props: {
					style: {
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						padding: "3rem",
						width: "100%",
						height: "100%",
						background: "#fffffd"
					},
					children: [
						{
							type: "div",
							props: {
								style: {
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									flexGrow: 1
								},
								children: [
									{
										type: "span",
										props: {
											style: {
												alignSelf: "flex-start",
												borderLeft: "0.5rem solid black",
												padding: "0.25rem 1rem 0.75rem",
												fontSize: "1.5rem"
											},
											children: [
												type,
												series
													? {
															type: "span",
															props: {
																children: [
																	{
																		type: "span",
																		props: {
																			style: { padding: "0 0.5rem" },
																			children: "·"
																		}
																	},
																	series
																]
															}
														}
													: null
											]
										}
									},
									{
										type: "span",
										props: {
											style: { fontSize: "4rem" },
											children: title
										}
									},
									{
										type: "div",
										props: {
											style: {
												display: "flex",
												gap: "1rem",
												alignItems: "center",
												fontSize: "1.25rem",
												color: "#555555"
											},
											children: [
												{
													type: "time",
													props: { children: time }
												},
												...(tags?.length
													? [
															{
																type: "span",
																key: "separator",
																props: {
																	style: {
																		height: "100%",
																		borderLeft: "0.125rem solid"
																	}
																}
															},
															...tags.map(tag => ({
																type: "span",
																key: tag,
																props: { children: `#${tag}` }
															}))
														]
													: [])
											]
										}
									}
								]
							}
						},
						{
							type: "hr",
							props: {
								style: {
									margin: "2.5rem 0 2rem",
									borderTop: "0.25rem solid black"
								}
							}
						},
						{
							type: "div",
							props: {
								style: {
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between"
								},
								children: [
									{
										type: "div",
										props: {
											style: {
												display: "flex",
												alignItems: "center",
												gap: "1rem"
											},
											children: [
												{
													type: "img",
													props: {
														src: `data:image/svg+xml;base64,${Buffer.from(icon).toString("base64")}`,
														alt: "LOGO",
														height: 48
													}
												},
												{
													type: "span",
													props: {
														style: { fontSize: "2rem" },
														children: site
													}
												}
											]
										}
									},
									{
										type: "div",
										props: {
											style: { fontSize: "1.5rem" },
											children: author
										}
									}
								]
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
		return fallbackImage({ type, site, author, title, time, series, tags });
	}
};
