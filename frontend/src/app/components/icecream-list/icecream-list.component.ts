import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IcecreamService } from '../../services/icecream.service';
import { IceCream } from '../../models/icecream.model';

@Component({
  selector: 'app-icecream-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './icecream-list.component.html',
  styleUrl: './icecream-list.component.css'
})
export class IcecreamListComponent implements OnInit {
  icecreams: IceCream[] = [];
  isLoading = true;
  error = '';

  constructor(private iceCreamService: IcecreamService) { }

  ngOnInit(): void {
    this.fetchIceCreams();
  }

  fetchIceCreams(): void {
    this.isLoading = true;
    this.iceCreamService.getIceCreams().subscribe({
      next: (data) => {
        this.icecreams = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load Ice Creams. Please ensure the backend server is running and MongoDB is connected.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  deleteIceCream(id: string | undefined): void {
    if (!id) return;
    
    if (confirm('Are you sure you want to delete this delicious ice cream?')) {
      this.iceCreamService.deleteIceCream(id).subscribe({
        next: () => {
          this.icecreams = this.icecreams.filter(ic => ic._id !== id);
        },
        error: (err) => {
          console.error('Error deleting ice cream:', err);
          alert('Failed to delete ice cream.');
        }
      });
    }
  }
}
