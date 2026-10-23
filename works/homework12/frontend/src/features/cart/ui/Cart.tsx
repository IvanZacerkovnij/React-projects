import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { formatCurrency } from '../../../shared/utils/formatCurrency'
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from '../model/cartSlice'

export default function Cart() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(state => state.cart.items)
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = items.reduce((total, item) => total + Math.round(item.price * 100) * item.quantity, 0) / 100

  return (
    <section className="cart-panel" aria-labelledby="cart-heading">
      <div className="products-heading">
        <div><h2 id="cart-heading">Кошик</h2><p aria-live="polite">Товарів: {totalQuantity}</p></div>
        {items.length > 0 && <button className="button" onClick={() => dispatch(clearCart())}>Очистити кошик</button>}
      </div>
      {items.length === 0 ? (
        <p className="muted">Кошик порожній. Додайте товари з каталогу.</p>
      ) : (
        <>
          <ul className="cart-items">
            {items.map(item => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-info"><h3>{item.name}</h3><p className="muted">{formatCurrency(item.price)} за одиницю</p></div>
                <div className="cart-quantity">
                  <button className="button small" aria-label={`Зменшити кількість: ${item.name}`} disabled={item.quantity === 1} onClick={() => dispatch(decreaseQuantity(item.id))}>−</button>
                  <span aria-live="polite">{item.quantity}</span>
                  <button className="button small" aria-label={`Збільшити кількість: ${item.name}`} onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                </div>
                <strong>{formatCurrency(Math.round(item.price * 100) * item.quantity / 100)}</strong>
                <button className="text-button" aria-label={`Видалити з кошика: ${item.name}`} onClick={() => dispatch(removeFromCart(item.id))}>Видалити</button>
              </li>
            ))}
          </ul>
          <p className="cart-total" aria-live="polite">Разом: {formatCurrency(totalPrice)}</p>
        </>
      )}
    </section>
  )
}
