/**
 * 复杂计算组件
 * 在 React 18 中需要使用 useMemo 来优化计算
 * 在 React 19 中编译器会自动优化
 */
export default function ComplexCalculation({ value }: { value: number }) {
  // 模拟复杂计算
  const result = calculateFibonacci(value)

  return (
    <div className="complex-calculation">
      <p>Fibonacci({value}) = {result}</p>
    </div>
  )
}

// 计算斐波那契数列的函数
function calculateFibonacci(n: number): number {
  if (n <= 1) return n
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2)
}
