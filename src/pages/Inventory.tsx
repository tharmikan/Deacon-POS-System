
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package, Plus, Search, Filter, ArrowDown, ArrowUp, MoreHorizontal, Upload, Download, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

// Sample inventory data
const initialInventory = [
  { id: 1, name: "Laptop", sku: "LPT-001", category: "Electronics", price: 999.99, stock: 25, min_stock: 5, supplier: "TechCorp" },
  { id: 2, name: "Smartphone", sku: "SPH-001", category: "Electronics", price: 499.99, stock: 40, min_stock: 10, supplier: "MobileTech" },
  { id: 3, name: "Headphones", sku: "AUD-001", category: "Electronics", price: 89.99, stock: 15, min_stock: 5, supplier: "AudioPro" },
  { id: 4, name: "T-shirt", sku: "APP-001", category: "Clothing", price: 19.99, stock: 50, min_stock: 15, supplier: "FashionCo" },
  { id: 5, name: "Jeans", sku: "APP-002", category: "Clothing", price: 49.99, stock: 30, min_stock: 10, supplier: "FashionCo" },
  { id: 6, name: "Coffee Maker", sku: "KIT-001", category: "Home", price: 79.99, stock: 10, min_stock: 3, supplier: "HomeGoods" },
  { id: 7, name: "Blender", sku: "KIT-002", category: "Home", price: 39.99, stock: 20, min_stock: 5, supplier: "HomeGoods" },
  { id: 8, name: "Book", sku: "BK-001", category: "Books", price: 14.99, stock: 100, min_stock: 20, supplier: "BookWorld" },
  { id: 9, name: "Desk", sku: "FUR-001", category: "Furniture", price: 199.99, stock: 5, min_stock: 2, supplier: "FurniturePlus" },
  { id: 10, name: "Chair", sku: "FUR-002", category: "Furniture", price: 89.99, stock: 8, min_stock: 3, supplier: "FurniturePlus" },
];

// Suppliers data
const suppliers = [
  { id: 1, name: "TechCorp", contact: "John Smith", email: "john@techcorp.com", phone: "555-1234" },
  { id: 2, name: "MobileTech", contact: "Jane Doe", email: "jane@mobiletech.com", phone: "555-5678" },
  { id: 3, name: "AudioPro", contact: "Mike Johnson", email: "mike@audiopro.com", phone: "555-9012" },
  { id: 4, name: "FashionCo", contact: "Sarah Brown", email: "sarah@fashionco.com", phone: "555-3456" },
  { id: 5, name: "HomeGoods", contact: "David Wilson", email: "david@homegoods.com", phone: "555-7890" },
  { id: 6, name: "BookWorld", contact: "Lisa Taylor", email: "lisa@bookworld.com", phone: "555-2345" },
  { id: 7, name: "FurniturePlus", contact: "Robert Miller", email: "robert@furnitureplus.com", phone: "555-6789" },
];

export default function Inventory() {
  const { toast } = useToast();
  const [inventory, setInventory] = useState(initialInventory);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<number[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
    min_stock: "",
    supplier: "",
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Filter inventory
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  // Sort inventory
  const sortedInventory = [...filteredInventory].sort((a, b) => {
    const fieldA = a[sortField as keyof typeof a];
    const fieldB = b[sortField as keyof typeof b];
    
    if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Toggle sort direction
  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle product form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  // Handle select change
  const handleSelectChange = (field: string, value: string) => {
    setNewProduct(prev => ({ ...prev, [field]: value }));
  };

  // Add new product
  const handleAddProduct = () => {
    // Validate form
    if (!newProduct.name || !newProduct.sku || !newProduct.category || !newProduct.price || !newProduct.stock) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newId = inventory.length > 0 ? Math.max(...inventory.map(item => item.id)) + 1 : 1;
    
    const productToAdd = {
      id: newId,
      name: newProduct.name,
      sku: newProduct.sku,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      min_stock: parseInt(newProduct.min_stock) || 0,
      supplier: newProduct.supplier,
    };
    
    setInventory([...inventory, productToAdd]);
    
    toast({
      title: "Product Added",
      description: `${newProduct.name} has been added to inventory`,
    });
    
    // Reset form
    setNewProduct({
      name: "",
      sku: "",
      category: "",
      price: "",
      stock: "",
      min_stock: "",
      supplier: "",
    });
    
    setIsAddDialogOpen(false);
  };

  // Toggle selection
  const toggleSelection = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(itemId => itemId !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selected.length === sortedInventory.length) {
      setSelected([]);
    } else {
      setSelected(sortedInventory.map(item => item.id));
    }
  };

  // Delete selected items
  const deleteSelected = () => {
    const updatedInventory = inventory.filter(item => !selected.includes(item.id));
    setInventory(updatedInventory);
    toast({
      title: "Items Deleted",
      description: `${selected.length} items have been deleted`,
    });
    setSelected([]);
  };

  // Calculate low stock items
  const lowStockItems = inventory.filter(item => item.stock <= item.min_stock).length;

  // Get unique categories
  const categories = Array.from(new Set(inventory.map(item => item.category)));

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Inventory Management</h1>
          <p className="text-muted-foreground">
            Manage your products, stock levels, and suppliers
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Enter the details for the new product.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      name="sku"
                      value={newProduct.sku}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={newProduct.category} 
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supplier">Supplier</Label>
                    <Select 
                      value={newProduct.supplier} 
                      onValueChange={(value) => handleSelectChange("supplier", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map(supplier => (
                          <SelectItem key={supplier.id} value={supplier.name}>{supplier.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={newProduct.price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      value={newProduct.stock}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min_stock">Min Stock</Label>
                    <Input
                      id="min_stock"
                      name="min_stock"
                      type="number"
                      min="0"
                      value={newProduct.min_stock}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProduct}>Save Product</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={toggleSelectAll}>
                {selected.length === sortedInventory.length ? "Deselect All" : "Select All"}
              </DropdownMenuItem>
              <DropdownMenuItem disabled={selected.length === 0}>
                <Download className="h-4 w-4 mr-2" />
                Export Selected
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Upload className="h-4 w-4 mr-2" />
                Import Products
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                disabled={selected.length === 0} 
                className="text-destructive focus:text-destructive"
                onClick={deleteSelected}
              >
                Delete Selected
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="low-stock">
            Low Stock
            {lowStockItems > 0 && (
              <Badge variant="destructive" className="ml-2">
                {lowStockItems}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search by name or SKU..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full data-table">
                    <thead>
                      <tr>
                        <th className="w-[40px]">
                          <Checkbox
                            checked={selected.length === sortedInventory.length && sortedInventory.length > 0}
                            onCheckedChange={toggleSelectAll}
                          />
                        </th>
                        <th 
                          className="cursor-pointer"
                          onClick={() => toggleSort("name")}
                        >
                          <div className="flex items-center">
                            Name
                            {sortField === "name" && (
                              sortDirection === "asc" ? 
                                <ArrowUp className="ml-1 h-4 w-4" /> : 
                                <ArrowDown className="ml-1 h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th>SKU</th>
                        <th 
                          className="cursor-pointer"
                          onClick={() => toggleSort("category")}
                        >
                          <div className="flex items-center">
                            Category
                            {sortField === "category" && (
                              sortDirection === "asc" ? 
                                <ArrowUp className="ml-1 h-4 w-4" /> : 
                                <ArrowDown className="ml-1 h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th 
                          className="cursor-pointer"
                          onClick={() => toggleSort("price")}
                        >
                          <div className="flex items-center">
                            Price
                            {sortField === "price" && (
                              sortDirection === "asc" ? 
                                <ArrowUp className="ml-1 h-4 w-4" /> : 
                                <ArrowDown className="ml-1 h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th 
                          className="cursor-pointer"
                          onClick={() => toggleSort("stock")}
                        >
                          <div className="flex items-center">
                            Stock
                            {sortField === "stock" && (
                              sortDirection === "asc" ? 
                                <ArrowUp className="ml-1 h-4 w-4" /> : 
                                <ArrowDown className="ml-1 h-4 w-4" />
                            )}
                          </div>
                        </th>
                        <th>Supplier</th>
                        <th className="w-[80px]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedInventory.map((item) => (
                        <tr key={item.id} className="hover:bg-muted/50">
                          <td className="text-center">
                            <Checkbox
                              checked={selected.includes(item.id)}
                              onCheckedChange={() => toggleSelection(item.id)}
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.sku}</td>
                          <td>{item.category}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>
                            <div className="flex items-center">
                              <span className="mr-2">{item.stock}</span>
                              {item.stock <= item.min_stock && (
                                <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                                  Low
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td>{item.supplier}</td>
                          <td>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Stock History</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive focus:text-destructive">
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                      {sortedInventory.length === 0 && (
                        <tr>
                          <td colSpan={8} className="text-center py-10">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <Package className="h-8 w-8 mb-2" />
                              <h3 className="font-medium">No products found</h3>
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
        </TabsContent>
        
        <TabsContent value="low-stock">
          <Card>
            <CardHeader>
              <CardTitle>Low Stock Items</CardTitle>
              <CardDescription>
                Items that are below or at minimum stock level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Current Stock</th>
                        <th>Min Stock</th>
                        <th>Supplier</th>
                        <th>Status</th>
                        <th className="w-[100px]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventory
                        .filter(item => item.stock <= item.min_stock)
                        .map((item) => (
                          <tr key={item.id} className="hover:bg-muted/50">
                            <td>{item.name}</td>
                            <td>{item.sku}</td>
                            <td>{item.stock}</td>
                            <td>{item.min_stock}</td>
                            <td>{item.supplier}</td>
                            <td>
                              {item.stock === 0 ? (
                                <Badge variant="destructive">Out of Stock</Badge>
                              ) : (
                                <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                                  Low Stock
                                </Badge>
                              )}
                            </td>
                            <td>
                              <Button size="sm">Reorder</Button>
                            </td>
                          </tr>
                        ))}
                      {inventory.filter(item => item.stock <= item.min_stock).length === 0 && (
                        <tr>
                          <td colSpan={7} className="text-center py-10">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <Package className="h-8 w-8 mb-2" />
                              <h3 className="font-medium">No low stock items</h3>
                              <p className="text-sm mt-1">All inventory is above minimum levels</p>
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
        </TabsContent>
        
        <TabsContent value="suppliers">
          <Card>
            <CardHeader>
              <CardTitle>Suppliers</CardTitle>
              <CardDescription>
                Manage your product suppliers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Contact Person</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Products</th>
                        <th className="w-[100px]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {suppliers.map((supplier) => (
                        <tr key={supplier.id} className="hover:bg-muted/50">
                          <td>{supplier.name}</td>
                          <td>{supplier.contact}</td>
                          <td>{supplier.email}</td>
                          <td>{supplier.phone}</td>
                          <td>
                            {inventory.filter(item => item.supplier === supplier.name).length}
                          </td>
                          <td>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>View Products</DropdownMenuItem>
                                <DropdownMenuItem>Contact</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive focus:text-destructive">
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
