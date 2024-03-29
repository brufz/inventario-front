import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'inventario-front';

  constructor(private router: Router) { }

  onTabChanged(event: any){
    const tab = event.tab.textLabel;
    switch(tab){
      case 'Home':
        this.router.navigate(['/home']);
        break;
      case 'Criar Produto':
        this.router.navigate(['/create-product']);
        console.log()
        break;
      case 'Buscar Produto':
        this.router.navigate(['/get-product']);
        console.log()
        break;
      case 'Deletar Produto':
        this.router.navigate(['/delete-product']);
        break;
    }
  }
}
