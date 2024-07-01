import Image from "next/image";

export const Heroes = () => {
  return (
    <div
      className="flex flex-col items-center justify-center 
  max-w-5xl"
    >
      <div className="flex items-center">
        <div
          className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350]
        md:h-[400] md:w-[400px]"
        >
          <Image
            src="/file.svg"
            fill
            className="object-contain dark:hidden"
            alt="Files"
          />
          <Image
            src="/filedark.svg"
            fill
            className="object-contain hidden dark:block"
            alt="Files"
          />
        </div>
        <div className="relative h-[300px] w-[300px] hidden md:block">
          <Image
            src="/airplane.svg"
            fill
            className="object-contain dark:hidden"
            alt="Airplane"
          />
          <Image
            src="/airplane-dark.svg"
            fill
            className="object-contain hidden dark:block"
            alt="Airplane"
          />
        </div>
      </div>
    </div>
  );
};
