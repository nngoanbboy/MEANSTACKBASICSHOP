import { Component, inject, OnInit } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/card/product-card/product-card.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export default class HomepageComponent implements OnInit {
  private productService = inject(ProductService);
  product: Product[] = [];
  ngOnInit(): void {
    this.getProduct();
  }
  getProduct() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.product = Array.isArray(res.data) ? res.data : [res.data];
      },
    });
  }
}
