import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { apiUtils } from "@qr-menu/shared-utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";

export const dynamic = "force-dynamic";

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const headersList = await headers();
  const subdomain = headersList.get("x-subdomain");

  if (!subdomain) {
    notFound();
  }

  const { slug } = await params;
  const { data: items } =
    await apiUtils.publicModule.category.getItemsByCategory(
      {
        slug,
      },
      {
        subdomain,
      }
    );

  if (!items) {
    notFound();
  }
  return (
    <div className="container mx-auto px-4 py-6">
      <ProductGrid items={items} />
    </div>
  );
}
