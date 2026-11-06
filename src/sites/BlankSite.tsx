/** Página em branco provisória, até cada pessoa ter o seu site de verdade. */
export function BlankSite({ title }: { title: string }) {
  return (
    <div className="grid h-full place-items-center text-center text-zinc-800">
      <div>
        <h1 className="text-4xl font-black">{title}</h1>
        <p className="mt-2 text-zinc-500">Em construção…</p>
      </div>
    </div>
  );
}
