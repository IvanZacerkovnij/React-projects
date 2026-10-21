type CatalogIntroProps = { categoryCount: number; productCount: number }

export default function CatalogIntro({ categoryCount, productCount }: CatalogIntroProps) {
  return (
    <section className="intro" aria-labelledby="page-title">
      <div>
        <span className="eyebrow">ВАШ ПРОСТІР ДЛЯ ПРОДУКТІВ</span>
        <h1 id="page-title">Усе на своїх місцях<span>.</span></h1>
        <p>Створюйте категорії, додавайте продукти та тримайте каталог у порядку.</p>
      </div>
      <div className="stats">
        <div><strong>{categoryCount}</strong><span>Категорії</span></div>
        <div><strong>{productCount}</strong><span>Продукти</span></div>
      </div>
    </section>
  )
}
