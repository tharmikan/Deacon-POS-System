
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScanBarcode, CreditCard, MinusCircle, Package, Plus, Search, ShoppingCart, Trash2, Wallet, QrCode } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample product data
const products = [
  { id: 1, name: "Laptop", price: 999.99, image: "/placeholder.svg", category: "Electronics" },
  { id: 2, name: "Smartphone", price: 499.99, image: "/placeholder.svg", category: "Electronics" },
  { id: 3, name: "Headphones", price: 89.99, image: "/placeholder.svg", category: "Electronics" },
  { id: 4, name: "T-shirt", price: 19.99, image: "/placeholder.svg", category: "Clothing" },
  { id: 5, name: "Jeans", price: 49.99, image: "/placeholder.svg", category: "Clothing" },
  { id: 6, name: "Coffee Maker", price: 79.99, image: "/placeholder.svg", category: "Home" },
  { id: 7, name: "Blender", price: 39.99, image: "/placeholder.svg", category: "Home" },
  { id: 8, name: "Book", price: 14.99, image: "/placeholder.svg", category: "Books" },
];

// Cart item type
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Sales() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(7.5); // 7.5% tax rate
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");

  // Filter products based on search query and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  // Add product to cart
  const addToCart = (product: typeof products[0]) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    toast({
      title: "Added to cart",
      description: `${product.name} added to cart`,
    });
  };

  // Update cart item quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate discount amount
  const discountAmount = (subtotal * discount) / 100;
  
  // Calculate tax amount
  const taxAmount = ((subtotal - discountAmount) * tax) / 100;
  
  // Calculate total
  const total = subtotal - discountAmount + taxAmount;

  // Handle checkout
  const handleCheckout = () => {
    toast({
      title: "Order Complete",
      description: `Total amount: $${total.toFixed(2)} paid via ${paymentMethod}`,
    });
    setCart([]);
    setDiscount(0);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Sales</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ScanBarcode className="h-4 w-4 mr-2" />
            Scan Barcode
          </Button>
          <Button variant="outline" size="sm">
            <Package className="h-4 w-4 mr-2" />
            View Orders
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
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
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Home">Home</SelectItem>
                <SelectItem value="Books">Books</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      ${product.price.toFixed(2)}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <Package className="h-12 w-12 mb-4" />
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="mt-2">Try adjusting your search or filter to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart
              </CardTitle>
              <CardDescription>
                {cart.length} {cart.length === 1 ? "item" : "items"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between space-x-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-none">
                            {item.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-4">
                    <div className="flex justify-between py-1">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <div className="flex items-center gap-2">
                        <span>Discount</span>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={discount}
                          onChange={(e) => setDiscount(Number(e.target.value))}
                          className="h-7 w-16"
                        />
                        <span>%</span>
                      </div>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <div className="flex items-center gap-2">
                        <span>Tax</span>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={tax}
                          onChange={(e) => setTax(Number(e.target.value))}
                          className="h-7 w-16"
                        />
                        <span>%</span>
                      </div>
                      <span>${taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1 font-medium text-lg mt-2">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                  <ShoppingCart className="h-10 w-10 mb-2" />
                  <h3 className="font-medium">Your cart is empty</h3>
                  <p className="text-sm mt-1">Add items to begin your order</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              {cart.length > 0 && (
                <>
                  <div className="grid w-full gap-2">
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Tabs
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="w-full"
                    >
                      <TabsList className="grid grid-cols-3">
                        <TabsTrigger value="cash">
                          <Wallet className="h-4 w-4 mr-2" />
                          Cash
                        </TabsTrigger>
                        <TabsTrigger value="card">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Card
                        </TabsTrigger>
                        <TabsTrigger value="qr">
                          <QrCode className="h-4 w-4 mr-2" />
                          QR
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleCheckout}
                  >
                    Complete Sale
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
