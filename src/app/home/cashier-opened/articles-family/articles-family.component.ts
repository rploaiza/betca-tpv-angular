import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Article } from '../../shared/article.model';
import { Shopping } from '../../shared/shopping.model';
import { FamilyType } from './family-type.model';
import { Family } from './family.model';
import { ArticleService } from '../../shared/article.service';
import { ArticlesFamilyService } from '../../shared/articles-family.service';
import { ShoppingCartService } from '../../cashier-opened/shopping-cart/shopping-cart.service';
import { ArticlesFamilySizesDialogComponent } from './articles-family-sizes-dialog.component';

@Component({
  selector: 'app-articles-family',
  templateUrl: 'articles-family.component.html',
  styleUrls: ['articles-family.component.css']
})
export class ArticlesFamilyViewComponent {
  static URL = 'articlesfamily';

  families: Family[];

  constructor(private dialog: MatDialog, private shoppingCartService: ShoppingCartService,
    private articlesFamilyService: ArticlesFamilyService) {

    this.nav('root');
  }

  color(family: Family) {
    if (family.familyType === FamilyType.ARTICLES) {
      return 'primary';
    } else {
      return 'accent';
    }
  }

  nav(id: string) {
    this.articlesFamilyService.findList(id).subscribe(
      families => this.families = families
    );
  }

  find(family: Family) {
    if (family.familyType === FamilyType.ARTICLE) {
      this.articlesFamilyService.findArticle(family.id).subscribe(
        article => this.shoppingCartService.add(article.code).subscribe(
          () => true
        )
      );
    } else {
      this.articlesFamilyService.findList(family.id).subscribe(
        families => {
          if (family.familyType === FamilyType.ARTICLES) {
            this.families = families;
          } else if (family.familyType === FamilyType.SIZES) {
            this.dialog.open(ArticlesFamilySizesDialogComponent, {
              width: '455px',
              data: { families: families, title: family.description }
            });
          }
        }
      );
    }
  }

}
