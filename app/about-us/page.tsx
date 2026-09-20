import Link from "next/link";

import { Actions, PageShell, Section, pageMetadata } from "../_components/SubpageShell";
import styles from "./about.module.css";

export const metadata = pageMetadata(
  "About Dr Neil Hamson | Computer Scientist & Software Engineer",
  "Dr Neil Hamson is a computer scientist and software engineer. Read about his Computing BSc (Hons), Computer Science PhD, and work on game updates, application security and research software.",
  "/about-us",
);

const profilePageStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://hamson.tech/about-us#profilepage",
  url: "https://hamson.tech/about-us",
  name: "About Dr Neil Hamson",
  mainEntity: {
    "@type": "Person",
    "@id": "https://hamson.tech/#person",
    name: "Dr Neil Hamson",
    url: "https://hamson.tech/about-us",
    description:
      "Dr Neil Hamson is a computer scientist and software engineer whose work includes software patches, application maintenance, security fixes and research-led development.",
  },
};

const work = [
  {
    number: "01",
    place: "SHENZHEN / GAME SOFTWARE",
    title: "LEAGUE OF LEGENDS",
    description: "While based in Shenzhen, Neil worked directly with Tencent Games on League of Legends patches. His work covered coding and implementing changes, testing, and supporting integration through the delivery process. Riot Games developed League of Legends; Neil’s contribution was patch work with Tencent Games in China.",
    tags: ["PATCH DEVELOPMENT", "TESTING", "INTEGRATION"],
  },
  {
    number: "02",
    place: "SHENZHEN / APPLICATION SOFTWARE",
    title: "WECHAT / WEIXIN",
    description: "Neil also worked on application updates for WeChat, known in China as Weixin. His contribution included maintenance releases and security fixes: implementing changes, testing updates and supporting their integration into the release process.",
    tags: ["APPLICATION UPDATES", "SECURITY FIXES", "RELEASES"],
  },
  {
    number: "03",
    place: "DUBAI / DOCTORAL WORK-BASED RESEARCH",
    title: "EMIRATES MARS MISSION",
    description: "During work-based research supporting his PhD, Neil undertook software work in Dubai connected with the Emirates Mars Mission and Hope Probe. He worked on guidance-system software using C, C# and C++.",
    tags: ["GUIDANCE SOFTWARE", "C", "C#", "C++"],
  },
] as const;

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="COMPUTER SCIENTIST / SOFTWARE ENGINEER"
      title="DR NEIL HAMSON"
      lede={<p>I work on software that must be implemented, tested and integrated into a larger system. My background spans game patch delivery, application maintenance, security fixes and research-led engineering. Today I am developing MI1 and taking enquiries for clearly scoped software projects.</p>}
      compactHero
      accent="blue"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profilePageStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Section
        label="ACADEMIC FOUNDATION"
        title="COMPUTING AND RESEARCH"
        intro={<p>I hold a Computing BSc (Hons) from UHI Perth, part of the University of the Highlands and Islands partnership, and a PhD in Computer Science from the University of Liverpool.</p>}
      >
        <div className={styles.qualifications}>
          <div><span>01 / UNDERGRADUATE</span><strong>Computing BSc (Hons)</strong><p>UHI Perth · University of the Highlands and Islands</p></div>
          <div><span>02 / DOCTORAL</span><strong>PhD in Computer Science</strong><p>University of Liverpool</p></div>
        </div>
      </Section>

      <Section
        label="SELECTED EXPERIENCE"
        title="CODE IN REAL DELIVERY SYSTEMS"
        intro={<p>These examples describe the contribution and technical work, rather than using the names of organisations as a substitute for detail.</p>}
      >
        <div className={styles.work}>
          {work.map(({ number, place, title, description, tags }) => (
            <article key={number} className={styles.project}>
              <div className={styles.projectHeading}><span>{number} / {place}</span><h3>{title}</h3></div>
              <div><p>{description}</p><div className={styles.tags}>{tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        label="CURRENT ENGINEERING"
        title="MI1 AND SOFTWARE PROJECTS"
        intro={<p>I am developing MI1, a private Machine Intelligence prototype for human-reviewed code changes. Its implementation and remaining verification work are described on the dedicated MI1 page. For other software engineering work, projects start with a defined problem, scope and intended result.</p>}
        narrow
      >
        <Actions>
          <Link className="brand-button brand-button-secondary" href="/machine-intelligence">EXPLORE MI1</Link>
          <Link className="brand-button brand-button-primary" href="/services">DISCUSS SOFTWARE WORK</Link>
        </Actions>
      </Section>
    </PageShell>
  );
}
