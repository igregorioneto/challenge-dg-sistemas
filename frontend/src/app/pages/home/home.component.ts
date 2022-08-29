import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService, MenuItem, Message, PrimeNGConfig } from 'primeng/api';
import { forkJoin, Observable, take, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from '../../services/products.service';

interface Product {
    name: string;
    price: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items!: MenuItem[];

  displayModal!: boolean;
  titleModal: string = 'Cadastro de Produto';
  buttonRegisterModal: string = 'Cadastrar';

  editModal: boolean = false;

  priceInitial: number = 10;

  products!: any[];

  productForm!: FormGroup;

  constructor(
    private readonly productsService: ProductsService,
    private readonly confirmationService: ConfirmationService,
    private readonly primengConfig: PrimeNGConfig,
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
  ) {
    console.log(this.authService.userLogged());
   }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loadingResources();

    this.items = [
      {
          label:'Home',
          icon:'pi pi-fw pi-home',
          routerLink: '/'
      },
      {
          label:'Quit',
          icon:'pi pi-fw pi-power-off',
          routerLink: '/login'
      }
    ];


    this.productForm = this.formBuilder.group(
        {
            id: new FormControl(''),
            name: new FormControl(''),
            price: new FormControl(0),
        }
    );
  }

  registerProduct() {
    this.displayModal = true;
  }

  loadingResources() {
    const resources$: Observable<Product[]> = this.productsService.getProducts();

    forkJoin({resources$})
      .pipe(
        tap(({resources$}) => {
          this.products = resources$;
        }),
        take(1),
      )
      .subscribe();
  }

  createdProduct() {    
    this.editModal = false;
  }

  editProduct(product: any) {
    this.displayModal = true;
    this.titleModal = 'Edição de Produto';
    this.buttonRegisterModal = 'Editar';
    this.editModal = true;
    this.productForm.get('id')?.setValue(product.id);
    this.productForm.get('name')?.setValue(product.name);
    this.productForm.get('price')?.setValue(product.price);
    
  }

  deletingProduct(product: Product) {
    this.productsService.deleteProduct(product).subscribe(() => {
      this.loadingResources();
    });
  }

  clearForm() {
    this.displayModal = false;
    this.productForm.get('name')?.setValue("");
    this.productForm.get('price')?.setValue(0);
  }

  recordInformation() {
    if(this.editModal) {
      console.log(this.productForm.value)
      this.productsService.updateProduct(this.productForm.value)
            .subscribe(() => {
              this.loadingResources();
              this.displayModal = false;
            });
    } else {
      this.productsService.createProduct(this.productForm.value)
      .subscribe(() => {
        this.loadingResources();
        this.displayModal = false;
      });
    }
  }

}
