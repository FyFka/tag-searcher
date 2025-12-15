import { RedirectJoin } from "./redirect-join";
import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import Image from "next/image";

export const CaptchaRedirectJoin = ({ profileId }) => {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center text-center px-4 py-24 gap-4 grow bg-base-100">
        <Image src="/rate-limited.webp" height={225} width={225} alt="rate limited" priority fetchPriority="high" />
        <h1 className="text-2xl md:text-4xl font-extrabold">Woah, that's a bit too spicy!</h1>
        <p className="text-base-content max-w-md text-lg">
          It seems anti-spam system has flagged your activity. Please solve the captcha below to proceed.
        </p>
        <RedirectJoin profileId={profileId} />
      </main>
      <Footer />
    </>
  );
};
