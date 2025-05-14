
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  UserCircle,
  Filter, 
  MoreHorizontal, 
  Plus,
  Phone,
  Mail,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle,
  XCircle
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample employee data
const employees = [
  { 
    id: 1, 
    name: "John Smith", 
    email: "john.smith@example.com", 
    phone: "555-123-4567", 
    role: "Store Manager", 
    department: "Management", 
    hireDate: "2022-05-15", 
    status: "active",
    permissions: ["admin", "sales", "inventory", "reports", "settings"],
    attendance: 98,
    salesPerformance: [
      { month: "Jan", sales: 4200 },
      { month: "Feb", sales: 3800 },
      { month: "Mar", sales: 5100 },
      { month: "Apr", sales: 4700 },
      { month: "May", sales: 5200 },
    ]
  },
  { 
    id: 2, 
    name: "Sarah Johnson", 
    email: "sarah.johnson@example.com", 
    phone: "555-987-6543", 
    role: "Sales Associate", 
    department: "Sales", 
    hireDate: "2023-01-10", 
    status: "active",
    permissions: ["sales"],
    attendance: 95,
    salesPerformance: [
      { month: "Jan", sales: 3200 },
      { month: "Feb", sales: 2900 },
      { month: "Mar", sales: 3500 },
      { month: "Apr", sales: 3300 },
      { month: "May", sales: 3800 },
    ]
  },
  { 
    id: 3, 
    name: "Michael Brown", 
    email: "michael.brown@example.com", 
    phone: "555-456-7890", 
    role: "Inventory Specialist", 
    department: "Inventory", 
    hireDate: "2023-03-22", 
    status: "active",
    permissions: ["inventory", "reports"],
    attendance: 100,
    salesPerformance: []
  },
  { 
    id: 4, 
    name: "Emily Davis", 
    email: "emily.davis@example.com", 
    phone: "555-789-0123", 
    role: "Sales Associate", 
    department: "Sales", 
    hireDate: "2023-06-15", 
    status: "active",
    permissions: ["sales"],
    attendance: 92,
    salesPerformance: [
      { month: "Jan", sales: 2800 },
      { month: "Feb", sales: 3100 },
      { month: "Mar", sales: 2900 },
      { month: "Apr", sales: 3400 },
      { month: "May", sales: 3200 },
    ]
  },
  { 
    id: 5, 
    name: "Robert Wilson", 
    email: "robert.wilson@example.com", 
    phone: "555-234-5678", 
    role: "Assistant Manager", 
    department: "Management", 
    hireDate: "2022-09-10", 
    status: "inactive",
    permissions: ["sales", "inventory", "reports"],
    attendance: 75,
    salesPerformance: [
      { month: "Jan", sales: 3600 },
      { month: "Feb", sales: 3400 },
      { month: "Mar", sales: 3900 },
      { month: "Apr", sales: 3700 },
      { month: "May", sales: 2200 },
    ]
  },
  { 
    id: 6, 
    name: "Jessica Taylor", 
    email: "jessica.taylor@example.com", 
    phone: "555-345-6789", 
    role: "Customer Service", 
    department: "Customer Service", 
    hireDate: "2023-11-05", 
    status: "active",
    permissions: ["sales", "customers"],
    attendance: 97,
    salesPerformance: [
      { month: "Jan", sales: 0 },
      { month: "Feb", sales: 0 },
      { month: "Mar", sales: 2100 },
      { month: "Apr", sales: 2800 },
      { month: "May", sales: 3100 },
    ]
  }
];

// Sample shift data
const shifts = [
  { id: 1, employeeId: 1, date: "2025-05-14", start: "08:00", end: "17:00", status: "completed" },
  { id: 2, employeeId: 1, date: "2025-05-15", start: "08:00", end: "17:00", status: "scheduled" },
  { id: 3, employeeId: 1, date: "2025-05-16", start: "08:00", end: "17:00", status: "scheduled" },
  { id: 4, employeeId: 2, date: "2025-05-14", start: "09:00", end: "18:00", status: "completed" },
  { id: 5, employeeId: 2, date: "2025-05-15", start: "09:00", end: "18:00", status: "scheduled" },
  { id: 6, employeeId: 3, date: "2025-05-14", start: "08:00", end: "17:00", status: "completed" },
  { id: 7, employeeId: 4, date: "2025-05-14", start: "12:00", end: "21:00", status: "completed" },
  { id: 8, employeeId: 4, date: "2025-05-16", start: "12:00", end: "21:00", status: "scheduled" },
  { id: 9, employeeId: 6, date: "2025-05-14", start: "10:00", end: "19:00", status: "completed" },
  { id: 10, employeeId: 6, date: "2025-05-15", start: "10:00", end: "19:00", status: "scheduled" },
];

export default function Employees() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("employee-info");

  // Filter employees
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filter === "all" ||
      (filter === "active" && employee.status === "active") ||
      (filter === "inactive" && employee.status === "inactive") ||
      (filter === "sales" && employee.department === "Sales") ||
      (filter === "management" && employee.department === "Management");
    
    return matchesSearch && matchesFilter;
  });

  // Get employee detail
  const employeeDetail = employees.find(e => e.id === selectedEmployee);
  
  // Get employee shifts
  const employeeShifts = shifts.filter(s => s.employeeId === selectedEmployee);

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  // Format permissions for display
  const formatPermissionName = (permission: string) => {
    return permission.charAt(0).toUpperCase() + permission.slice(1);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="text-muted-foreground">
            Manage your staff, roles, and permissions
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
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
                      placeholder="Search employees..."
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
                    <DropdownMenuItem onClick={() => setFilter("all")} className={filter === "all" ? "bg-accent" : ""}>
                      All Employees
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter("active")} className={filter === "active" ? "bg-accent" : ""}>
                      Active Employees
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter("inactive")} className={filter === "inactive" ? "bg-accent" : ""}>
                      Inactive Employees
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilter("sales")} className={filter === "sales" ? "bg-accent" : ""}>
                      Sales Department
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter("management")} className={filter === "management" ? "bg-accent" : ""}>
                      Management
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
                        <th>Employee</th>
                        <th className="hidden md:table-cell">Role</th>
                        <th className="hidden md:table-cell">Department</th>
                        <th>Status</th>
                        <th className="w-[60px]"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.map((employee) => (
                        <tr 
                          key={employee.id} 
                          className={`hover:bg-muted/50 cursor-pointer ${selectedEmployee === employee.id ? 'bg-muted/50' : ''}`}
                          onClick={() => setSelectedEmployee(employee.id)}
                        >
                          <td>
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{employee.name}</div>
                                <div className="text-sm text-muted-foreground">{employee.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="hidden md:table-cell">{employee.role}</td>
                          <td className="hidden md:table-cell">{employee.department}</td>
                          <td>
                            <Badge variant={employee.status === "active" ? "default" : "secondary"}>
                              {employee.status === "active" ? "Active" : "Inactive"}
                            </Badge>
                          </td>
                          <td>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>View Schedule</DropdownMenuItem>
                                <DropdownMenuItem>Manage Permissions</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive focus:text-destructive">
                                  Deactivate
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                      {filteredEmployees.length === 0 && (
                        <tr>
                          <td colSpan={5} className="text-center py-10">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <UserCircle className="h-8 w-8 mb-2" />
                              <h3 className="font-medium">No employees found</h3>
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
          {employeeDetail ? (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{getInitials(employeeDetail.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{employeeDetail.name}</CardTitle>
                    <CardDescription>{employeeDetail.role}</CardDescription>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Badge variant={employeeDetail.status === "active" ? "default" : "secondary"} className="w-fit">
                    {employeeDetail.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Edit Profile
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="employee-info" onValueChange={setActiveTab}>
                  <TabsList className="w-full">
                    <TabsTrigger value="employee-info" className="flex-1">Info</TabsTrigger>
                    <TabsTrigger value="performance" className="flex-1">Performance</TabsTrigger>
                    <TabsTrigger value="schedule" className="flex-1">Schedule</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="employee-info" className="space-y-4 mt-2">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{employeeDetail.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{employeeDetail.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Employment Details</h3>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Hired: {new Date(employeeDetail.hireDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <UserCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Department: {employeeDetail.department}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-muted-foreground">Permissions</h3>
                        <Button variant="outline" size="sm">Manage</Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {employeeDetail.permissions.map(permission => (
                          <Badge key={permission} variant="outline">
                            <ShieldCheck className="h-3 w-3 mr-1" />
                            {formatPermissionName(permission)}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Attendance Rate</h3>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{employeeDetail.attendance}%</span>
                          <span>Target: 95%</span>
                        </div>
                        <Progress 
                          value={employeeDetail.attendance} 
                          className={`h-2 ${
                            employeeDetail.attendance >= 95 
                              ? "bg-green-100 dark:bg-green-900" 
                              : employeeDetail.attendance >= 90 
                                ? "bg-amber-100 dark:bg-amber-900" 
                                : "bg-red-100 dark:bg-red-900"
                          }`}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="performance" className="mt-2">
                    {employeeDetail.salesPerformance.length > 0 ? (
                      <div className="h-[250px] mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={employeeDetail.salesPerformance}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="sales" fill="#3b82f6" />
                          </BarChart>
                        </ResponsiveContainer>
                        <div className="text-center mt-4">
                          <h3 className="font-medium">Monthly Sales Performance</h3>
                          <p className="text-sm text-muted-foreground">
                            Total: ${employeeDetail.salesPerformance.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <BarChart className="h-12 w-12 mx-auto mb-2" />
                        <h3 className="font-medium">No sales performance data</h3>
                        <p className="text-sm mt-1">This employee is not in a sales role</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="schedule" className="space-y-4 mt-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Upcoming Shifts</h3>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Shift
                      </Button>
                    </div>
                    {employeeShifts.length > 0 ? (
                      <div className="space-y-3">
                        {employeeShifts.map(shift => (
                          <div 
                            key={shift.id} 
                            className={`border p-3 rounded-md flex items-center justify-between ${
                              shift.status === "scheduled" ? "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20" : ""
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-full ${
                                shift.status === "completed" 
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                                  : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              }`}>
                                {shift.status === "completed" ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <Clock className="h-4 w-4" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium">{new Date(shift.date).toLocaleDateString()}</div>
                                <div className="text-sm text-muted-foreground">
                                  {shift.start} - {shift.end}
                                </div>
                              </div>
                            </div>
                            <Badge variant={shift.status === "completed" ? "outline" : "default"}>
                              {shift.status === "completed" ? "Completed" : "Scheduled"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground border rounded-md">
                        <Calendar className="h-8 w-8 mx-auto mb-2" />
                        <p>No shifts scheduled</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center text-center p-12 min-h-80">
                <UserCircle className="h-12 w-12 mb-4 text-muted-foreground" />
                <h3 className="font-medium">Select an employee</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Click on an employee to view their details and performance
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
