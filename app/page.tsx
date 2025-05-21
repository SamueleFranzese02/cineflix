import { MovieGrid, MovieGridSkeleton } from "@/components/movie-grid";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params?.q || "harry potter";
  return (
    <Suspense fallback={<MovieGridSkeleton />}>
      <MovieGrid initialQuery={query} />
    </Suspense>
  );
}
