"use client";
import { Character } from "@/types/global";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function CharacterCard({
  character,
  expand,
}: {
  character: Character;
  expand?: boolean;
}) {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState<string>(character.image);

  return (
    <motion.div
      onClick={() => router.push(`/${character.id}`)}
      className={clsx(
        "bg-white flex flex-col rounded-xl shadow-md p-4 cursor-pointer",
        {
          "lg:flex-row max-w-5xl w-full": expand,
          "md:max-w-sm w-full": !expand,
        }
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.div
        className={clsx("relative rounded-lg w-full overflow-hidden", {
          "h-64": !expand,
          "h-[500px]": expand,
        })}
        layout
      >
        <AnimatePresence mode="wait">
          {currentImage && (
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={currentImage}
                alt={character.name}
                fill
                className="object-contain m-auto rounded-lg"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="mt-4 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold">{character.name}</h2>
        <p className="text-gray-600">
          {character.race} • {character.gender}
        </p>
        {expand && (
          <p className="mt-2 text-gray-800">{character.description}</p>
        )}
        <div className="mt-3 text-sm text-gray-700 space-y-1">
          <p>
            <strong>KI:</strong> {character.ki} / {character.maxKi}
          </p>
          <p>
            <strong>Affiliation:</strong> {character.affiliation}
          </p>
          <p>
            <strong>Origin Planet:</strong> {character.originPlanet?.name}
          </p>
        </div>

        {character.transformations?.length && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Transformations</h3>
            <div className="flex flex-wrap gap-2">
              {character.transformations.map((t) => (
                <motion.div
                  key={t.id}
                  onClick={() => setCurrentImage(t.image)}
                  className="bg-gray-100 p-2 rounded-md flex items-center gap-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="rounded"
                  />
                  <span>{t.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
