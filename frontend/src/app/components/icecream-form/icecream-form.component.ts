import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IcecreamService } from '../../services/icecream.service';
import { IceCream } from '../../models/icecream.model';

@Component({
  selector: 'app-icecream-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './icecream-form.component.html',
  styleUrl: './icecream-form.component.css'
})
export class IcecreamFormComponent implements OnInit {
  icecream: IceCream = {
    name: '',
    flavor: '',
    price: 0,
    stock: 0
  };
  
  isEditMode = false;
  isLoading = false;
  
  constructor(
    private iceCreamService: IcecreamService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.isLoading = true;
      this.iceCreamService.getIceCream(id).subscribe({
        next: (data) => {
          this.icecream = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          alert('Ice Cream not found!');
          this.router.navigate(['/icecreams']);
        }
      });
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    if (this.isEditMode && this.icecream._id) {
      this.iceCreamService.updateIceCream(this.icecream._id, this.icecream).subscribe({
        next: () => {
          this.router.navigate(['/icecreams']);
        },
        error: (err) => {
          console.error(err);
          alert('Error updating ice cream');
          this.isLoading = false;
        }
      });
    } else {
      this.iceCreamService.createIceCream(this.icecream).subscribe({
        next: () => {
          this.router.navigate(['/icecreams']);
        },
        error: (err) => {
          console.error(err);
          alert('Error adding ice cream');
          this.isLoading = false;
        }
      });
    }
  }
}
