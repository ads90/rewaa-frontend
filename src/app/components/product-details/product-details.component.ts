import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  currentProduct: Product = {
    name: '',
    price: 0,
    quantity: 0,
    status:1
  }; 
  
  message = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getProduct(this.route.snapshot.params.id);
  }

  getProduct(id: string): void {
    this.productService.get(id)
      .subscribe(
        data => {
          this.currentProduct = data[0];
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateProduct(): void {
    this.message = '';
    const data = {
      name: this.currentProduct.name,
      price: this.currentProduct.price,
      quantity: this.currentProduct.quantity,
      status:'2'
    };
    this.productService.update(this.currentProduct.id, data)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This product was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteProduct(): void {
    this.productService.delete(this.currentProduct.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/products']);
        },
        error => {
          console.log(error);
        });
  }
}