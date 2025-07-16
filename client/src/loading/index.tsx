export default function Card_Shimmer() {
  return (
    <div className="w-[20rem] p-8 rounded-xl bg-[#302254]">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-[#717880] animate-pulse"></div>
        <div className="h-4 w-24 bg-[#717880] rounded animate-pulse"></div>
      </div>

      <div className="mt-4">
        <div className="h-6 w-32 bg-[#717880] rounded animate-pulse"></div>
      </div>

      <div className="mt-3">
        <div className="h-4 w-20 bg-[#717880] rounded animate-pulse"></div>
      </div>

      <div className="mt-4">
        <div className="h-4 w-28 bg-[#717880] rounded animate-pulse"></div>
      </div>

      <div className="mt-3">
        <div className="h-3 w-24 bg-[#717880] rounded animate-pulse"></div>
      </div>
    </div>
  );
}
