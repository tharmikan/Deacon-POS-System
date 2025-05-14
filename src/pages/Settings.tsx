import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { UserPlus, ShieldCheck, Bell, Store, CircleDollarSign, Printer, Lock, Save, FileText, Trash2, AlertTriangle, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";

// Sample users
const users = [
  { id: 1, name: "John Smith", email: "john.smith@example.com", role: "Admin" },
  { id: 2, name: "Sarah Johnson", email: "sarah.johnson@example.com", role: "Manager" },
  { id: 3, name: "Michael Brown", email: "michael.brown@example.com", role: "Inventory" },
  { id: 4, name: "Emily Davis", email: "emily.davis@example.com", role: "Sales" },
  { id: 5, name: "Robert Wilson", email: "robert.wilson@example.com", role: "Manager" },
];

export default function Settings() {
  const { toast } = useToast();

  // Store Info State
  const [storeInfo, setStoreInfo] = useState({
    name: "My POS Store",
    address: "123 Main Street, Anytown, CA 12345",
    phone: "(555) 123-4567",
    email: "contact@myposstore.com",
    website: "www.myposstore.com",
    taxId: "12-3456789",
  });

  // Tax Settings State
  const [taxSettings, setTaxSettings] = useState({
    defaultRate: "7.5",
    calculateOnSubtotal: true,
    displayTaxColumn: true,
    enableTaxExemption: true,
  });

  // Receipt Settings State
  const [receiptSettings, setReceiptSettings] = useState({
    storeLogo: true,
    showTaxDetails: true,
    customFooter: "Thank you for shopping with us!",
    printAutomatically: false,
    emailReceipt: true,
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    lowStockAlert: true,
    lowStockThreshold: "10",
    dailySalesSummary: true,
    newOrderNotification: true,
    customerFeedback: true,
  });

  // Handle form changes
  const handleStoreInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoreInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleTaxSettingsChange = (field: string, value: string | boolean) => {
    setTaxSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleReceiptSettingsChange = (field: string, value: boolean | string) => {
    setReceiptSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationSettingsChange = (field: string, value: boolean | string) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
  };

  // Save settings
  const saveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
      </div>

      <Tabs defaultValue="store" className="space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 max-w-xl mb-4">
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
          <TabsTrigger value="receipts">Receipts</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
        </TabsList>

        <TabsContent value="store">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                <CardTitle>Store Information</CardTitle>
              </div>
              <CardDescription>
                Update your store details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input 
                    id="store-name" 
                    name="name"
                    value={storeInfo.name} 
                    onChange={handleStoreInfoChange} 
                    placeholder="Your Store Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    value={storeInfo.phone} 
                    onChange={handleStoreInfoChange} 
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea 
                  id="address" 
                  name="address"
                  value={storeInfo.address}
                  onChange={handleStoreInfoChange}
                  placeholder="Store Address"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email"
                    value={storeInfo.email} 
                    onChange={handleStoreInfoChange} 
                    placeholder="contact@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website" 
                    name="website"
                    value={storeInfo.website} 
                    onChange={handleStoreInfoChange} 
                    placeholder="www.example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxId">Tax/Business ID</Label>
                <Input 
                  id="taxId" 
                  name="taxId"
                  value={storeInfo.taxId} 
                  onChange={handleStoreInfoChange} 
                  placeholder="12-3456789"
                />
              </div>

              <div className="space-y-2">
                <Label>Business Hours</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Monday - Friday</div>
                  <div className="col-span-2">9:00 AM - 6:00 PM</div>
                  <div className="font-medium">Saturday</div>
                  <div className="col-span-2">10:00 AM - 4:00 PM</div>
                  <div className="font-medium">Sunday</div>
                  <div className="col-span-2">Closed</div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Store Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="border rounded-md h-24 w-24 flex items-center justify-center">
                    <Store className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <Button variant="outline">Upload New Logo</Button>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button onClick={saveSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tax">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CircleDollarSign className="h-5 w-5" />
                <CardTitle>Tax Settings</CardTitle>
              </div>
              <CardDescription>
                Configure tax calculation and display options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="default-tax-rate">Default Tax Rate (%)</Label>
                <Input 
                  id="default-tax-rate" 
                  type="number"
                  min="0"
                  step="0.01"
                  value={taxSettings.defaultRate} 
                  onChange={(e) => handleTaxSettingsChange("defaultRate", e.target.value)} 
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="calculate-on-subtotal" className="block mb-1">Calculate Tax on Subtotal</Label>
                    <p className="text-sm text-muted-foreground">
                      Calculate tax based on the subtotal before discounts
                    </p>
                  </div>
                  <Switch 
                    id="calculate-on-subtotal" 
                    checked={taxSettings.calculateOnSubtotal} 
                    onCheckedChange={(checked) => handleTaxSettingsChange("calculateOnSubtotal", checked)} 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="display-tax-column" className="block mb-1">Display Tax Column</Label>
                    <p className="text-sm text-muted-foreground">
                      Show tax as a separate column in sales reports
                    </p>
                  </div>
                  <Switch 
                    id="display-tax-column" 
                    checked={taxSettings.displayTaxColumn} 
                    onCheckedChange={(checked) => handleTaxSettingsChange("displayTaxColumn", checked)} 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-tax-exemption" className="block mb-1">Enable Tax Exemption</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow tax exemption for eligible customers
                    </p>
                  </div>
                  <Switch 
                    id="enable-tax-exemption" 
                    checked={taxSettings.enableTaxExemption} 
                    onCheckedChange={(checked) => handleTaxSettingsChange("enableTaxExemption", checked)} 
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Tax Categories</Label>
                <div className="border rounded-md divide-y">
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Standard Tax</div>
                      <div className="text-sm text-muted-foreground">Applied to most products</div>
                    </div>
                    <div className="font-medium">7.5%</div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Reduced Tax</div>
                      <div className="text-sm text-muted-foreground">Applied to essential goods</div>
                    </div>
                    <div className="font-medium">3.5%</div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Zero Tax</div>
                      <div className="text-sm text-muted-foreground">Tax exempt items</div>
                    </div>
                    <div className="font-medium">0%</div>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button onClick={saveSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="receipts">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <CardTitle>Receipt Settings</CardTitle>
              </div>
              <CardDescription>
                Configure how receipts are generated and displayed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="store-logo" className="block mb-1">Include Store Logo</Label>
                    <p className="text-sm text-muted-foreground">
                      Display your store logo on printed receipts
                    </p>
                  </div>
                  <Switch 
                    id="store-logo" 
                    checked={receiptSettings.storeLogo} 
                    onCheckedChange={(checked) => handleReceiptSettingsChange("storeLogo", checked)} 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-tax-details" className="block mb-1">Show Tax Details</Label>
                    <p className="text-sm text-muted-foreground">
                      Show detailed tax breakdown on receipts
                    </p>
                  </div>
                  <Switch 
                    id="show-tax-details" 
                    checked={receiptSettings.showTaxDetails} 
                    onCheckedChange={(checked) => handleReceiptSettingsChange("showTaxDetails", checked)} 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="print-automatically" className="block mb-1">Print Automatically</Label>
                    <p className="text-sm text-muted-foreground">
                      Print receipt automatically after each sale
                    </p>
                  </div>
                  <Switch 
                    id="print-automatically" 
                    checked={receiptSettings.printAutomatically} 
                    onCheckedChange={(checked) => handleReceiptSettingsChange("printAutomatically", checked)} 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-receipt" className="block mb-1">Email Receipt Option</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow customers to receive receipts via email
                    </p>
                  </div>
                  <Switch 
                    id="email-receipt" 
                    checked={receiptSettings.emailReceipt} 
                    onCheckedChange={(checked) => handleReceiptSettingsChange("emailReceipt", checked)} 
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="custom-footer">Receipt Footer</Label>
                <Textarea 
                  id="custom-footer" 
                  placeholder="Custom footer text for receipts"
                  value={receiptSettings.customFooter}
                  onChange={(e) => handleReceiptSettingsChange("customFooter", e.target.value)}
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">
                  This text will appear at the bottom of all receipts
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Printer Settings</Label>
                <div className="flex justify-between items-center border rounded-md p-4">
                  <div className="flex items-center gap-3">
                    <Printer className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Main Receipt Printer</div>
                      <div className="text-sm text-muted-foreground">Connected, ready</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Receipt Template</Label>
                <Select defaultValue="standard">
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Receipt</SelectItem>
                    <SelectItem value="compact">Compact Receipt</SelectItem>
                    <SelectItem value="detailed">Detailed Receipt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>

            <CardFooter>
              <Button onClick={saveSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <CardTitle>Notification Settings</CardTitle>
              </div>
              <CardDescription>
                Configure alerts and notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="low-stock-alert" className="block mb-1">Low Stock Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts when items fall below threshold
                    </p>
                  </div>
                  <Switch 
                    id="low-stock-alert" 
                    checked={notificationSettings.lowStockAlert} 
                    onCheckedChange={(checked) => handleNotificationSettingsChange("lowStockAlert", checked)} 
                  />
                </div>

                {notificationSettings.lowStockAlert && (
                  <div className="ml-6 space-y-2">
                    <Label htmlFor="low-stock-threshold">Low Stock Threshold</Label>
                    <Input 
                      id="low-stock-threshold" 
                      type="number"
                      min="1"
                      value={notificationSettings.lowStockThreshold} 
                      onChange={(e) => handleNotificationSettingsChange("lowStockThreshold", e.target.value)} 
                      className="max-w-xs"
                    />
                    <p className="text-sm text-muted-foreground">
                      Minimum quantity before alert is triggered
                    </p>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="daily-sales" className="block mb-1">Daily Sales Summary</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a daily summary of sales performance
                    </p>
                  </div>
                  <Switch 
                    id="daily-sales" 
                    checked={notificationSettings.dailySalesSummary} 
                    onCheckedChange={(checked) => handleNotificationSettingsChange("dailySalesSummary", checked)} 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="new-order" className="block mb-1">New Order Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get alerted when new orders are placed
                    </p>
                  </div>
                  <Switch 
                    id="new-order" 
                    checked={notificationSettings.newOrderNotification} 
                    onCheckedChange={(checked) => handleNotificationSettingsChange("newOrderNotification", checked)} 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="customer-feedback" className="block mb-1">Customer Feedback</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for customer reviews and feedback
                    </p>
                  </div>
                  <Switch 
                    id="customer-feedback" 
                    checked={notificationSettings.customerFeedback} 
                    onCheckedChange={(checked) => handleNotificationSettingsChange("customerFeedback", checked)} 
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label className="block">Notification Delivery Methods</Label>
                
                <div className="flex items-center justify-between px-4 py-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-primary/10 text-primary rounded-md">
                      <Bell className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">In-App Notifications</div>
                      <div className="text-sm text-muted-foreground">Receive alerts within the application</div>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between px-4 py-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-primary/10 text-primary rounded-md">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">john.smith@example.com</div>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between px-4 py-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-primary/10 text-primary rounded-md">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">SMS Notifications</div>
                      <div className="text-sm text-muted-foreground">Not configured</div>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button onClick={saveSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                <CardTitle>Users & Permissions</CardTitle>
              </div>
              <CardDescription>
                Manage user accounts and access control
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg">System Users</h3>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>

              <div className="border rounded-md">
                <div className="overflow-x-auto">
                  <table className="w-full data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th className="w-[100px]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id} className="hover:bg-muted/50">
                          <td className="font-medium">{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="text-destructive">Delete</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete the user account and remove their data from our servers.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium text-lg">Roles & Permissions</h3>

                <div className="grid gap-4">
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="text-base font-medium">Admin</h4>
                        <p className="text-sm text-muted-foreground">Full system access and control</p>
                      </div>
                      <Button variant="outline" size="sm">Edit Role</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      <div className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Dashboard Access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Sales Management</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Inventory Management</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span className="text-sm">User Management</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Reports Access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span className="text-sm">System Settings</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="text-base font-medium">Manager</h4>
                        <p className="text-sm text-muted-foreground">Access to most features except system settings</p>
                      </div>
                      <Button variant="outline" size="sm">Edit Role</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      <div className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Dashboard Access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Sales Management</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Inventory Management</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <XIcon className="h-4 w-4 text-red-500" />
                        <span className="text-sm">User Management</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Reports Access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <XIcon className="h-4 w-4 text-red-500" />
                        <span className="text-sm">System Settings</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="text-base font-medium">Sales</h4>
                        <p className="text-sm text-muted-foreground">Access limited to sales operations</p>
                      </div>
                      <Button variant="outline" size="sm">Edit Role</Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      <div className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Dashboard Access (Limited)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Sales Management</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <XIcon className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Inventory Management</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <XIcon className="h-4 w-4 text-red-500" />
                        <span className="text-sm">User Management</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <XIcon className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Reports Access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <XIcon className="h-4 w-4 text-red-500" />
                        <span className="text-sm">System Settings</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Role
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium text-lg">Security Settings</h3>

                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="block mb-1">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Require 2FA for admin users
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="block mb-1">Password Requirements</Label>
                      <p className="text-sm text-muted-foreground">
                        Enforce strong password policy
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="block mb-1">Session Timeout</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically log out after inactivity
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select defaultValue="30">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 border rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-200 flex gap-3">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Security Audit Recommended</h4>
                    <p className="text-sm mt-1">
                      It has been over 90 days since your last security audit. We recommend reviewing user accounts and permissions.
                    </p>
                    <Button size="sm" variant="outline" className="mt-2 border-amber-800 dark:border-amber-400">
                      Run Audit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button onClick={saveSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

function Mail(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function Phone(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
