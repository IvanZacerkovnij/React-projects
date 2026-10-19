type GalleryButtonProps = {
    direction: "previous" | "next";
    onClick: () => void;
};

export function GalleryButton({ direction, onClick }: GalleryButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={direction === "previous" ? "Попереднє фото" : "Наступне фото"}
        >
            {direction === "previous" ? "←" : "→"}
        </button>
    );
}
