import { RefreshCw } from "lucide-react";

export function Loader({ message = "Chargement..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <RefreshCw className="h-8 w-8 animate-spin mb-2 text-blue-600" />
      <span className="font-medium text-blue-600">{message}</span>
    </div>
  );
} 