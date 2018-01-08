import {Injectable} from '@angular/core';
import {Resources} from './resources';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class WoodService {
  private Wood: Resources = new Resources(1, 'Madera', 500);
  woodObserver = BehaviorSubject.create(this.Wood.quantity);
  currentQuantity() {
    return this.Wood.quantity;
  }
  increase(quantity) {
    this.Wood.quantity += quantity;
    this.woodObserver.next(this.currentQuantity());
    console.log(this.currentQuantity());
  }
  spend(quantity) {
    this.Wood.quantity -= quantity;
    this.woodObserver.next(this.currentQuantity());
    console.log(this.currentQuantity());
  }
  loose(quantity) {
    if (this.currentQuantity() < quantity){
      this.Wood.quantity = 0;
    }
    else {
      this.Wood.quantity -= quantity;
    }
  }
}
