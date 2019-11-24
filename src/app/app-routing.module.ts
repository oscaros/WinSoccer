import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from './data-resolver.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'newsdetail', loadChildren: './newsdetail/newsdetail.module#NewsdetailPageModule' },
  {
    path: 'newsdetail/:id',
    resolve: {
      special: DataResolverService
    },
    loadChildren: './newsdetail/newsdetail.module#NewsdetailPageModule'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
