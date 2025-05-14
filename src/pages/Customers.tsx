
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Users, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Heart, 
  Mail, 
  Phone,
  MapPin,
  ShoppingBag,
  Calendar
} from "lucide-react";

// Sample customer data
const customers = [
  { 
    id: 1, 
    name: "John Doe", 
    email: "john.doe@example.com", 
    phone: "555-123-4567", 
    address: "123 Main St, Anytown", 
    joinDate: "2023-01-15", 
    totalSpent: 1250.75, 
    lastPurchase: "2025-05-01", 
    loyaltyPoints: 450, 
    status: "active" 
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    email: "jane.smith@example.com", 
    phone: "555-987-6543", 
    address: "456 Oak Ave, Somewhere", 
    joinDate: "2023-03-22", 
    totalSpent: 875.25, 
    lastPurchase: "2025-05-10", 
    loyaltyPoints: 320, 
    status: "active" 
  },
  { 
    id: 3, 
    name: "Bob Johnson", 
    email: "bob.johnson@example.com", 
    phone: "555-555-5555", 
    address: "789 Elm Blvd, Nowhere", 
    joinDate: "2023-06-10", 
    totalSpent: 2350.00, 
    lastPurchase: "2025-04-28", 
    loyaltyPoints: 690, 
    status: "active" 
  },
  { 
    id: 4, 
    name: "Alice Williams", 
    email: "alice.williams@example.com", 
    phone: "555-222-3333", 
    address: "321 Pine St, Elsewhere", 
    joinDate: "2023-09-05", 
    totalSpent: 420.50, 
    lastPurchase: "2025-03-15", 
    loyaltyPoints: 120, 
    status: "inactive" 
  },
  { 
    id: 5, 
    name: "Charlie Brown", 
    email: "charlie.brown@example.com", 
    phone: "555-444-9999", 
    address: "654 Maple Dr, Anywhere", 
    joinDate: "2024-01-20", 
    totalSpent: 1875.30, 
    lastPurchase: "2025-05-12", 
    loyaltyPoints: 520, 
    status: "active" 
  },
  { 
    id: 6, 
    name: "Diana Miller", 
    email: "diana.miller@example.com", 
    phone: "555-777-8888", 
    address: "987 Cedar Ln, Someplace", 
    joinDate: "2023-11-12", 
    totalSpent: 3245.75, 
    lastPurchase: "2025-05-05", 
    loyaltyPoints: 890, 
    status: "active" 
  }
];

// Sample purchase history
const purchaseHistory = [
  { id: 1, customerId: 1, date: "2025-05-01", items: 3, total: 450.25 },
  { id: 2, customerId: 1, date: "2025-04-15", items: 2, total: 325.50 },
  { id: 3, customerId: 1, date: "2025-03-22", items: 1, total: 475.00 },
  { id: 4, customerId: 2, date: "2025-05-10", items: 4, total: 275.25 },
  { id: 5, customerId: 2, date: "2025-04-02", items: 2, total: 600.00 },
  { id: 6, customerId: 3, date: "2025-04-28", items: 5, total: 1250.00 },
  { id: 7, customerId: 3, date: "2025-03-15", items: 3, total: 800.00 },
  { id: 8, customerId: 3, date: "2025-02-10", items: 2, total: 300.00 },
  { id: 9, customerId: 5, date: "2025-05-12", items: 6, total: 750.30 },
  { id: 10, customerId: 5, date: "2025-04-20", items: 2, total: 425.00 },
  { id: 11, customerId: 6, date: "2025-05-05", items: 4, total: 1245.75 },
  { id: 12, customerId: 6, date: "2025-04-10", items: 3, total: 900.00 },
  { id: 13, customerId: 6, date: "2025-03-05", items: 2, total: 1100.00 },
];

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    
    const matchesFilter = 
      filter === "all" ||
      (filter === "active" && customer.status === "active") ||
      (filter === "inactive" && customer.status === "inactive") ||
      (filter === "high-value" && customer.totalSpent > 1000);
    
    return matchesSearch && matchesFilter;
  });

  // Get customer detail
  const customerDetail = customers.find(c => c.id === selectedCustomer);
  
  // Get customer purchase history
  const customerPurchases = purchaseHistory.filter(p => p.customerId === selectedCustomer);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Customers</h1>
          <p className="text-muted-foreground">
            Manage your customer database and profiles
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search customers..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                      {filter !== "all" && (
                        <Badge variant="secondary" className="ml-2">1</Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setFilter("all")} className={filter === "all" ? "bg-accent" : ""}>
                      All Customers
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter("active")} className={filter === "active" ? "bg-accent" : ""}>
                      Active Customers
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter("inactive")} className={filter === "inactive" ? "bg-accent" : ""}>
                      Inactive Customers
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilter("high-value")} className={filter === "high-value" ? "bg-accent" : ""}>
                      High-Value Customers ({'>'}$1000)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th className="hidden md:table-cell">Status</th>
                        <th className="hidden md:table-cell">Total Spent</th>
                        <th className="w-[60px]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCustomers.map((customer) => (
                        <tr 
                          key={customer.id} 
                          className={`hover:bg-muted/50 cursor-pointer ${selectedCustomer === customer.id ? 'bg-muted/50' : ''}`}
                          onClick={() => setSelectedCustomer(customer.id)}
                        >
                          <td>
                            <div className="font-medium">{customer.name}</div>
                          </td>
                          <td>{customer.email}</td>
                          <td>{customer.phone}</td>
                          <td className="hidden md:table-cell">
                            <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                              {customer.status === "active" ? "Active" : "Inactive"}
                            </Badge>
                          </td>
                          <td className="hidden md:table-cell">${customer.totalSpent.toFixed(2)}</td>
                          <td>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Email Customer</DropdownMenuItem>
                                <DropdownMenuItem>View Purchases</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive focus:text-destructive">
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                      {filteredCustomers.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center py-10">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <Users className="h-8 w-8 mb-2" />
                              <h3 className="font-medium">No customers found</h3>
                              <p className="text-sm mt-1">Try adjusting your search or filter</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          {customerDetail ? (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>{customerDetail.name}</CardTitle>
                <Badge variant={customerDetail.status === "active" ? "default" : "secondary"} className="w-fit">
                  {customerDetail.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{customerDetail.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{customerDetail.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{customerDetail.address}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="text-lg font-medium">${customerDetail.totalSpent.toFixed(2)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Loyalty Points</p>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1 text-rose-500" />
                      <span className="text-lg font-medium">{customerDetail.loyaltyPoints}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Join Date</p>
                    <p className="text-base">{new Date(customerDetail.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Last Purchase</p>
                    <p className="text-base">{new Date(customerDetail.lastPurchase).toLocaleDateString()}</p>
                  </div>
                </div>

                <Tabs defaultValue="purchases" className="mt-6">
                  <TabsList className="w-full">
                    <TabsTrigger value="purchases" className="flex-1">Purchases</TabsTrigger>
                    <TabsTrigger value="notes" className="flex-1">Notes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="purchases" className="space-y-4 mt-2">
                    {customerPurchases.length > 0 ? (
                      customerPurchases.map((purchase) => (
                        <div 
                          key={purchase.id} 
                          className="border rounded-md p-3 flex justify-between hover:bg-accent cursor-pointer"
                        >
                          <div className="flex items-center">
                            <ShoppingBag className="h-4 w-4 mr-2 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{purchase.items} {purchase.items === 1 ? 'item' : 'items'}</div>
                              <div className="text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3 inline-block mr-1" />
                                {new Date(purchase.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="font-medium">${purchase.total.toFixed(2)}</div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        <ShoppingBag className="h-8 w-8 mx-auto mb-2" />
                        <p>No purchase history</p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="notes">
                    <div className="border rounded-md p-4 min-h-[150px]">
                      <p className="text-muted-foreground text-sm">No customer notes yet.</p>
                    </div>
                    <Button className="w-full mt-4">Add Note</Button>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1">Edit</Button>
                  <Button className="flex-1">Contact</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center text-center p-12 min-h-80">
                <Users className="h-12 w-12 mb-4 text-muted-foreground" />
                <h3 className="font-medium">Select a customer</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Click on a customer to view their details and purchase history
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

