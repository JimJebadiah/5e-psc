import { Component, Input } from '@angular/core';
import { isMobile } from 'src/app/app.component';
import { Attributes } from 'src/app/domain/attribute';
import { Hero } from 'src/app/domain/hero';

@Component({
  selector: 'app-ais-block',
  templateUrl: './ais-block.component.html',
  styleUrls: ['./ais-block.component.less']
})
export class AisBlockComponent {
@Input() hero!: Hero;

isMobile = isMobile();

valueStyle() {
  const int = this.hero.getAttrMod(Attributes.DEX);
  if (int > 0) return 'positive';
  else if (int == 0) return 'zero';
  else return 'negative';
}

formatInit() {
  const bonus = this.hero.getAttrMod(Attributes.DEX);
  return bonus >= 0 ? `+${bonus}` : bonus;
}
}
