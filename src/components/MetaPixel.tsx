import Script from "next/script";
import { MetaPixelRouteTracker } from "@/components/MetaPixelRouteTracker";

type Props = {
  pixelId: string;
};

/**
 * Meta (Facebook) Pixel base code (server component).
 * Rendered from the root layout only when NEXT_PUBLIC_META_PIXEL_ID is set.
 * - Initial PageView is fired by the inline snippet (init + PageView).
 * - Client-side route changes fire an extra PageView via MetaPixelRouteTracker.
 */
export function MetaPixel({ pixelId }: Props) {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', ${JSON.stringify(pixelId)});
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${encodeURIComponent(pixelId)}&ev=PageView&noscript=1`}
        />
      </noscript>
      <MetaPixelRouteTracker />
    </>
  );
}
