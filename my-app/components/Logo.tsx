import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import localFont from "next/font/local";

type Props = {};

const headingFont = localFont({
  src: "../public/fonts/font.woff2",
});

const Logo = (props: Props) => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center justify-center gap-x-2 hidden md:flex">
        <Image src="/logo.svg" alt="Logo" height={35} width={35} />
        <p
          className={cn(
            "text-lg mt-1 text-neutral-700 ",
            headingFont.className
          )}
        >
          Taskify
        </p>
      </div>
    </Link>
  );
};

export default Logo;
