"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Experience = {
  id: string;
  type: string;
  role: string;
  company: string;
  location: string;
  period: string;
  published: boolean;
};

type Props = {
  item: Experience;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
};

export default function SortableExperience({ item, onEdit, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-gray-600 hover:text-gray-400 transition-colors px-1">
          ⠿
        </div>
        <div className={`w-2 h-2 rounded-full shrink-0 ${item.published ? "bg-green-400" : "bg-gray-600"}`} />
        <div>
          <p className="text-white font-medium text-sm">{item.role}</p>
          <p className="text-gray-600 text-xs font-mono">{item.company} · {item.period}</p>
          <p className="text-gray-700 text-xs">{item.location}</p>
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        <button onClick={() => onEdit(item)} className="px-3 py-1.5 border border-gray-700 hover:border-violet-400 text-gray-400 hover:text-violet-400 text-xs rounded-lg transition-colors">Editar</button>
        <button onClick={() => onDelete(item.id)} className="px-3 py-1.5 border border-gray-700 hover:border-red-400 text-gray-400 hover:text-red-400 text-xs rounded-lg transition-colors">Eliminar</button>
      </div>
    </div>
  );
}