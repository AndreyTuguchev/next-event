import Link from 'next/link';

import WebsiteLogo from '@/components/ui/website-logo';

const WebsiteLogoWithLink = ({ lazyload = false }: { lazyload?: boolean }) => {
  return (
    <Link href='/'>
      <WebsiteLogo lazyload={lazyload} />
    </Link>
  );
};

export default WebsiteLogoWithLink;
