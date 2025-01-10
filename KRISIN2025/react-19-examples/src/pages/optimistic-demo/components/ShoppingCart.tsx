import { useOptimistic } from 'react'
import { useState } from 'react'

type Product = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  pending?: boolean
}

// 模拟商品数据
const initialProducts: Product[] = [
  {
    id: 1,
    name: 'React 19 课程',
    price: 199,
    image: '/images/course.png',
    quantity: 1
  },
  {
    id: 2,
    name: '开发者证书',
    price: 299,
    image: '/images/certificate.png',
    quantity: 1
  },
  {
    id: 3,
    name: '技术咨询服务',
    price: 999,
    image: '/images/consulting.png',
    quantity: 1
  }
]

/**
 * 购物车组件
 * 展示数量和价格的乐观更新
 */
export default function ShoppingCart() {
  const [products, setProducts] = useState<Product[]>(initialProducts)

  // 使用 useOptimistic 管理乐观更新状态
  const [optimisticProducts, addOptimisticProduct] = useOptimistic(
    products,
    (state: Product[], newProduct: Product): Product[] =>
      state.map(product =>
        product.id === newProduct.id
          ? { ...newProduct, pending: true }
          : product
      )
  )

  // 模拟 API 调用
  const updateQuantity = async (product: Product) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return product
  }

  // 更新商品数量
  const handleQuantityChange = async (
    product: Product,
    change: number
  ) => {
    if (product.quantity + change < 1) return

    const newProduct = {
      ...product,
      quantity: product.quantity + change
    }

    // 添加乐观更新
    addOptimisticProduct(newProduct)

    try {
      // 实际 API 调用
      await updateQuantity(newProduct)
      setProducts(products.map(p =>
        p.id === product.id ? newProduct : p
      ))
    } catch (error) {
      console.error('Failed to update quantity:', error)
    }
  }

  // 计算总价
  const total = optimisticProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  )

  return (
    <div className="shopping-cart">
      <div className="cart-items">
        {optimisticProducts.map(product => (
          <div
            key={product.id}
            className={`cart-item ${product.pending ? 'pending' : ''}`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />

            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">¥{product.price}</p>
            </div>

            <div className="quantity-controls">
              <button
                onClick={() => handleQuantityChange(product, -1)}
                disabled={product.pending}
              >
                -
              </button>
              <span className="quantity">{product.quantity}</span>
              <button
                onClick={() => handleQuantityChange(product, 1)}
                disabled={product.pending}
              >
                +
              </button>
            </div>

            <div className="item-total">
              ¥{product.price * product.quantity}
              {product.pending && (
                <span className="pending-indicator">更新中...</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="total">
          总计: <span>¥{total}</span>
        </div>
        <button className="checkout-btn">结算</button>
      </div>
    </div>
  )
}
