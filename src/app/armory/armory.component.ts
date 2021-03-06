import { Component, OnInit, DoCheck } from '@angular/core';
import { ArmoryService } from './armory.service';
import { Job } from '../quarter/trooptypeobject';
import { ListaTrabajos } from '../quarter/listaTrabajos';
import { Armory } from '../buildings/armory';
import { DatabaseService } from '../baseDeDatos/database.service';
import {DatabaseArmoryService} from '../baseDeDatos/databaseArmory.service';

@Component({
  selector: 'app-armory',
  templateUrl: './armory.component.html',
  styleUrls: ['./armory.component.css'],
  providers: [ ArmoryService ],
})
export class ArmoryComponent implements OnInit, DoCheck {
  trabajos: Job[];
  armory: Armory;

  constructor(private lista: ListaTrabajos, private armoryService: ArmoryService, private _databaseService: DatabaseArmoryService) {}

  ngOnInit() {
    this.armory = this.armoryService.getArmory();
    this.trabajos = this.lista.getJobs();
  }

  upgradeJob(job: Job) {
    this.armoryService.upgradeJob(job.id);
  }

  levelUp() {
    this.armoryService.levelUp(this.armory);
    this._databaseService.updateArmory(this.armory).subscribe((s) => console.log(s));
  }
  ngDoCheck() {
    if (this.armory !== this.armoryService.getArmory()) {
      this.armory = this.armoryService.getArmory();
    }
  }
}
