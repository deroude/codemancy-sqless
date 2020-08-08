import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { GithubService, RepoFile, Repo } from 'src/app/services/github.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
  selector: 'sqless-github-browser',
  templateUrl: './github-browser.component.html',
  styleUrls: ['./github-browser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GithubBrowserComponent implements OnChanges {

  files: RepoFile[] = [];

  treeControl: NestedTreeControl<RepoFile> ;

  treeDataSource: MatTreeNestedDataSource<RepoFile> = new MatTreeNestedDataSource<RepoFile>();

  constructor(private gitHubService: GithubService) { }

  @Input() repo: Repo;

  ngOnChanges(): void{
    this.gitHubService.getRepoFiles(this.repo.full_name, '/').subscribe(r => this.treeDataSource.data = r);
    this.treeControl = new NestedTreeControl<RepoFile>(f => this.gitHubService.getRepoFiles(this.repo.full_name, `/${f.path}`));
  }

  hasChild(ix: number, node: RepoFile): boolean {
    return node.type === 'dir';
  }

  selectableNode(node: RepoFile): boolean {
    return node.type === 'file' && (node.name.endsWith('.yaml') || node.name.endsWith('.yml'));
  }

}
