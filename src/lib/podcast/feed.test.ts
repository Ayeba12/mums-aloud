import { describe, expect, it } from "vitest";
import { durationLabel, parseDuration, parseFeed } from "./feed";

const sample = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" version="2.0">
<channel>
  <title><![CDATA[Mama's Escape ]]></title>
  <description><![CDATA[<p>Real conversations, real mothers.</p>]]></description>
  <link>https://www.mumsaloud.com</link>
  <atom:link href="https://anchor.fm/s/x/podcast/rss" rel="self" type="application/rss+xml"/>
  <itunes:author>Bokun Imoukhuede</itunes:author>
  <itunes:image href="https://cdn.example.com/show.jpg"/>
  <item>
    <title><![CDATA[Episode 5 - Mama's Escape Introduction]]></title>
    <description><![CDATA[<p><strong>Summary:</strong><br />Where it all began &amp; why.</p>]]></description>
    <link>https://podcasters.spotify.com/pod/show/mamasescape/episodes/Episode-5</link>
    <guid isPermaLink="false">guid-5</guid>
    <pubDate>Sun, 11 May 2025 16:03:48 GMT</pubDate>
    <enclosure url="https://anchor.fm/s/x/podcast/play/5/audio.mp3" length="1" type="audio/mpeg"/>
    <itunes:duration>00:19:52</itunes:duration>
    <itunes:episode>5</itunes:episode>
    <itunes:season>1</itunes:season>
    <itunes:image href="https://cdn.example.com/ep5.jpg"/>
  </item>
  <item>
    <title><![CDATA[Episode 11: Thriving as a Father]]></title>
    <description><![CDATA[<p>Fatherhood is more than a job.</p>]]></description>
    <guid>guid-11</guid>
    <pubDate>Wed, 25 Jun 2025 08:08:00 GMT</pubDate>
    <enclosure url="https://anchor.fm/s/x/podcast/play/11/audio.mp3" length="1" type="audio/mpeg"/>
    <itunes:duration>2186</itunes:duration>
  </item>
  <item>
    <title>Broken item without a date</title>
  </item>
</channel>
</rss>`;

describe("parseFeed", () => {
  const podcast = parseFeed(sample);

  it("reads the show details, with CDATA and the channel link resolved", () => {
    expect(podcast.title).toBe("Mama's Escape");
    expect(podcast.link).toBe("https://www.mumsaloud.com");
    expect(podcast.author).toBe("Bokun Imoukhuede");
    expect(podcast.image).toBe("https://cdn.example.com/show.jpg");
    expect(podcast.description).toBe("Real conversations, real mothers.");
  });

  it("lists episodes newest first and drops items without a date", () => {
    expect(podcast.episodes.map((episode) => episode.id)).toEqual(["guid-11", "guid-5"]);
  });

  it("maps an episode's fields, with the summary as plain text", () => {
    const episode = podcast.episodes[1];
    expect(episode.title).toBe("Episode 5 - Mama's Escape Introduction");
    expect(episode.date).toBe("2025-05-11T16:03:48.000Z");
    expect(episode.durationSeconds).toBe(1192);
    expect(episode.summary).toBe("Summary: Where it all began & why.");
    expect(episode.link).toBe("https://podcasters.spotify.com/pod/show/mamasescape/episodes/Episode-5");
    expect(episode.audio).toEqual({ url: "https://anchor.fm/s/x/podcast/play/5/audio.mp3", type: "audio/mpeg" });
    expect(episode.image).toBe("https://cdn.example.com/ep5.jpg");
    expect(episode.number).toBe(5);
    expect(episode.season).toBe(1);
  });

  it("accepts a duration given in seconds", () => {
    expect(podcast.episodes[0].durationSeconds).toBe(2186);
  });
});

describe("durations", () => {
  it("parses the common forms", () => {
    expect(parseDuration("00:36:26")).toBe(2186);
    expect(parseDuration("36:26")).toBe(2186);
    expect(parseDuration("95")).toBe(95);
    expect(parseDuration("soon")).toBeUndefined();
    expect(parseDuration(undefined)).toBeUndefined();
  });

  it("labels durations for reading", () => {
    expect(durationLabel(2186)).toBe("36 min");
    expect(durationLabel(3720)).toBe("1 hr 2 min");
    expect(durationLabel(3600)).toBe("1 hr");
    expect(durationLabel(20)).toBe("1 min");
    expect(durationLabel(undefined)).toBeUndefined();
  });
});
