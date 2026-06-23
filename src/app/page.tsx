import { HomeClient } from "./HomeClient";

type Props = {
  searchParams: Promise<{ p?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  return <HomeClient initialPathCode={params.p ?? null} />;
}
