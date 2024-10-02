import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ProductService,
  Product,
  Response,
} from '../../services/product.service';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.css',
})
export default class AdminListComponent implements OnInit {
  products: Product[] = [];
  newProduct: Partial<Product> = {
    name: '',
    description: '',
    price: 0,
    image: '',
  };
  editingProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (response: Response<Product[]>) => {
        if (response.success) {
          this.products = response.data;
        } else {
          console.error('Failed to load products:', response.message);
        }
      },
      (error) => console.error('Error loading products:', error)
    );
  }

  addProduct() {
    this.productService.addProduct(this.newProduct as Product).subscribe({
      next: (response: Response<Product>) => {
        if (response.success) {
          this.products.push(response.data);
          this.newProduct = { name: '', description: '', price: 0, image: '' };
        } else {
          console.error('Failed to add product:', response.message);
        }
      },
      error: (error) => {
        console.error('Error adding product:', error);
        // Optionally, you can show an error message to the user here
      },
    });
  }

  editProduct(product: Product) {
    this.editingProduct = { ...product };
  }

  updateProduct() {
    if (this.editingProduct) {
      this.productService
        .updateProduct(this.editingProduct._id, this.editingProduct)
        .subscribe({
          next: (response: Response<Product>) => {
            if (response.success) {
              const index = this.products.findIndex(
                (p) => p._id === this.editingProduct?._id
              );
              if (index !== -1) {
                this.products[index] = response.data;
              }
              this.editingProduct = null;
            } else {
              console.error('Failed to update product:', response.message);
            }
          },
          error: (error) => console.error('Error updating product:', error),
        });
    }
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: (response: Response<any>) => {
        if (response.success) {
          this.products = this.products.filter((p) => p._id !== id);
        } else {
          console.error('Failed to delete product:', response.message);
        }
      },
      error: (error) => console.error('Error deleting product:', error),
    });
  }

  cancelEdit() {
    this.editingProduct = null;
  }
}
