import localFont from "next/font/local";
const myFont = localFont({ src: "./Minecrafter.Alt.ttf" });

export default function Title() {
  return (
    <div className="flex flex-col gap-4 items-center text-gray-300">
      <h1 className={`${myFont.className} text-5xl text-center`}>
        TerraFirmaCraft
      </h1>
      <h2 className={`${myFont.className} text-4xl text-center`}>
        Anvil solver
      </h2>
    </div>
  );
}
