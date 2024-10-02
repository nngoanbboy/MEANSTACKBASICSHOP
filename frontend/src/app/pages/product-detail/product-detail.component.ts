import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Product,
  ProductService,
  Response,
} from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export default class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading = false;
  error: string | null = null;

  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.loadProduct(id);
      }
    });
  }

  private loadProduct(id: string) {
    this.loading = true;
    this.error = null;
    this.productService.getProductDetail(id).subscribe({
      next: (response: Response<Product>) => {
        this.product = response.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching product:', err);
        this.error = 'Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.';
        this.loading = false;
      },
    });
  }
}
