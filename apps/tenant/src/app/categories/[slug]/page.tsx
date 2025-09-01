import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { publicCategoryApi } from "@qr-menu/shared-utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductGrid from "../../../components/ProductGrid";

export const dynamic = "force-dynamic";

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const headersList = await headers();
  const subdomain = headersList.get("x-subdomain");

  const { slug } = await params;
  const categoryData = await publicCategoryApi.getCategoryBySlug(slug);

  if (!categoryData) {
    notFound();
  }

  // Transform API data to match ProductGrid's expected format

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center">
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Geri
            </Link>

            <div className="ml-6 flex-1 flex items-center">
              {categoryData.image_url ? (
                <div className="relative mr-4">
                  <img
                    src={categoryData.image_url}
                    alt={categoryData.name}
                    className="w-16 h-16 rounded-xl object-cover shadow-md"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                </div>
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-md">
                  <span className="text-white font-bold text-xl">
                    {categoryData.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <h1 className="text-2xl font-bold text-gray-900 mr-3">
                    {categoryData.name}
                  </h1>
                </div>
                {categoryData.description && (
                  <p className="text-sm text-gray-700">
                    {categoryData.description}
                  </p>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Products */}
      <div className="container mx-auto px-4 py-6">
        <ProductGrid products={categoryData.menu_items || []} />
      </div>
    </div>
  );
}
