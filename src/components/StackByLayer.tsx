import { groupStackByLayer } from "@/lib/layers";

export default function StackByLayer({ stack }: { stack: string[] }) {
  return (
    <dl className="space-y-1.5">
      {groupStackByLayer(stack).map(({ layer, techs }) => (
        <div key={layer} className="grid grid-cols-[4.25rem_1fr] gap-x-3 text-xs leading-relaxed">
          <dt className="text-neutral-400">{layer}</dt>
          <dd className="font-mono text-neutral-200">{techs.join(", ")}</dd>
        </div>
      ))}
    </dl>
  );
}