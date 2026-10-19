type AddToCartButtonProps = {
    onClick: () => void;
};

export function AddToCartButton({ onClick }: AddToCartButtonProps) {
    return (
        <button onClick={onClick} className="w-full cursor-pointer rounded-xl bg-green-700 p-3 text-2xl text-white shadow-md transition hover:-translate-y-0.5 hover:bg-green-800 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-green-700 active:translate-y-0 motion-reduce:transition-none" type='button' aria-label='Додати в кошик'>
            🛒
        </button>
    )
}
