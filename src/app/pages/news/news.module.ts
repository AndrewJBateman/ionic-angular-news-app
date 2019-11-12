// angular & ionic/angular node modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

// ngx node modules
import { TranslateModule } from '@ngx-translate/core';

// Component & pipe modules & services
import { NewsPage } from './news.page';
import { ComponentsModule} from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { NetworkService } from '../../providers/network.service';

const routes: Routes = [
  {
    path: '',
    component: NewsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    PipesModule,
    ComponentsModule
    ],
  declarations: [
    NewsPage
  ],
  providers: [
    NetworkService]
})
export class NewsPageModule {}
