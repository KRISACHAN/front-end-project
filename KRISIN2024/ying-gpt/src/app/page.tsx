export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline">
      {process.env.OPENAI_API_KEY}
    </h1>
  );
}
