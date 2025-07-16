import { formatLastUpdated } from "../utils";

export default function LastUpdate({ lastUpdated }: { lastUpdated: string }) {
  return (
    <div className="text-center top-0 bottom-0 right-0 z-50 fixed mb-6">
      <p className="text-gray-400 text-sm">{formatLastUpdated(lastUpdated)}</p>
    </div>
  );
}
