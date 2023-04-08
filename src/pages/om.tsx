import { Heading } from "@/components/Heading";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export default function Om({
  timestamp,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="container">
      <Heading>Om offentlig lønnsoversikt</Heading>
      <p className="mt-3">
        Lønnen er hentet fra offentlige jobbannonser. Om annonsen har flere
        lønnsnivåer (f.eks. junior og senior), vil det laveste og høyeste av
        alle nivå velges.
      </p>
      <p>
        Annonsespesifikk data er cachet i Redis, og vil for nå aldri
        invalideres. Det vil si at om en annonse blir oppdatert med nytt
        lønnsnivå, vil ikke dette reflekteres i denne oversikten. Nettsiden
        oppdateres én gang daglig.
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

export const getStaticProps: GetStaticProps<{
  timestamp: number;
}> = async () => {
  return {
    props: {
      timestamp: Date.now(),
    },
    // Revalidate daily
    revalidate: 60 * 60 * 24,
  };
};
