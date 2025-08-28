import { cookies } from "next/headers";
import { Button } from "@heroui/react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  try {
    const params = await searchParams;

    const accessToken = params.access_token as string;
    const refreshToken = params.refresh_token as string;
    const type = params.type as string;

    if (!accessToken) {
      throw new Error("No access token found");
    }

    if (type === "signup") {
      const cookieStore = await cookies();

      cookieStore.set("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      if (refreshToken) {
        cookieStore.set("refresh_token", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });
      }

      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md w-full mx-4 text-center">
            <div className="p-6 rounded-lg bg-green-50 border border-green-200">
              <div className="text-4xl mb-4 text-green-500">✅</div>
              <h1 className="text-xl font-semibold mb-2 text-green-800">
                Email Onaylandı!
              </h1>
              <p className="text-sm text-green-600">
                Email başarıyla onaylandı! Giriş yapabilirsiniz.
              </p>
            </div>
            <div className="mt-6">
              <Link href="/">
                <Button className="w-full">Ana Sayfaya Dön</Button>
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      throw new Error("Unknown callback type");
    }
  } catch (error: any) {
    console.error("Auth callback error:", error);

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-4 text-center">
          <div className="p-6 rounded-lg bg-red-50 border border-red-200">
            <div className="text-4xl mb-4 text-red-500">❌</div>
            <h1 className="text-xl font-semibold mb-2 text-red-800">
              Hata Oluştu
            </h1>
            <p className="text-sm text-red-600">
              Email onaylanırken bir hata oluştu. Lütfen tekrar deneyin.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/">
              <Button className="w-full">Ana Sayfaya Dön</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
