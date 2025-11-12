"use client";

import { TriangleAlertIcon } from "lucide-react";

type props = {
  refresh: () => void;
  title: string;
  description?: string;
};

export default function ErrorCard({ refresh, title, description }: props) {
  return (
    <div className="flex flex-col items-center m-auto justify-center  max-w-xl p-6">
      <TriangleAlertIcon size={30} />
      <h2 className="text-xl font-semibold text-red-600 mb-4">{title}</h2>
      <p>{description}</p>
      <button
        onClick={refresh}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
      >
        Refresh
      </button>
    </div>
  );
}
