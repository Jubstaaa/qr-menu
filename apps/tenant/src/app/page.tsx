import { Button } from "@qrmenu/ui";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="max-w-xl w-full text-center bg-white rounded-2xl p-8 shadow">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Tenant</h1>
        <p className="text-gray-600 mb-6">Subdomain bazlı menü ve dashboard.</p>
        <div className="flex gap-3 justify-center">
          <Button size="lg">Menüye Git</Button>
          <Button variant="outline" size="lg">
            Dashboard
          </Button>
        </div>
      </div>
    </main>
  );
}
