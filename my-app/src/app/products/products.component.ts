import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {update} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
    public products :Array<Product>=[];
    public keyword : string="";
  constructor(private ProductService:ProductService) {

  }

  ngOnInit() {
    this.getProducts();
        }

getProducts(){
    this.ProductService.getProducts(1, 3)
  .subscribe({
    next: data => {
      this.products = data
    },
    error: err => {
      console.log(err);
    }
  })
  //this.products=this.ProductService.getProducts();
  }


  handleCheckProduct(product: Product) {
    this.ProductService.checkProducts(product).subscribe({
       next :updatedProduct => {
        product.checked=!product.checked;
         //this.getProducts();
       }
    })


  }

  handleDelete(product: Product) {
    if(confirm("Etes vous sure?"))
  this.ProductService.deleteProduct(product).subscribe({
    next:value => {
      //this.getProducts();
      this.products=this.products.filter(p=>p.id!=product.id);
    }
  })
  }

  searchProducts() {
    this.ProductService.searchProducts(this.keyword).subscribe({
      next : value =>{
      this.products = value
    }
  })
}
}
