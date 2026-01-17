import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { apiService, Product } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  Package,
  Upload,
  X,
} from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "" as Product["category"] | "",
    inStock: true,
    rating: "0",
    reviews: "0",
    artisanStory: "",
    variants: "",
    details: "",
  });
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (apiService.isAuthenticated()) {
      setIsAuthenticated(true);
      setShowLogin(false);
      loadProducts();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiService.login(username, password);
      setIsAuthenticated(true);
      setShowLogin(false);
      loadProducts();
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    apiService.logout();
    setIsAuthenticated(false);
    setShowLogin(true);
    setProducts([]);
    toast({
      title: "Logged out",
      description: "You have been logged out",
    });
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await apiService.getProducts();
      setProducts(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAdditionalImages(files);
    const previews: string[] = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result as string);
        if (previews.length === files.length) {
          setAdditionalPreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      category: "",
      inStock: true,
      rating: "0",
      reviews: "0",
      artisanStory: "",
      variants: "",
      details: "",
    });
    setMainImage(null);
    setAdditionalImages([]);
    setImagePreview("");
    setAdditionalPreviews([]);
    setEditingProduct(null);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      category: product.category,
      inStock: product.inStock,
      rating: product.rating.toString(),
      reviews: product.reviews.toString(),
      artisanStory: product.artisanStory || "",
      variants: product.variants ? JSON.stringify(product.variants, null, 2) : "",
      details: product.details ? JSON.stringify(product.details, null, 2) : "",
    });
    setImagePreview(product.image);
    setAdditionalPreviews(product.images.slice(1));
    setShowProductDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      if (editingProduct) {
        // For updates, send all fields to ensure they're updated
        formDataToSend.append("name", formData.name);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", formData.price);
        // Always send original_price, even if empty (to allow clearing it)
        if (formData.originalPrice && formData.originalPrice.trim()) {
          formDataToSend.append("original_price", formData.originalPrice);
        } else {
          // Send empty string to clear the field
          formDataToSend.append("original_price", "");
        }
        formDataToSend.append("category", formData.category);
        formDataToSend.append("in_stock", formData.inStock ? "true" : "false");
        formDataToSend.append("rating", formData.rating || "0");
        formDataToSend.append("reviews", formData.reviews || "0");
        // Always send artisan_story, even if empty
        formDataToSend.append("artisan_story", formData.artisanStory || "");
        // Always send variants and details, even if empty
        formDataToSend.append("variants", formData.variants || "");
        formDataToSend.append("details", formData.details || "");

        // Only send image if a new one is selected
        if (mainImage) {
          formDataToSend.append("image", mainImage);
        }

        if (additionalImages.length > 0) {
          additionalImages.forEach((img) => {
            formDataToSend.append("additional_images", img);
          });
        }
      } else {
        // For create, send required fields
        formDataToSend.append("name", formData.name);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", formData.price);
        if (formData.originalPrice && formData.originalPrice.trim()) {
          formDataToSend.append("original_price", formData.originalPrice);
        }
        formDataToSend.append("category", formData.category);
        formDataToSend.append("in_stock", formData.inStock ? "true" : "false");
        formDataToSend.append("rating", formData.rating || "0");
        formDataToSend.append("reviews", formData.reviews || "0");
        if (formData.artisanStory) {
          formDataToSend.append("artisan_story", formData.artisanStory);
        }
        if (formData.variants && formData.variants.trim()) {
          formDataToSend.append("variants", formData.variants);
        }
        if (formData.details && formData.details.trim()) {
          formDataToSend.append("details", formData.details);
        }

        if (mainImage) {
          formDataToSend.append("image", mainImage);
        }

        additionalImages.forEach((img) => {
          formDataToSend.append("additional_images", img);
        });
      }

      if (editingProduct) {
        await apiService.updateProduct(editingProduct.id, formDataToSend);
        toast({
          title: "Success",
          description: "Product updated successfully",
        });
      } else {
        await apiService.createProduct(formDataToSend);
        toast({
          title: "Success",
          description: "Product created successfully",
        });
      }

      resetForm();
      setShowProductDialog(false);
      loadProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteProductId) return;

    setLoading(true);
    try {
      await apiService.deleteProduct(deleteProductId);
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      loadProducts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setDeleteProductId(null);
    }
  };

  if (showLogin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Helmet>
          <title>Admin Login - Kashmiri Treasures</title>
        </Helmet>
        <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg">
          <div className="text-center space-y-2">
            <Package className="h-16 w-16 mx-auto text-primary" />
            <h1 className="text-4xl font-serif font-bold">Admin Panel</h1>
            <p className="text-lg text-muted-foreground">Login to manage products</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin Panel - Kashmiri Treasures</title>
      </Helmet>
      {/* Simple header for admin panel without navigation */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold">Admin Panel</h1>
              <p className="text-base text-muted-foreground">Kashmiri Treasures</p>
            </div>
            <Button variant="ghost" onClick={() => navigate("/")}>
              View Website
            </Button>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold mb-2">Product Management</h1>
            <p className="text-muted-foreground">Manage your products</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingProduct
                      ? "Update product information"
                      : "Fill in the details to add a new product"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            category: value as Product["category"],
                          })
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shawls">Shawls</SelectItem>
                          <SelectItem value="pherans">Pherans</SelectItem>
                          <SelectItem value="handbags">Handbags</SelectItem>
                          <SelectItem value="dry-fruits">Dry Fruits</SelectItem>
                          <SelectItem value="gift-hampers">Gift Hampers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      required
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (₹) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="originalPrice">Original Price (₹)</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        value={formData.originalPrice}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            originalPrice: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rating">Rating</Label>
                      <Input
                        id="rating"
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={formData.rating}
                        onChange={(e) =>
                          setFormData({ ...formData, rating: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reviews">Reviews Count</Label>
                      <Input
                        id="reviews"
                        type="number"
                        value={formData.reviews}
                        onChange={(e) =>
                          setFormData({ ...formData, reviews: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2 flex items-end">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="inStock"
                          checked={formData.inStock}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              inStock: e.target.checked,
                            })
                          }
                          className="h-4 w-4"
                        />
                        <Label htmlFor="inStock">In Stock</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="artisanStory">Artisan Story</Label>
                    <Textarea
                      id="artisanStory"
                      value={formData.artisanStory}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          artisanStory: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="variants">
                      Variants (JSON format, e.g. [&#123;"name": "Color", "options": ["Red", "Blue"]&#125;])
                    </Label>
                    <Textarea
                      id="variants"
                      value={formData.variants}
                      onChange={(e) =>
                        setFormData({ ...formData, variants: e.target.value })
                      }
                      rows={3}
                      placeholder='[{"name": "Color", "options": ["Red", "Blue"]}]'
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="details">
                      Details (JSON format, e.g. &#123;"material": "Cotton", "origin": "Kashmir"&#125;)
                    </Label>
                    <Textarea
                      id="details"
                      value={formData.details}
                      onChange={(e) =>
                        setFormData({ ...formData, details: e.target.value })
                      }
                      rows={3}
                      placeholder='{"material": "Cotton", "origin": "Kashmir"}'
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mainImage">
                      Main Image {!editingProduct && "*"}
                    </Label>
                    <Input
                      id="mainImage"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      required={!editingProduct}
                    />
                    {imagePreview && (
                      <div className="relative w-32 h-32 mt-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-0 right-0"
                          onClick={() => {
                            setMainImage(null);
                            setImagePreview("");
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalImages">Additional Images</Label>
                    <Input
                      id="additionalImages"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleAdditionalImagesChange}
                    />
                    {additionalPreviews.length > 0 && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {additionalPreviews.map((preview, idx) => (
                          <div key={idx} className="relative w-24 h-24">
                            <img
                              src={preview}
                              alt={`Preview ${idx + 1}`}
                              className="w-full h-full object-cover rounded"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-0 right-0 h-6 w-6"
                              onClick={() => {
                                const newPreviews = [...additionalPreviews];
                                const newImages = [...additionalImages];
                                newPreviews.splice(idx, 1);
                                newImages.splice(idx, 1);
                                setAdditionalPreviews(newPreviews);
                                setAdditionalImages(newImages);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowProductDialog(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading
                        ? "Saving..."
                        : editingProduct
                        ? "Update Product"
                        : "Create Product"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {loading && !products.length ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No products found</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Click "Add Product" to create your first product
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={
                            product.image.startsWith('http://') || product.image.startsWith('https://')
                              ? product.image
                              : `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}${product.image.startsWith('/') ? '' : '/'}${product.image}`
                          }
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>₹{product.price.toLocaleString()}</TableCell>
                      <TableCell>
                        {product.inStock ? (
                          <span className="text-green-600">In Stock</span>
                        ) : (
                          <span className="text-red-600">Out of Stock</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => openEditDialog(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => setDeleteProductId(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <AlertDialog
        open={!!deleteProductId}
        onOpenChange={(open) => !open && setDeleteProductId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product and all associated images.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
