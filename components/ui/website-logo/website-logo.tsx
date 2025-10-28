import Image from "next/image";

const WebsiteLogo = ({ lazyload = false }: { lazyload?: boolean }) => {
  return (
    <Image
      unoptimized
      priority
      src={`${lazyload ? "data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2026%2026%22%3E%3C/svg%3E" : "/assets/images/logo.png"}`}
      data-src={`/assets/images/logo.png`}
      width={277}
      height={277}
      className="max-w-14 h-auto"
      alt="Event App Logo"
    />
  );
};

export default WebsiteLogo;
