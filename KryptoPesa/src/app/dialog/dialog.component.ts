import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  productForm!: FormGroup


  constructor
    (
      private formbuilder: FormBuilder,
      private toast: NgToastService,
      @Inject(MAT_DIALOG_DATA) public editData: any,
      private api: ApiService, private dialogRef: MatDialogRef<DialogComponent>
    ) { }

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      contact: ['', Validators.required],
      price: ['', Validators.required],
      date: ['', Validators.required]
    })

    if (this.editData) {
      this.productForm.controls['contact'].setValue(this.editData.contact);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['price'].setValue(this.editData.price);
    }
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value)
          .subscribe({
            next: (res) => {
              this.toast.success({ detail: 'SUCCESS!!!', summary: "Product Added Successfully!!", duration: 5000 })
              // alert("!");
              this.productForm.reset();
              this.dialogRef.close('save');

            }, error: () => {
              this.toast.error({ detail: 'ERROR!!!', summary: "Error while adding the product!!", duration: 5000 })
              // alert("")
            }
          })

      }
    } else {
      this.updateProduct()
    }
  }
  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          this.toast.success({ detail: 'SUCCESS!!!', summary: "Product Updated Successfully!!", duration: 5000 })
          // alert("Product updated Successfully");
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          this.toast.error({ detail: 'ERROR!!!', summary: "Error while updating the value!!", duration: 5000 })

        }
      })

  }

}
