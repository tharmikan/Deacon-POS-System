
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, BarChart3, DollarSign, Package, ShoppingCart, TrendingDown, TrendingUp, Users } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const salesData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
];

const productData = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Groceries", value: 20 },
  { name: "Home", value: 15 },
  { name: "Other", value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const lowStockItems = [
  { id: 1, name: "Product A", stock: 5, threshold: 10 },
  { id: 2, name: "Product B", stock: 3, threshold: 15 },
  { id: 3, name: "Product C", stock: 7, threshold: 20 },
];

const recentSales = [
  { id: 1, customer: "John Doe", items: 3, total: 125.99, date: "2025-05-14 09:30" },
  { id: 2, customer: "Jane Smith", items: 1, total: 49.99, date: "2025-05-14 10:15" },
  { id: 3, customer: "Bob Johnson", items: 5, total: 235.45, date: "2025-05-14 11:05" },
];

export default function Dashboard() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15,231.89</div>
            <p className="text-xs text-muted-foreground mt-1">
              +20.1% from last month
            </p>
            <div className="flex items-center text-xs text-green-500 mt-2">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>18% increase</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground mt-1">
              +201 since last week
            </p>
            <div className="flex items-center text-xs text-green-500 mt-2">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>12% increase</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Inventory</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,845</div>
            <p className="text-xs text-muted-foreground mt-1">
              15 items low in stock
            </p>
            <div className="flex items-center text-xs text-red-500 mt-2">
              <TrendingDown className="h-3 w-3 mr-1" />
              <span>3 items out of stock</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+249</div>
            <p className="text-xs text-muted-foreground mt-1">
              +30 since last month
            </p>
            <div className="flex items-center text-xs text-green-500 mt-2">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>5% increase</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={salesData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={productData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {productData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Low Stock Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lowStockItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.stock} units left (min: {item.threshold})
                        </p>
                      </div>
                      <Card className={`${
                        item.stock < item.threshold / 2 
                          ? "bg-destructive text-destructive-foreground" 
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200"
                      } px-2 py-1 text-xs rounded-md`}>
                        {item.stock < item.threshold / 2 ? "Critical" : "Low"}
                      </Card>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Sales</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSales.map(sale => (
                    <div key={sale.id} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                      <div className="space-y-1">
                        <p className="font-medium">{sale.customer}</p>
                        <p className="text-sm text-muted-foreground">
                          {sale.items} items • {sale.date}
                        </p>
                      </div>
                      <div className="font-medium">${sale.total.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="border rounded-lg p-4 hover:bg-accent cursor-pointer flex items-center">
                  <BarChart3 className="h-5 w-5 mr-3" />
                  <div>
                    <h3 className="font-medium">Sales Report</h3>
                    <p className="text-sm text-muted-foreground">Daily and monthly sales overview</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:bg-accent cursor-pointer flex items-center">
                  <Package className="h-5 w-5 mr-3" />
                  <div>
                    <h3 className="font-medium">Inventory Report</h3>
                    <p className="text-sm text-muted-foreground">Stock levels and movement</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4 hover:bg-accent cursor-pointer flex items-center">
                  <Users className="h-5 w-5 mr-3" />
                  <div>
                    <h3 className="font-medium">Customer Report</h3>
                    <p className="text-sm text-muted-foreground">Customer activity and purchases</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
