import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { apiClient } from "@qr-menu/shared-utils";
import Link from "next/link";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

export default async function TenantMenuPage() {
  // Get subdomain from x-subdomain header (middleware'den gelir)
  const headersList = await headers();
  const subdomain = headersList.get("x-subdomain");

  try {
    // Get menu with categories by subdomain using single API
    const menuResponse = await apiClient.getMenuBySubdomainPublic({
      subdomain: subdomain || undefined,
    });
    const menu = menuResponse.data;

    if (!menu || !menu.menu_categories || menu.menu_categories.length === 0) {
      notFound();
    }

    // Filter active categories
    const categories = menu.menu_categories.filter(
      (category: any) => category.is_active
    );

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                {menu.restaurant_name}
              </h1>
              {menu.restaurant_description && (
                <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                  {menu.restaurant_description}
                </p>
              )}

              {/* Restaurant Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {menu.opening_time && menu.closing_time && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <div className="text-3xl mb-2">🕒</div>
                    <h3 className="font-semibold mb-1">Çalışma Saatleri</h3>
                    <p className="text-blue-100">
                      {menu.opening_time} - {menu.closing_time}
                    </p>
                  </div>
                )}

                {menu.restaurant_phone && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <div className="text-3xl mb-2">📞</div>
                    <h3 className="font-semibold mb-1">İletişim</h3>
                    <p className="text-blue-100">{menu.restaurant_phone}</p>
                  </div>
                )}

                {menu.restaurant_address && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <div className="text-3xl mb-2">📍</div>
                    <h3 className="font-semibold mb-1">Adres</h3>
                    <p className="text-blue-100">{menu.restaurant_address}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Menu Categories */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Menü Kategorileri
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lezzetli yemeklerimizi keşfedin ve favori kategorinizi seçin
            </p>
          </div>

          {categories.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 text-8xl mb-6">🍽️</div>
              <h3 className="text-2xl font-medium text-gray-900 mb-3">
                Henüz kategori eklenmemiş
              </h3>
              <p className="text-gray-600 text-lg">
                Menü kategorileri yakında eklenecek
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category: any) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug || category.id}`}
                  className="block group"
                >
                  <div className="bg-white overflow-hidden shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                    <div className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <span className="text-white font-bold text-2xl">
                              {category.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-6 flex-1">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                            {category.name}
                          </h3>
                          {category.description && (
                            <p className="text-gray-600 mt-2">
                              {category.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-500">
                          {category.menu_items?.length || 0} ürün
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading menu:", error);
    notFound();
  }
}
