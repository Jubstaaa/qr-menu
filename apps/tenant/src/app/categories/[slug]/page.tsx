import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { apiClient } from "@qr-menu/shared-utils";
import Link from "next/link";
import ProductGrid from "../../../components/ProductGrid";

export const dynamic = "force-dynamic";

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const headersList = await headers();
  const subdomain = headersList.get("x-subdomain");

  try {
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
      <div className="min-h-screen">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/20 dark:border-gray-700/20">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <Link
                    href="/"
                    className="flex items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 group"
                  >
                    <svg
                      className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
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
                    <span className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                      {categoryData.name}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-blue-900/20 dark:to-purple-900/20"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-pink-500/10 to-blue-500/10 rounded-full blur-3xl"></div>

          <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mb-8">
                {categoryData.image_url ? (
                  <div className="w-20 h-20 mx-auto rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src={categoryData.image_url}
                      alt={categoryData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                    <span className="text-white font-bold text-3xl">
                      {categoryData.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {categoryData.name}
              </h1>

              {categoryData.description && (
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  {categoryData.description}
                </p>
              )}

              <div className="mt-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                  {categoryData.menu_items?.length || 0} lezzetli ürün
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <ProductGrid products={categoryData.menu_items || []} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading category:", error);
    notFound();
  }
}
