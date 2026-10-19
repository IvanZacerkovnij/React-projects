type FavoriteButtonProps = {
    onClick: () => void;
};

export function FavoriteButton({ onClick }: FavoriteButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label="Додати в улюблені"
            className="flex size-14 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-3xl text-rose-600 transition hover:bg-rose-100 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-rose-600 motion-reduce:transition-none"
        >
            ♡
        </button>
    );
}
