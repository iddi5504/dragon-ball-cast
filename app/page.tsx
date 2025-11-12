"use client";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, Character } from "@/types/global";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import CharacterCard from "@/components/common/CharacterCard";
import { useRouter, useSearchParams } from "next/navigation";
import { translate } from "@/lib/translate";

export default function Home() {
  const router = useRouter();
  const search = useSearchParams();
  const page = search.get("page");
  const { data, isPending } = useQuery<ApiResponse<Character>>({
    queryKey: ["characters", page],
    queryFn: () => fetchCharacters(page as string),
  });

  const goToPage = (path: string) => {
    console.log(path);
    const url = new URL(path);
    router.push(`?page=${url.searchParams.get("page")}`, {
      scroll: true,
    });
  };

  return (
    <div className="min-h-screen py-10">
      <h1 className="text-3xl text-purple-600 font-bold text-center mb-10">
        Dragon Ball Characters
      </h1>

      {isPending && (
        <div className="flex justify-center items-center h-96">
          <Loader size={50} className="animate-spin text-purple-500" />
        </div>
      )}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-20"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {data?.items.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </motion.div>

      {/* pagination */}

      <div className="flex gap-2 justify-center mt-4">
        {data?.links &&
          Object.entries(data.links).map(
            ([key, value]) =>
              value?.includes("page") && (
                <button
                  key={key}
                  onClick={() => goToPage(value)}
                  className="px-3 py-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {key}
                </button>
              )
          )}
      </div>
    </div>
  );
}

const fetchCharacters = async (page: string) => {
  const res = await fetch(
    `https://dragonball-api.com/api/characters?page=${page}`,
    {
      method: "get",
    }
  );

  const data = (await res.json()) as ApiResponse<Character>;

  return data;
};
