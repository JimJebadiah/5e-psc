import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryBlockComponent } from './inventory-block.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogModule } from 'src/app/components/confirmation-dialog/confirmation-dialog.module';
import { ListBlockModule } from 'src/app/components/list-block/list-block.module';
import { EditableModule } from 'src/app/directives/editable.module';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    InventoryBlockComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ConfirmationDialogModule,
    ListBlockModule,
    EditableModule,
    CdkScrollableModule
  ],
  exports: [
    InventoryBlockComponent
  ]
})
export class InventoryBlockModule { }
