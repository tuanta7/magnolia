import { usePathname, useRouter } from "next/navigation";

type FAQSearchFormProps = {
  placeholder?: string;
  searchQuery?: string;
};

const FAQSearchForm = ({ placeholder, searchQuery }: FAQSearchFormProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (event) => {
    const query = new FormData(event.currentTarget).get("q");
    if (typeof query === "string" && !query.trim()) {
      event.preventDefault();
      router.replace(pathname ?? "/faqs");
    }
  };

  return (
    <form action="/faqs" method="get" role="search" onSubmit={handleSubmit}>
      <label className="block">
        <span className="sr-only">Search frequently asked questions</span>
        <span className="group flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 shadow-sm transition focus-within:border-[#c70101] focus-within:ring-4 focus-within:ring-red-100 hover:border-neutral-300 hover:shadow-md sm:px-5">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="size-5 shrink-0 text-neutral-400 transition group-focus-within:text-[#c70101] sm:size-6"
          >
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="m20 20-4-4" />
          </svg>
          <input
            type="search"
            name="q"
            defaultValue={searchQuery}
            maxLength={200}
            className="min-w-0 flex-1 bg-transparent py-4 text-base font-medium text-neutral-950 outline-none placeholder:font-normal placeholder:text-neutral-500 sm:py-5 sm:text-lg [&::-webkit-search-cancel-button]:appearance-none"
            placeholder={placeholder || "Search FAQs"}
          />
          <button
            type="submit"
            className="rounded-full bg-[#c70101] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c70101] sm:px-5"
          >
            Search
          </button>
        </span>
      </label>
    </form>
  );
};

export default FAQSearchForm;
