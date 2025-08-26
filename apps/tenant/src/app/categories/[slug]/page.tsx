import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { apiClient } from "@qr-menu/shared-utils";
import Link from "next/link";
import ProductGrid from "../../../components/ProductGrid";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Get subdomain from x-subdomain header (middleware'den gelir)
  const headersList = await headers();
  const subdomain = headersList.get("x-subdomain");

  try {
    // Get category with items using new public API
    const { slug } = await params;
    const { data: categoryData } = await apiClient.getCategoryBySlugPublic(
      { slug },
      {
        subdomain: subdomain || undefined,
      }
    );

    if (!categoryData) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Ana Menü
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-4 text-sm font-medium text-gray-500">
                      {categoryData.name}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Category Header */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {categoryData.name}
              </h1>
              {categoryData.description && (
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {categoryData.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Product Grid Component */}
        <ProductGrid products={categoryData.menu_items || []} />
      </div>
    );
  } catch (error) {
    console.error("Error loading category:", error);
    notFound();
  }
}
