import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, Renderer2, inject } from "@angular/core";
import { Setter, Getter } from "./editable-number/editable-number.directive";
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from "@angular/cdk/portal";
import { Hero } from "../domain/hero";
import { GitdbService } from "../services/gitdb.service";

@Directive()
export abstract class AbstractEditableDirective<T> implements AfterViewInit {
  @HostListener('click')
  onClick() {
    this.open();
  }

  @HostListener('mouseenter')
  onEnter() {
    this.ref.nativeElement.style.cursor = 'pointer';
    this.overlay!.setAttribute('style',
      `
        position: absolute; 
        width: ${this.ref.nativeElement.clientWidth}px; 
        height: ${this.ref.nativeElement.clientHeight}px; 
        background-color: rgba(0, 0, 0, 0.1); 
        border-radius: 5px
      `
    );
  }

  @HostListener('mouseleave')
  onLeave() {
    this.ref.nativeElement.style.cursor = 'auto';
    this.overlay!.setAttribute('style',
      `
        position: absolute; 
        width: ${this.ref.nativeElement.clientWidth}px; 
        height: ${this.ref.nativeElement.clientHeight}px; 
        background-color: transparent
        `
    );
  }

  @Input() hero!: Hero;
  @Input() field?: keyof Hero;

  @Input() eGetter?: Getter<T>;
  @Input() eSetter?: Setter<T>;

  overlay: HTMLDivElement | null = null;

  constructor(
    private readonly ref: ElementRef,
    private readonly renderer: Renderer2,
    private readonly matDialog: MatDialog,
  ) { }

  protected abstract dialog(): ComponentType<any>;

  protected data(): object {
    return {
      getter: this.eGetter ?? this.getter(),
      setter: this.eSetter ?? this.setter(),
      hero: this.hero
    }
  }

  ngAfterViewInit(): void {
    this.overlay = document.createElement('div');
    this.overlay.className = 'box-overlay';
    this.overlay.setAttribute('style',
      `
        position: absolute; 
        width: ${this.ref.nativeElement.clientWidth}px; 
        height: ${this.ref.nativeElement.clientHeight}px; 
        background-color: transparent
      `
    );

    this.renderer.appendChild(this.ref.nativeElement, this.overlay);
  }

  open() {
    this.matDialog.open(this.dialog(), {
      data: this.data(),
      autoFocus: false,
    });
  }

  abstract getter(): Getter<T>;
  abstract setter(): Setter<T>;
}
