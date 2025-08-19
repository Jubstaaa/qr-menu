import { Button } from "@qrmenu/ui";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-xl w-full text-center bg-white/70 backdrop-blur rounded-2xl p-8 shadow">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">QRMenu</h1>
        <p className="text-gray-600 mb-6">
          Restoran menünüzü dakikalar içinde dijitalleştirin.
        </p>
        <div className="flex gap-3 justify-center">
          <Button size="lg">Hemen Başla</Button>
          <Button variant="outline" size="lg">
            Demo
          </Button>
        </div>
      </div>
    </main>
  );
}
