type GalleryButtonProps = {
    direction: "previous" | "next";
    onClick: () => void;
};

export function GalleryButton({ direction, onClick }: GalleryButtonProps) {
    return (
        <button
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-xl text-gray-800 shadow-sm transition hover:-translate-y-0.5 hover:border-green-300 hover:bg-green-100 hover:text-green-800 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-green-700 active:translate-y-0 motion-reduce:transition-none"
            type="button"
            onClick={onClick}
            aria-label={direction === "previous" ? "Попереднє фото" : "Наступне фото"}
        >
            {direction === "previous" ? "←" : "→"}
        </button>
    );
}
