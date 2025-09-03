import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { apiUtils } from "@qr-menu/shared-utils";

export default async function TenantMenuPage() {
  const headersList = await headers();
  const subdomain = headersList.get("x-subdomain");

  if (!subdomain) {
    notFound();
  }

  const { data: categories } = await apiUtils.publicModule.category.getAll({
    subdomain,
  });

  if (!categories) {
    notFound();
  }

  return (
    <div className="bg-gray-50">
      {/* Categories Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Menü Kategorileri
          </h2>

          {!categories || categories.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">🍽️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Menü Hazırlanıyor
              </h3>
              <p className="text-gray-600 text-sm">
                Lezzetli yemeklerimiz yakında menümüzde yerini alacak
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {categories?.map((category: any) => (
                <Link
                  key={category.id}
                  href={`/kategori/${category.slug || category.id}`}
                  className="block"
                >
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden active:scale-98 transition-transform">
                    <div className="flex items-center p-4">
                      <div className="flex-shrink-0">
                        {category.image_url ? (
                          <img
                            src={category.image_url}
                            alt={category.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                              {category.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {category.description}
                          </p>
                        )}
                        <p className="text-sm text-blue-600 mt-2 font-medium">
                          {category.items_count} ürün
                        </p>
                      </div>

                      <div className="text-gray-400">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
