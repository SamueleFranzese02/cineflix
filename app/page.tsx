import MovieGrid from "@/components/movie-grid";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params?.q || "harry potter";
  return <MovieGrid initialQuery={query} />;
}
