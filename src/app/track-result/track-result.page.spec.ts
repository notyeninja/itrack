import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrackResultPage } from './track-result.page';

describe('TrackResultPage', () => {
  let component: TrackResultPage;
  let fixture: ComponentFixture<TrackResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
