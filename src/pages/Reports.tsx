
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Download, Filter, Printer, BarChart3, LineChart, PieChart, Package, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { AreaChart, Area, BarChart as RechartsBarChart, Bar, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Legend } from 'recharts';

// Sample data for reports
const salesData = [
  { date: "2025-05-08", total: 1250.75, orders: 25 },
  { date: "2025-05-09", total: 1875.50, orders: 32 },
  { date: "2025-05-10", total: 2250.25, orders: 41 },
  { date: "2025-05-11", total: 1675.85, orders: 28 },
  { date: "2025-05-12", total: 1950.20, orders: 36 },
  { date: "2025-05-13", total: 2150.50, orders: 39 },
  { date: "2025-05-14", total: 2400.75, orders: 45 },
];

const categoryData = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Home & Kitchen", value: 15 },
  { name: "Books", value: 10 },
  { name: "Other", value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const topProducts = [
  { id: 1, name: "Laptop Pro X", sold: 42, revenue: 42000 },
  { id: 2, name: "Wireless Headphones", sold: 78, revenue: 7020 },
  { id: 3, name: "Smart Watch Series 5", sold: 56, revenue: 14000 },
  { id: 4, name: "Premium T-shirt", sold: 120, revenue: 3600 },
  { id: 5, name: "Designer Jeans", sold: 63, revenue: 5040 },
];

const topCustomers = [
  { id: 1, name: "John Doe", purchases: 12, spent: 3500 },
  { id: 2, name: "Diana Miller", spent: 3245, purchases: 8 },
  { id: 3, name: "Bob Johnson", spent: 2350, purchases: 5 },
  { id: 4, name: "Charlie Brown", spent: 1875, purchases: 9 },
  { id: 5, name: "Sarah Smith", spent: 1650, purchases: 6 },
];

const inventoryData = [
  { name: "In Stock", value: 2845 },
  { name: "Low Stock", value: 152 },
  { name: "Out of Stock", value: 15 },
];

export default function Reports() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [reportPeriod, setReportPeriod] = useState("7days");
  const [chartView, setChartView] = useState<"bar" | "line" | "area">("area");

  // Calculate summary data
  const totalRevenue = salesData.reduce((sum, day) => sum + day.total, 0);
  const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);
  const averageOrderValue = totalRevenue / totalOrders;

  // Determine trend (mock values for demo)
  const revenueTrend = 12.5; // percent increase from previous period
  const ordersTrend = 8.3; // percent increase from previous period

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports</h1>
          <p className="text-muted-foreground">
            View and analyze your business performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select value={reportPeriod} onValueChange={setReportPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <div className="flex items-center text-xs mt-2">
              {revenueTrend > 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-500">{revenueTrend}% increase</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                  <span className="text-red-500">{Math.abs(revenueTrend)}% decrease</span>
                </>
              )}
              <span className="text-muted-foreground ml-2">from previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <div className="flex items-center text-xs mt-2">
              {ordersTrend > 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-500">{ordersTrend}% increase</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                  <span className="text-red-500">{Math.abs(ordersTrend)}% decrease</span>
                </>
              )}
              <span className="text-muted-foreground ml-2">from previous period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground mt-2">
              Based on {totalOrders} orders
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales">
        <TabsList className="mb-4">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <div className="grid gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Sales Overview</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant={chartView === "bar" ? "default" : "outline"} 
                      size="sm" 
                      onClick={() => setChartView("bar")}
                    >
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant={chartView === "line" ? "default" : "outline"} 
                      size="sm" 
                      onClick={() => setChartView("line")}
                    >
                      <LineChart className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant={chartView === "area" ? "default" : "outline"} 
                      size="sm" 
                      onClick={() => setChartView("area")}
                    >
                      <AreaChartIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartView === "bar" ? (
                      <RechartsBarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), "MMM dd")} />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip labelFormatter={(value) => format(new Date(value), "MMM dd, yyyy")} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="total" name="Revenue ($)" fill="#8884d8" />
                        <Bar yAxisId="right" dataKey="orders" name="Orders" fill="#82ca9d" />
                      </RechartsBarChart>
                    ) : chartView === "line" ? (
                      <RechartsLineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), "MMM dd")} />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip labelFormatter={(value) => format(new Date(value), "MMM dd, yyyy")} />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="total" name="Revenue ($)" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line yAxisId="right" type="monotone" dataKey="orders" name="Orders" stroke="#82ca9d" />
                      </RechartsLineChart>
                    ) : (
                      <AreaChart data={salesData}>
                        <defs>
                          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), "MMM dd")} />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip labelFormatter={(value) => format(new Date(value), "MMM dd, yyyy")} />
                        <Legend />
                        <Area yAxisId="left" type="monotone" dataKey="total" name="Revenue ($)" stroke="#8884d8" fillOpacity={1} fill="url(#colorTotal)" />
                        <Area yAxisId="right" type="monotone" dataKey="orders" name="Orders" stroke="#82ca9d" fillOpacity={1} fill="url(#colorOrders)" />
                      </AreaChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <p className="text-sm text-muted-foreground">
                  Total sales for the period: <strong>${totalRevenue.toFixed(2)}</strong> from <strong>{totalOrders}</strong> orders.
                </p>
              </CardFooter>
            </Card>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full data-table">
                      <thead>
                        <tr>
                          <th className="text-left">Product</th>
                          <th className="text-right">Sold</th>
                          <th className="text-right">Revenue</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topProducts.map(product => (
                          <tr key={product.id}>
                            <td className="text-left">{product.name}</td>
                            <td className="text-right">{product.sold}</td>
                            <td className="text-right">${product.revenue.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="products">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={topProducts}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={150} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sold" name="Units Sold" fill="#8884d8" />
                      <Bar dataKey="revenue" name="Revenue ($)" fill="#82ca9d" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Categories Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Category Breakdown</h3>
                    <div className="space-y-4">
                      {categoryData.map((category, index) => (
                        <div key={category.name}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{category.name}</span>
                            <span>{category.value}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full" 
                              style={{ 
                                width: `${category.value}%`, 
                                backgroundColor: COLORS[index % COLORS.length] 
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full data-table">
                    <thead>
                      <tr>
                        <th className="text-left">Customer</th>
                        <th className="text-right">Orders</th>
                        <th className="text-right">Total Spent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topCustomers.map(customer => (
                        <tr key={customer.id}>
                          <td className="text-left">{customer.name}</td>
                          <td className="text-right">{customer.purchases}</td>
                          <td className="text-right">${customer.spent.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button variant="outline" className="w-full">View All Customers</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Average Spend per Customer</h3>
                    <div className="text-2xl font-bold">
                      ${(topCustomers.reduce((sum, customer) => sum + customer.spent, 0) / topCustomers.length).toFixed(2)}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Repeat Purchase Rate</h3>
                    <div className="text-2xl font-bold">68%</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      <TrendingUp className="inline h-3 w-3 text-green-500 mr-1" />
                      <span className="text-green-500">5% increase</span> from previous period
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Customer Retention</h3>
                    <div className="text-2xl font-bold">82%</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      <TrendingUp className="inline h-3 w-3 text-green-500 mr-1" />
                      <span className="text-green-500">3% increase</span> from previous period
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventory">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={inventoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {inventoryData.map((entry, index) => {
                            const colors = ['#4ade80', '#fbbf24', '#f43f5e'];
                            return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                          })}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex flex-col justify-center space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Inventory Summary</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border rounded-md p-4 text-center">
                          <div className="text-sm text-muted-foreground">Total Items</div>
                          <div className="font-bold text-xl mt-1">
                            {inventoryData.reduce((sum, item) => sum + item.value, 0)}
                          </div>
                        </div>
                        <div className="border rounded-md p-4 text-center">
                          <div className="text-sm text-muted-foreground">Categories</div>
                          <div className="font-bold text-xl mt-1">12</div>
                        </div>
                        <div className="border rounded-md p-4 text-center">
                          <div className="text-sm text-muted-foreground">Suppliers</div>
                          <div className="font-bold text-xl mt-1">8</div>
                        </div>
                        <div className="border rounded-md p-4 text-center">
                          <div className="text-sm text-muted-foreground">Low Stock Alert</div>
                          <div className="font-bold text-xl mt-1">
                            <span className="text-amber-500">15</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button>View Inventory Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory Movement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), "MMM dd")} />
                      <YAxis />
                      <Tooltip labelFormatter={(value) => format(new Date(value), "MMM dd, yyyy")} />
                      <Legend />
                      <Line type="monotone" dataKey="orders" name="Items Sold" stroke="#8884d8" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <p className="text-sm text-muted-foreground">
                  Total items sold in the period: <strong>{totalOrders}</strong>
                </p>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AreaChartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 3v18h18" />
      <path d="M3 9h18v12H3z" />
      <path d="M3 17h18" />
      <path d="M9 17v-5" />
      <path d="M15 17v-2" />
    </svg>
  );
}
