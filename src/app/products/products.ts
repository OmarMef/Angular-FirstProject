import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {ProductService} from '../service/product.service';

@Component({
  selector: 'app-products',
  imports: [
    NgIf
  ],
  templateUrl: './products.html',
  styleUrl: './products.css',
  standalone : true
})
export class Products implements OnInit{
  products: Array<any> = [];

  constructor(private productService:ProductService){}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe({
      next : resp => {this.products = resp},
      error : err => {console.log(err)}
    });
  }

  handleDelete(product: any) {
    let v = confirm('êtes vous sûre de vouloir supprimer ?')
    if(v==true){
      this.productService.deleteProduct(product).subscribe({
        next : resp => {this.getAllProducts()},
        error : err => {console.log(err)}
      });
      this.getAllProducts();
    }
  }
}
