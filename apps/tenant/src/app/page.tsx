import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { apiClient } from "@qr-menu/shared-utils";
import Link from "next/link";

export default async function TenantMenuPage() {
  const headersList = await headers();
  const subdomain = headersList.get("x-subdomain");

  try {
    const menuResponse = await apiClient.getMenuBySubdomainPublic({
      subdomain: subdomain || undefined,
    });
    const menu = menuResponse.data;

    if (!menu) {
      notFound();
    }

    return (
      <div className="min-h-screen">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
          </div>

          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-lg animate-ping"></div>

          <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              {menu.logo_url ? (
                <div className="mb-8">
                  <img
                    src={menu.logo_url}
                    alt={menu.restaurant_name}
                    className="w-24 h-24 mx-auto rounded-2xl shadow-2xl border-4 border-white/20"
                  />
                </div>
              ) : (
                <div className="mb-8">
                  <div className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white/20">
                    <span className="text-white font-bold text-3xl">
                      {menu.restaurant_name.charAt(0)}
                    </span>
                  </div>
                </div>
              )}

              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6 text-white drop-shadow-2xl">
                {menu.restaurant_name}
              </h1>

              {menu.restaurant_description && (
                <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-lg">
                  {menu.restaurant_description}
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {menu.opening_time && menu.closing_time && (
                  <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      🕒
                    </div>
                    <h3 className="font-semibold mb-2 text-white">
                      Çalışma Saatleri
                    </h3>
                    <p className="text-blue-100 font-medium">
                      {menu.opening_time} - {menu.closing_time}
                    </p>
                  </div>
                )}

                {menu.restaurant_phone && (
                  <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      📞
                    </div>
                    <h3 className="font-semibold mb-2 text-white">İletişim</h3>
                    <p className="text-blue-100 font-medium">
                      {menu.restaurant_phone}
                    </p>
                  </div>
                )}

                {menu.restaurant_address && (
                  <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      📍
                    </div>
                    <h3 className="font-semibold mb-2 text-white">Adres</h3>
                    <p className="text-blue-100 font-medium">
                      {menu.restaurant_address}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                Menü Kategorileri
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Lezzetli Yemeklerimizi Keşfedin
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Özenle hazırlanmış menümüzde her damak zevkine uygun seçenekler
                bulabilirsiniz
              </p>
            </div>

            {!menu.menu_categories || menu.menu_categories.length === 0 ? (
              <div className="text-center py-20">
                <div className="relative">
                  <div className="text-gray-300 dark:text-gray-600 text-9xl mb-8 animate-bounce">
                    🍽️
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
                </div>
                <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                  Menü Hazırlanıyor
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  Lezzetli yemeklerimiz yakında menümüzde yerini alacak
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {menu.menu_categories?.map((category: any, index: number) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug || category.id}`}
                    className="group block"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 dark:border-gray-700">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="relative p-8">
                        <div className="flex items-center mb-6">
                          <div className="flex-shrink-0">
                            {category.image_url ? (
                              <div className="w-20 h-20 rounded-2xl overflow-hidden group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                                <img
                                  src={category.image_url}
                                  alt={category.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                                <span className="text-white font-bold text-2xl">
                                  {category.name.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="ml-6 flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                              {category.name}
                            </h3>
                            {category.description && (
                              <p className="text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                                {category.description}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
                          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {category.menu_items?.length || 0} lezzetli ürün
                          </span>
                          <div className="flex items-center text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform duration-300">
                            <span className="text-sm font-medium mr-1">
                              Keşfet
                            </span>
                            <svg
                              className="w-4 h-4"
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
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading menu:", error);
    notFound();
  }
}
