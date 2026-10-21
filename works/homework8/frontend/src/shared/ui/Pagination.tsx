type Props = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Pagination = ({ page, totalPages, onPageChange }: Props) => {
    if (totalPages <= 1) return null;

    const buttonClass = "rounded-lg border border-gray-300 px-4 py-2 font-medium enabled:cursor-pointer enabled:hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40";

    return (
        <nav aria-label="Сторінки категорій" className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button type="button" className={buttonClass} disabled={page === 1} onClick={() => onPageChange(page - 1)}>
                Назад
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => (
                <button
                    key={number}
                    type="button"
                    aria-label={`Сторінка ${number}`}
                    aria-current={page === number ? "page" : undefined}
                    className={`${buttonClass} ${page === number ? "bg-blue-600 text-white enabled:hover:bg-blue-700" : ""}`}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </button>
            ))}
            <button type="button" className={buttonClass} disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
                Далі
            </button>
        </nav>
    );
};

export default Pagination;
