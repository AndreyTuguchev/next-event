import Link from "next/link";
import WebsiteLogo from "../website-logo";

const WebsiteLogoWithLink = ({ lazyload = false }: { lazyload?: boolean }) => {
  return (
    <Link href="/" className="w-36">
      <WebsiteLogo lazyload={lazyload} />
    </Link>
  );
};

export default WebsiteLogoWithLink;
