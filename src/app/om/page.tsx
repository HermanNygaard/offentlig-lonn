import { Heading } from "@/components/Heading";

export default function OmPage() {
  const timestamp = Date.now();

  return (
    <div className="container">
      <Heading>Om offentlig lønnsoversikt</Heading>
      <p className="mt-3">
        Lønnen er hentet fra offentlige jobbannonser. Om annonsen har flere
        lønnsnivåer (f.eks. junior og senior), vil det laveste og høyeste av
        alle nivå velges.
      </p>
      <p>
        Annonsespesifikk data er cachet via Next.js fetch-cache, og vil for nå
        aldri invalideres. Det vil si at om en annonse blir oppdatert med nytt
        lønnsnivå, vil ikke dette reflekteres i denne oversikten.
      </p>
      <p>
        Lønnoversikt sist oppdatert:{" "}
        {new Date(timestamp).toLocaleString("no-NB", {
          year: "numeric",
          month: "long",
          weekday: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
}
