/* import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AddProduct } from '../constants/storage';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css']
})
export class AddProductModalComponent implements OnInit {

  productForm: FormGroup;
  productData: any = [];
  productDetailData: Object;
  isValidUser: boolean;
  isSubmitted: boolean = false;
  constructor( private fb: FormBuilder,
               private router: Router,
               private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productId: ['', [Validators.required]],
      productName: [''] ,
      price: ['', [Validators.required]],
      url: ['', [Validators.required]],
      category: ['']
    });
    this.loadUser();
  }

  addProduct(){
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();     
      return;
    }
    console.log(this.productForm.value);
    this.router.navigate(['dashboard/product']);
  }

  async loadUser() {
    this.productData = JSON.parse(localStorage.getItem(AddProduct.PRODUCTDATA));
    console.log('aaaaaaaaa' + this.productData);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    this.productData.push(this.productForm.value);
    console.log('bbbbbb'  + this.productData);

    if (!this.isValidUser) {
      localStorage.setItem(AddProduct.PRODUCTDATA, JSON.stringify(this.productData));
      this.router.navigate(['dashboard/product']);
    }
  }

  openModal() {
    console.log('jjjjjjjjjjjjjj');
    const modalElement: HTMLElement = document.querySelector("#exampleModal");
    const body = document.querySelector("body");
    body.appendChild(modalElement);
    console.log(modalElement);
  }

  dismissModal() {
    this.router.navigate(['dashboard/product']);
  }

  canDeactivate(): Observable<boolean> | boolean {

    if (this.productForm.dirty && !this.isSubmitted) {
      return confirm('Are you sure you want to discard your changes');
    }
    return true;
}

}
 */



 // my-modal.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css']
})
export class AddProductModalComponent implements OnInit {

  productForm: FormGroup;
  productName: string;
  isSubmitted: boolean = false;
  productData: any;

  constructor(private fb: FormBuilder,
    private commonService: ProductService,
    public dialogRef: MatDialogRef<AddProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(){
    this.productForm = this.fb.group({
      productId: ['', [Validators.required]],
      productName: ['',  [Validators.required]] ,
      price: ['', [Validators.required]],
      url: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
  }  

  addProduct(){
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();     
      return;
    }
    console.log(this.productForm.value);
    this.productData = this.productForm.value;
    this.commonService.setProduct(this.productData);
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close(/* {
      productData: this.productData
    } */);
  }

 /*  canDeactivate(): Observable<boolean> | boolean {

    if (this.productForm.dirty && !this.isSubmitted) {
      return confirm('Are you sure you want to discard your changes');
    }
    return true;
} */


}