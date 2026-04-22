export default function TeamPage() {
  const members = [
    { name: "Ethan Moskowitz", section: "Section 2" },
    { name: "Aidan Roche", section: "Section 2" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Team</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Members</h2>
        <ul className="list-disc pl-5">
          {members.map((m) => (
            <li key={m.name}>
              {m.name} — {m.section}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Repositories</h2>
        <ul className="list-disc pl-5">
          <li>
            <a
              href="https://github.com/EthanMoskowitz/kambaz-next-js"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Frontend Repository
            </a>
          </li>
          <li>
            <a
              href="https://github.com/EthanMoskowitz/kambaz-node-server-app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Server Repository
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
