import config from "@/config";

export default function Home() {
  console.log(config.chains.goerli.id);

  return (
    <>
      <main>Swapper</main>
    </>
  );
}
