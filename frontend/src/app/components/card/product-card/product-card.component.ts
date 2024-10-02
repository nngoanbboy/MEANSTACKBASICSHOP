import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../services/product.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  constructor(private router: Router) {} // Inject Router

  // Phương thức điều hướng đến trang chi tiết sản phẩm
  navigateToProductDetail(productId: string) {
    this.router.navigate(['/product-detail', productId]); // Điều hướng đến trang chi tiết
  }
}
