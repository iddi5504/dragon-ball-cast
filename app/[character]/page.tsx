"use client";

import CharacterCard from "@/components/common/CharacterCard";
import ErrorCard from "@/components/common/ErrorCard";
import { translate } from "@/lib/translate";
import { Character } from "@/types/global";
import { useQuery } from "@tanstack/react-query";
import { Loader, TriangleAlertIcon } from "lucide-react";
import { refresh } from "next/cache";
import { useParams } from "next/navigation";

export default function CharacterPage() {
  const { character } = useParams();

  const characterId =
    typeof character === "string" ? Number(character) : undefined;

  const { data, isPending, error, refetch } = useQuery<Character>({
    queryKey: ["characters", character],
    queryFn: () => getCharacterById(characterId),
  });

  if (error) {
    return (
      <ErrorCard refresh={refetch} title="Could not fetch character details" />
    );
  }

  return (
    <div className="flex justify-center p-9 pt-10">
      {isPending ? (
        <Loader size={40} className="animate-spin m-auto" />
      ) : (
        data && <CharacterCard expand={true} character={data} />
      )}
    </div>
  );
}

const getCharacterById = async (id?: number): Promise<Character> => {
  const res = await fetch(`https://dragonball-api.com/api/characters/${id}`);
  const data = (await res.json()) as Character;
  const translation = translate(data.id.toString(), data.description);

  return {
    ...data,
    description: (await translation).translations[0].translated.join(" "),
  };
};
