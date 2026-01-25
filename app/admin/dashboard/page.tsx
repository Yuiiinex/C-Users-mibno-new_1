import { prisma } from '@/lib/prisma'

export default async function AdminDashboard() {
  const [totalProducts, totalOrders, totalSales, recentOrders] = await Promise.all([
    prisma.product.count().catch(() => 0),
    prisma.order.count().catch(() => 0),
    prisma.order.aggregate({
      _sum: { total: true },
    }).catch(() => ({ _sum: { total: 0 } })),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    }).catch(() => []),
  ])

  const salesTotal = totalSales._sum.total || 0

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-primary-600">{totalProducts}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-primary-600">{totalOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total Sales</h3>
          <p className="text-3xl font-bold text-primary-600">
            ${salesTotal.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Order #</th>
                <th className="text-left py-2">Customer</th>
                <th className="text-left py-2">Total</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="py-2">{order.orderNumber}</td>
                  <td className="py-2">{order.customerName}</td>
                  <td className="py-2">${order.total.toFixed(2)}</td>
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        order.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

