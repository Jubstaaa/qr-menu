import { withMicrofrontends } from "@vercel/microfrontends/next/config";
import type { NextConfig } from "next";
import { getNextImagesConfig } from "@qr-menu/shared-config";

const nextConfig: NextConfig = {
  ...getNextImagesConfig(),
};

export default withMicrofrontends(nextConfig);
