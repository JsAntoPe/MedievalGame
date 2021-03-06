import { Injectable } from '@angular/core';
import { ListaTrabajos } from '../quarter/listaTrabajos';
import { WoodService } from '../resources/WoodService';
import { Armory } from '../buildings/armory';
import { LevelUpBuildingService } from '../buildings/levelUpBuilding.service';
import {Job} from '../job';
import {DatabaseArmoryService} from '../baseDeDatos/databaseArmory.service';

@Injectable()
export class ArmoryService {
  armory: Armory;
  constructor(private listaTrabajos: ListaTrabajos, private wood: WoodService, private levelup: LevelUpBuildingService,
              private databaseService: DatabaseArmoryService) {
    this.databaseService.getArmory().subscribe((a) => this.armory = a);
  }
  upgradeJob(id: number): void {
    if (this.listaTrabajos.trabajos[id].level /*.getLevel()*/ >= this.armory.level) {
      throw new Error('Nivel de mejora no puede superar el nivel de la armería.');
    }
    let price = this.listaTrabajos.trabajos[id].upgradeCost[this.listaTrabajos.trabajos[id].level]; /*.getUpgradeCost();*/
    try {
      this.wood.spend(price);
    } catch (e) {
      throw new Error('Madera insuficiente para mejorar.');
    }
    this.listaTrabajos.trabajos[id].level++; /*.levelUp();*/
  }

  getArmory() {
    return this.armory;
  }
  levelUp(armory: Armory) {
    console.log('Llego');
    this.levelup.levelUp(armory);
  }
  getUpgradeCost(job: Job): number {
    return job.getUpgradeGost() * this.armory.mod[job.getId()];
  }
}
